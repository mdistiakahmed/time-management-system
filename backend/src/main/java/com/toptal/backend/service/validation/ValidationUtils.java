package com.toptal.backend.service.validation;

import com.toptal.backend.constants.ValidationConstants;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ValidationUtils {
    public final Pattern VALID_EMAIL_ADDRESS_REGEX =
            Pattern.compile(ValidationConstants.VALID_EMAIL_REGEX, Pattern.CASE_INSENSITIVE);

    public final Pattern VALID_PASSWORD_REGEX =
            Pattern.compile(ValidationConstants.VALID_PASSWORD_REGEX);

    public boolean validateEmail(String emailStr) {
        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailStr);
        return matcher.find();
    }

    public boolean validatePassword(String password) {
        Matcher matcher = VALID_PASSWORD_REGEX.matcher(password);
        return matcher.find();
    }

    public String getAuthenticatedUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userRole = authentication.getAuthorities().stream().findFirst().get().getAuthority();
        String userEmail = (String) authentication.getPrincipal();

        return userEmail;
    }

    public String getAuthenticatedUserRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userRole = authentication.getAuthorities().stream().findFirst().get().getAuthority();

        return userRole;
    }

    public boolean isValidDate(String dateStr) {
        try {
            DateTimeFormatter.ofPattern(ValidationConstants.VALID_DATE_FORMAT).parse(dateStr);
        } catch (Exception e) {
            return false;
        }
        return true;
    }
}
