package com.toptal.backend.service.validation;

import com.toptal.backend.constants.AuthorityConstants;
import com.toptal.backend.constants.ErrorMessageConstants;
import com.toptal.backend.constants.ValidationConstants;
import com.toptal.backend.data.model.Status;
import com.toptal.backend.data.model.Task;
import com.toptal.backend.data.repository.TaskRepository;
import com.toptal.backend.data.repository.UserRepository;
import com.toptal.backend.exception.HttpException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.sql.Date;
import java.util.Optional;

@Service
public class TaskValidationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ValidationUtils utils;


    public void checkIfValidTaskForCreation(Task task) {
        if(task == null || StringUtils.isEmpty(task.getAssignee()) ||  StringUtils.isEmpty(task.getStatus())) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.REQUIRED_DATA_MISSING);
        }
        checkDescription(task.getDescription());

        if(task.getStatus() == Status.COMPLETED) {
            checkCompletedDate(task.getCompletionDate());
            checkDuration(task.getDuration());
        } else {
            if(task.getStartTimeInMillis() == null || task.getStartTimeInMillis() < ValidationConstants.MIN_START_TIME_IN_MILLISECOND|| task.getStartTimeInMillis() > ValidationConstants.MAX_START_TIME_IN_MILLISECOND) {
                throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.INVALID_START_TIME);
            }
        }
        checkIfUserHavePermissionToAssign(task);

    }

    public void taskValidateForDelete(Optional<Task> taskAsOptional) {
        if(!taskAsOptional.isPresent()) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.TASK_NOT_FOUND_TO_DELETE);
        }
        String taskOwnerEmail = taskAsOptional.get().getAssignee();
        checkIfUserHaveAuthority(taskOwnerEmail);
    }

    public void checkGetTaskOperationIsValid(String startDateAsString, String endDateAsString, String assignee,Status status) {
        if(status == Status.COMPLETED) {
            if(StringUtils.isEmpty(startDateAsString) || StringUtils.isEmpty(endDateAsString)) {
                throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.REQUIRE_START_END_DATE);
            }
            Date startDate, endDate;
            try{
                startDate = Date.valueOf(startDateAsString);
                endDate = Date.valueOf(endDateAsString);
            } catch (Exception ex) {
                throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.INVALID_DATE_FORMATTING);
            }
            if (startDate.after(endDate)) {
                throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.INVALID_START_END_TIME);
            }
        }
        checkIfUserHaveAuthority(assignee);
    }

    public void checkGetSummaryOperationIsValid(String startDateAsString, String endDateAsString, String assignee) {
        checkGetTaskOperationIsValid(startDateAsString,endDateAsString, assignee, Status.COMPLETED );
    }

    public void checkIfValidOngoingTaskForUpdate(Task task, Long endTimeInMillis) {
        checkIfUserHavePermissionToAssign(task);

        if(endTimeInMillis == null || endTimeInMillis <= task.getStartTimeInMillis()) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.INVALID_END_TIME);
        }
    }

    public void checkIfUserHavePermissionToAssign(Task task) {
        if (StringUtils.isEmpty(task.getAssignee())) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.INVALID_ASSIGNEE);
        }
        checkIfUserHaveAuthority(task.getAssignee());
    }

    private void checkIfUserHaveAuthority(String taskOwnerEmail) {
        if(!utils.getAuthenticatedUserRole().equalsIgnoreCase(AuthorityConstants.ADMIN)
                && !(utils.getAuthenticatedUserEmail().equalsIgnoreCase(taskOwnerEmail))) {
            throw new AccessDeniedException("");
        }
    }

    public void checkDuration(Double duration) {
        if(duration == null || duration < ValidationConstants.MIN_DURATION || duration > ValidationConstants.MAX_DURATION) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.INVALID_DURATION);
        }
    }
    public void checkDescription(String description) {
        if(description == null || description.length() < ValidationConstants.DESCRIPTION_MIN_LENGTH || description.length() > ValidationConstants.DESCRIPTION_MAX_LENGTH) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.INVALID_DESCRIPTION);
        }
    }

    public void checkCompletedDate(Date completionDate) {
        if (completionDate == null || !utils.isValidDate(completionDate.toString())
                || completionDate.after(new Date(ValidationConstants.MAX_START_TIME_IN_MILLISECOND))) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.INVALID_COMPLETION_DATE);
        }
    }
}
