package com.toptal.backend.controller.dto.response;

import com.toptal.backend.data.model.TaskSummary;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
public class TaskSummaryPageResponse {
    private List<TaskSummary> taskSummaryList;
    private long totalElements;
    private long pageSize;
    private long pageNumber;
    private long totalPages;

    public static TaskSummaryPageResponse from(Page<TaskSummary>taskSummaryPagePage) {
        TaskSummaryPageResponse taskSummaryPageResponse = new TaskSummaryPageResponse();

        taskSummaryPageResponse.setTaskSummaryList(taskSummaryPagePage.getContent());
        taskSummaryPageResponse.setPageNumber(taskSummaryPagePage.getNumber());
        taskSummaryPageResponse.setPageSize(taskSummaryPagePage.getSize());
        taskSummaryPageResponse.setTotalElements(taskSummaryPagePage.getTotalElements());
        taskSummaryPageResponse.setTotalPages(taskSummaryPagePage.getTotalPages());

        return taskSummaryPageResponse;
    }
}
