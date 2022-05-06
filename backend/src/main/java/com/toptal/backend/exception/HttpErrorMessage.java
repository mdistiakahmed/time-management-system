package com.toptal.backend.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class HttpErrorMessage {
    private String path;
    private String message;
    private Date timestamp;
    private String error;
    private Integer status;
}
