package com.toptal.backend.constants;

public interface ValidationConstants {
    Long MIN_START_TIME_IN_MILLISECOND = 1L;
    Long MILLISECOND_IN_HOUR = 3600000L;
    Long MAX_START_TIME_IN_MILLISECOND = System.currentTimeMillis() + MILLISECOND_IN_HOUR;
    int DESCRIPTION_MIN_LENGTH = 6;
    int DESCRIPTION_MAX_LENGTH = 255;
    Double MIN_DURATION = 0.1;
    Double MAX_DURATION = 2160.0; // 3 months
    String VALID_DATE_FORMAT = "yyyy-MM-dd";
    String VALID_EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";
    String VALID_PASSWORD_REGEX = "(?=\\S+$).{6,20}$";
}
