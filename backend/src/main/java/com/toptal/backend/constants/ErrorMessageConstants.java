package com.toptal.backend.constants;

public interface ErrorMessageConstants {
    // user error messages
    String ACCOUNT_ALREADY_EXISTS = "Account with this email already exists";
    String ACCOUNT_NOT_EXISTS = "Account with this email does not exists";
    String INVALID_ROLE = "Provide valid user role";
    String INVALID_PREFERRED_WORKING_HOUR = "Preferred working hour should be between 1 and 23 hours";
    String INVALID_DATA = "User data is invalid";
    String INVALID_EMAIL = "Email is not valid.";
    String INVALID_PASSWORD = "Password must be between 6 to 20 characters long.";
    String ROLE_UPDATE_PERMISSION = "Only admin can change role";
    String OWN_ROLE_UPDATE_PERMISSION = "Opps! You can not change your own role, ask someone else";
    String OWN_ACCOUNT_DELETE_PERMISSION = "Opps! Can not delete yourself";

    // Authentication and authorization error messages
    String ACCESS_DENIED_MESSAGE = "You do not have permission";
    String UNAUTHORIZED_USER_MESSAGE = "Use valid email or password";

    // Task error messages
    String INVALID_COMPLETION_DATE = "Provide valid completion date in yyyy-mm-dd format and should not be in future!";
    String INVALID_DURATION = "Duration must be greater then or equal to 0.1 hours and less or equal to 3 months (2160 hours)";
    String INVALID_DESCRIPTION = "Description should be at least 6 and at most 255 character long ";
    String INVALID_START_TIME = "Valid start time must be present for ongoing tasks";
    String INVALID_END_TIME = "Valid end date not present, end date should be after start date";
    String INVALID_ASSIGNEE = "Assignee can not be empty";
    String INVALID_START_END_TIME = "Start date should be equal or before then end date";
    String REQUIRE_START_END_DATE = "Start/end date is required to get completed task list";
    String INVALID_DATE_FORMATTING = "Start/end date should be formatted as YYYY-MM-DD";
    String REQUIRED_DATA_MISSING = "Required Fields missing. (assignee, status)";
    String TASK_NOT_FOUND_TO_DELETE = "No task found to delete";
    String TASK_NOT_FOUND_TO_UPDATE = "No task found to update";
    String TASK_UPDATE_ID_MISSING = "Task id is required";

    // Task summary error messages
    String TASK_SUMMARY_NOT_FOUND_TO_UPDATE = "No task summary entry found for this task to update";
    String TASK_SUMMARY_NOT_FOUND_TO_DELETE = "No task summary entry found for this task to delete";
    String TASK_SUMMARY_UPDATE_FAILURE_FOR_USER_NOT_FOUND = "User is already deleted. Can not mark this task as done. Please delete this task";
}
