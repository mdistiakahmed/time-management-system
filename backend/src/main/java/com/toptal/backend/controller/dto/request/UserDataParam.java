package com.toptal.backend.controller.dto.request;

import com.toptal.backend.data.model.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDataParam {
    private String email;
    private String password;
    private Double preferredWorkingHour;
    private UserRole role;
}
