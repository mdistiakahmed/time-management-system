package com.toptal.backend.exception;

import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;


@RestControllerAdvice
public class GlobalExceptionHandler {

    @Bean
    public ErrorAttributes errorAttributes() {
        return new DefaultErrorAttributes() {
            @Override
            public Map<String, Object> getErrorAttributes(
                    WebRequest webRequest, ErrorAttributeOptions options) {
                return super.getErrorAttributes(
                        webRequest,
                        ErrorAttributeOptions.defaults().including(ErrorAttributeOptions.Include.MESSAGE));
            }
        };
    }


    @ExceptionHandler(HttpException.class)
    public void handleHttpException(HttpServletResponse response, HttpException ex) throws IOException {
        ex.printStackTrace();
        response.sendError(ex.getHttpStatus().value(), ex.getMessage());
    }

}


