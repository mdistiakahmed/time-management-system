package com.toptal.backend.controller.dto.response;

import com.toptal.backend.data.model.Task;
import lombok.Data;

import java.util.List;

@Data
public class TasksPageResponse {
    private List<Task> taskList;
    private long totalElements;
    private long pageSize;
    private long pageNumber;
    private long totalPages;
}
