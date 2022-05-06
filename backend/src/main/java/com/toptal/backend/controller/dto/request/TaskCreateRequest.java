package com.toptal.backend.controller.dto.request;

import com.toptal.backend.data.model.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskCreateRequest {
    private Status status;
    private String assignee;
    private String description;
    private String completionDate;
    private double duration;
    private Long startTimeInMillis;
}
