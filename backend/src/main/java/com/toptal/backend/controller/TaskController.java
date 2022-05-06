package com.toptal.backend.controller;

import com.toptal.backend.constants.RestApiConstants;
import com.toptal.backend.controller.dto.request.TaskCreateRequest;
import com.toptal.backend.controller.dto.request.TaskUpdateRequest;
import com.toptal.backend.controller.dto.response.DeleteCountResponse;
import com.toptal.backend.controller.dto.response.TaskSummaryPageResponse;
import com.toptal.backend.controller.dto.response.TasksPageResponse;
import com.toptal.backend.data.model.Status;
import com.toptal.backend.data.model.Task;
import com.toptal.backend.data.model.TaskSummary;
import com.toptal.backend.service.TaskService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Api(tags = "tasks", description = "Api for task management")
public class TaskController {
    private final ModelMapper modelMapper;
    private final TaskService taskService;

    @RequestMapping(value = "tasks",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Create a new task", authorizations = {@Authorization(value = "apiKey")})
    public Task createTask(@RequestBody TaskCreateRequest param) {
        return taskService.createTask(modelMapper.map(param, Task.class));
    }

    @RequestMapping(value = "tasks",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Update an existing task", authorizations = {@Authorization(value = "apiKey")})
    public Task updateTask(@RequestBody TaskUpdateRequest param) {
        return taskService.updateTask(modelMapper.map(param, Task.class), param.getEndTimeInMillis());
    }

    @RequestMapping(value = "tasks",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Get task list based on filters", authorizations = {@Authorization(value = "apiKey")})
    public TasksPageResponse getTasks(
            @RequestParam(value = "assignee" ) String assignee,
            @RequestParam(value = "status") Status status,
            @RequestParam(value = "startDate", required = false) String startDate,
            @RequestParam(value = "endDate", required = false) String endDate,
            @RequestParam(value = "pageNumber", defaultValue = RestApiConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = RestApiConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize) {

        return taskService.getTask(startDate, endDate, assignee,status, pageNumber, pageSize);
    }

    @RequestMapping(value = "tasks/summary",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Get task summary list based on filters", authorizations = {@Authorization(value = "apiKey")})
    public TaskSummaryPageResponse getTasksSummary(
            @RequestParam(value = "startDate") String startDate,
            @RequestParam(value = "endDate") String endDate,
            @RequestParam(value = "assignee", required = false) String assignee,
            @RequestParam(value = "pageNumber", defaultValue = RestApiConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNumber,
            @RequestParam(value = "pageSize", defaultValue = RestApiConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize) {

        Page<TaskSummary> taskSummaryPagePage = taskService.getTaskSummary(startDate, endDate, assignee, pageNumber, pageSize);
        return TaskSummaryPageResponse.from(taskSummaryPagePage);
    }

    @RequestMapping(value = "tasks/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Delete an existing task", authorizations = {@Authorization(value = "apiKey")})
    public DeleteCountResponse deleteTask(@PathVariable long id) {
        Long deleteCount = taskService.deleteTask(id);
        return new DeleteCountResponse(deleteCount);
    }
}
