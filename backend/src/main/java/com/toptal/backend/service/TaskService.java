package com.toptal.backend.service;

import com.toptal.backend.constants.ErrorMessageConstants;
import com.toptal.backend.controller.dto.response.TasksPageResponse;
import com.toptal.backend.data.model.Status;
import com.toptal.backend.data.model.Task;
import com.toptal.backend.data.model.TaskSummary;
import com.toptal.backend.data.model.User;
import com.toptal.backend.data.repository.TaskRepository;
import com.toptal.backend.data.repository.TaskSummaryRepository;
import com.toptal.backend.data.repository.UserRepository;
import com.toptal.backend.exception.HttpException;
import com.toptal.backend.service.validation.TaskValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

import static java.lang.System.currentTimeMillis;

@Service
@Transactional
public class TaskService {
    public static final Long COUNT_ONE = 1L;
    public static final String DEFAULT_SORTING_COLUMN = "completionDate";
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private TaskSummaryRepository taskSummaryRepository;
    @Autowired
    private TaskValidationService taskValidationService;
    @Autowired
    private UserRepository userRepository;

    public Task createTask(Task taskToCreate) {
        taskValidationService.checkIfValidTaskForCreation(taskToCreate);
        Task createdTask = taskRepository.save(taskToCreate);
        updateTaskSummary(createdTask, null, TaskSummaryAction.CREATE);
        return createdTask;
    }

    public TasksPageResponse getTask(String startDateAsString, String endDateAsString, String assignee, Status status, int pageNumber, int pageSize) {
        taskValidationService.checkGetTaskOperationIsValid(startDateAsString, endDateAsString, assignee, status);
        Sort sort = Sort.by(DEFAULT_SORTING_COLUMN).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Task> taskPage;

        if (status == Status.COMPLETED) {
            Date startDate = Date.valueOf(startDateAsString);
            Date endDate = Date.valueOf(endDateAsString);
            taskPage = StringUtils.isEmpty(assignee) ? taskRepository.findByStatusAndCompletionDateBetween(status, startDate, endDate, pageable)
                    : taskRepository.findByAssigneeAndStatusAndCompletionDateBetween(assignee, status, startDate, endDate, pageable);
        } else {
            taskPage = StringUtils.isEmpty(assignee) ? taskRepository.findByStatus(status, pageable)
                    : taskRepository.findByAssigneeAndStatus(assignee, status, pageable);
        }
        return mapToResponse(taskPage);
    }

    public Long deleteTask(long taskId) {
        Optional<Task> taskAsOptional = taskRepository.findById(taskId);
        taskValidationService.taskValidateForDelete(taskAsOptional);
        Task taskToDelete = taskAsOptional.get();
        updateTaskSummary(taskToDelete, null, TaskSummaryAction.DELETE);

        taskRepository.deleteById(taskId);
        return COUNT_ONE;
    }


    public Task updateTask(Task taskToUpdate, Long endTimeInMillis) {
        if (taskToUpdate.getId() == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.TASK_UPDATE_ID_MISSING);
        }
        Optional<Task> existingTaskAsOptional = taskRepository.findById(taskToUpdate.getId());
        if (existingTaskAsOptional.isPresent()) {
            Task existingTask = existingTaskAsOptional.get();
            if (existingTask.getStatus() == Status.ONGOING) {
                return handleOngoingTaskUpdate(existingTask, endTimeInMillis);
            } else {
                return handleCompletedTaskUpdate(taskToUpdate, existingTask);
            }
        } else {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.TASK_NOT_FOUND_TO_UPDATE);
        }
    }

    private Task handleOngoingTaskUpdate(Task task, Long endTimeInMillis) {
        taskValidationService.checkIfValidOngoingTaskForUpdate(task, endTimeInMillis);
        Double duration = calculateDurationInHour(task.getStartTimeInMillis(), endTimeInMillis);
        task.setDuration(duration);
        task.setStatus(Status.COMPLETED);
        task.setCompletionDate(new Date(endTimeInMillis));
        updateTaskSummary(task, null, TaskSummaryAction.CREATE);
        return taskRepository.save(task);
    }

    private Task handleCompletedTaskUpdate(Task newTask, Task oldTask) {
        taskValidationService.checkIfUserHavePermissionToAssign(oldTask);
        taskValidationService.checkDuration(newTask.getDuration());
        taskValidationService.checkDescription(newTask.getDescription());
        newTask.setStatus(oldTask.getStatus());
        updateTaskSummary(newTask, oldTask, TaskSummaryAction.UPDATE);

        oldTask.setDescription(newTask.getDescription());
        oldTask.setDuration(newTask.getDuration());
        return taskRepository.save(oldTask);
    }


    public Page<TaskSummary> getTaskSummary(String startDateAsString, String endDateAsString, String assignee, int pageNumber, int pageSize) {
        taskValidationService.checkGetSummaryOperationIsValid(startDateAsString, endDateAsString, assignee);

        Date startDate = Date.valueOf(startDateAsString);
        Date endDate = Date.valueOf(endDateAsString);

        Sort sort = Sort.by(DEFAULT_SORTING_COLUMN).descending();
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<TaskSummary> taskSummaryPagePage;
        if (StringUtils.isEmpty(assignee)) {
            taskSummaryPagePage = taskSummaryRepository.findByCompletionDateBetween(startDate, endDate, pageable);
        } else {
            taskSummaryPagePage = taskSummaryRepository.findByAssigneeAndCompletionDateBetween(assignee, startDate, endDate, pageable);
        }

        return taskSummaryPagePage;
    }

    private void updateTaskSummary(Task newTaskVersion, Task oldTaskVersion, TaskSummaryAction action) {
        if (newTaskVersion.getStatus() == Status.COMPLETED) {
            switch (action) {
                case CREATE:
                    addToSummary(newTaskVersion);
                    break;
                case UPDATE:
                    updateInSummary(newTaskVersion, oldTaskVersion);
                    break;
                case DELETE:
                    deleteFromSummary(newTaskVersion);
                    break;
            }
        }
    }

    private void addToSummary(Task task) {
        User user = userRepository.findByEmail(task.getAssignee());
        if (user == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.TASK_SUMMARY_UPDATE_FAILURE_FOR_USER_NOT_FOUND);
        }
        TaskSummary taskSummary = taskSummaryRepository.findByAssigneeAndCompletionDate(task.getAssignee(), task.getCompletionDate());

        if (taskSummary == null) {
            taskSummary = new TaskSummary();
            taskSummary.setAssignee(task.getAssignee());
            taskSummary.setCompletionDate(task.getCompletionDate());
            taskSummary.setTotalDuration(task.getDuration());
            taskSummary.setTaskCount(1);
            taskSummary.setCurrentPreferredWorkingHour(user.getPreferredWorkingHour());
        } else {
            taskSummary.setTaskCount(taskSummary.getTaskCount() + 1);
            taskSummary.setTotalDuration(taskSummary.getTotalDuration() + task.getDuration());
            taskSummary.setCurrentPreferredWorkingHour(user.getPreferredWorkingHour());
        }
        taskSummaryRepository.save(taskSummary);
    }

    private void updateInSummary(Task newTaskVersion, Task oldTaskVersion) {
        TaskSummary taskSummary = taskSummaryRepository.findByAssigneeAndCompletionDate(oldTaskVersion.getAssignee(), oldTaskVersion.getCompletionDate());
        if (taskSummary != null) {
            Double newTotalDuration = taskSummary.getTotalDuration() - oldTaskVersion.getDuration() + newTaskVersion.getDuration();
            taskSummary.setTotalDuration(newTotalDuration);
            taskSummaryRepository.save(taskSummary);
        } else {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.TASK_SUMMARY_NOT_FOUND_TO_UPDATE);
        }
    }

    public void updateTaskSummaryCurrentPrefWorkingHour(String assignee, Double currentPreferredWorkingHour) {
        if (!StringUtils.isEmpty(assignee) && currentPreferredWorkingHour != null) {
            TaskSummary taskSummary = taskSummaryRepository.findByAssigneeAndCompletionDate(assignee, new Date(currentTimeMillis()));
            if (taskSummary != null) {
                taskSummary.setCurrentPreferredWorkingHour(currentPreferredWorkingHour);
                taskSummaryRepository.save(taskSummary);
            }
        }
    }

    private void deleteFromSummary(Task task) {
        TaskSummary taskSummary = taskSummaryRepository.findByAssigneeAndCompletionDate(task.getAssignee(), task.getCompletionDate());
        if (taskSummary != null) {
            if (taskSummary.getTaskCount() == 1) {
                taskSummaryRepository.delete(taskSummary);
                return;
            }
            taskSummary.setTaskCount(taskSummary.getTaskCount() - 1);
            taskSummary.setTotalDuration(taskSummary.getTotalDuration() - task.getDuration());

            taskSummaryRepository.save(taskSummary);
        } else {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.TASK_SUMMARY_NOT_FOUND_TO_DELETE);
        }
    }

    private Double calculateDurationInHour(Long startTimeInMillis, Long endTimeInMillis) {
        return (endTimeInMillis - startTimeInMillis) / (1000.0 * 60 * 60);
    }

    private TasksPageResponse mapToResponse(Page<Task> taskPage) {
        List<Task> taskList = taskPage.getContent();

        TasksPageResponse tasksPageResponse = new TasksPageResponse();
        tasksPageResponse.setTaskList(taskList);
        tasksPageResponse.setPageNumber(taskPage.getNumber());
        tasksPageResponse.setPageSize(taskPage.getSize());
        tasksPageResponse.setTotalElements(taskPage.getTotalElements());
        tasksPageResponse.setTotalPages(taskPage.getTotalPages());

        return tasksPageResponse;
    }

    private enum TaskSummaryAction {
        CREATE, DELETE, UPDATE
    }

}
