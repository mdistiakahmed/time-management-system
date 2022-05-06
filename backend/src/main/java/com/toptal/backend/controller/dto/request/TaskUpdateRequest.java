package com.toptal.backend.controller.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskUpdateRequest {
    private Long id;
    private String description;
    private double duration;
    private Long endTimeInMillis;
}
