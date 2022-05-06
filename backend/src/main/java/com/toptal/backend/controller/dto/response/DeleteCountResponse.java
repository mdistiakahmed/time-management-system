package com.toptal.backend.controller.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DeleteCountResponse {
    private Long rowsDeleted;
}
