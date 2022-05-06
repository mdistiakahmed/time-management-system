package com.toptal.backend.constants;

import com.toptal.backend.data.model.UserRole;

public interface RestApiConstants {
    String DEFAULT_PAGE_NUMBER = "0";
    String DEFAULT_PAGE_SIZE = "5";
    Double DEFAULT_PREFERRED_WORKING_HOUR = 8.0;
    UserRole DEFAULT_ROLE = UserRole.ROLE_USER;
}
