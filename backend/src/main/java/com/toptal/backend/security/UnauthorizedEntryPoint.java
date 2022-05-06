package com.toptal.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.toptal.backend.constants.ErrorMessageConstants;
import com.toptal.backend.exception.HttpErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

@Component
public class UnauthorizedEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        HttpErrorMessage httpErrorMessage = new HttpErrorMessage(request.getRequestURI(),
                ErrorMessageConstants.UNAUTHORIZED_USER_MESSAGE,new Date(),"Unauthorized", HttpStatus.UNAUTHORIZED.value());

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setCharacterEncoding("utf-8");
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ObjectMapper objectMapper = new ObjectMapper();
        String resBody = objectMapper.writeValueAsString(httpErrorMessage);
        PrintWriter printWriter = response.getWriter();
        printWriter.print(resBody);
        printWriter.flush();
        printWriter.close();

    }
}
