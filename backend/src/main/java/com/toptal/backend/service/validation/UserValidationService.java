package com.toptal.backend.service.validation;

import com.toptal.backend.constants.ErrorMessageConstants;
import com.toptal.backend.data.model.User;
import com.toptal.backend.data.model.UserRole;
import com.toptal.backend.data.repository.UserRepository;
import com.toptal.backend.exception.HttpException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class UserValidationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ValidationUtils utils;

    public void validateCreation(User user) {
        checkIfInvalidData(user);
        if(user.getRole() == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.INVALID_ROLE);
        }
        if(user.getRole() != UserRole.ROLE_USER
            && !utils.getAuthenticatedUserRole().equalsIgnoreCase(UserRole.ROLE_ADMIN.name())) {
            throw new AccessDeniedException("");
        }
        if(checkIfUserExists(user.getEmail())) {
            throw new HttpException(HttpStatus.CONFLICT, ErrorMessageConstants.ACCOUNT_ALREADY_EXISTS);
        }
    }

    public void checkIfInvalidData (User user) {
        String errorMsg = "";
        if(user == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.INVALID_DATA);
        }

        if(user.getEmail() == null || !utils.validateEmail(user.getEmail())) {
            errorMsg += ErrorMessageConstants.INVALID_EMAIL;
        }

        if(user.getPassword() == null || !utils.validatePassword(user.getPassword())) {
            errorMsg += ErrorMessageConstants.INVALID_PASSWORD;
        }

        if(user.getPreferredWorkingHour() == null || user.getPreferredWorkingHour()<=0
            || user.getPreferredWorkingHour()> 24) {
            errorMsg += ErrorMessageConstants.INVALID_PREFERRED_WORKING_HOUR;
        }

        if(errorMsg.length()>0) {
            throw new HttpException(HttpStatus.BAD_REQUEST, errorMsg);
        }
    }

    public Boolean checkIfUserExists (String email) {
        User user = userRepository.findByEmail(email);
        return user == null ? false : true;
    }

    public void userUpdateValidate (User user) {
        if(user == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.INVALID_DATA);
        }
        if(StringUtils.isEmpty(user.getEmail()) || user.getRole() == null || user.getPreferredWorkingHour() ==null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.INVALID_DATA);
        } else if(!utils.getAuthenticatedUserRole().equalsIgnoreCase(UserRole.ROLE_MANAGER.name())
                && !utils.getAuthenticatedUserRole().equalsIgnoreCase(UserRole.ROLE_ADMIN.name())
                && !utils.getAuthenticatedUserEmail().equalsIgnoreCase(user.getEmail()))
        {
            throw new AccessDeniedException("");
        } else {
            User existingUserData = userRepository.findByEmail(user.getEmail());
            //Role Update
            if(existingUserData.getRole() != user.getRole()){
                if(!utils.getAuthenticatedUserRole().equalsIgnoreCase(UserRole.ROLE_ADMIN.name())) {
                    throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.ROLE_UPDATE_PERMISSION);
                }
                if(utils.getAuthenticatedUserEmail().equalsIgnoreCase(user.getEmail())) {
                    throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.OWN_ROLE_UPDATE_PERMISSION);
                }
            }
        }
    }

    public void userDeleteValidate (String assigneeEmail) {
        if(StringUtils.isEmpty(assigneeEmail)) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.INVALID_DATA);
        } else if(!utils.getAuthenticatedUserRole().equalsIgnoreCase(UserRole.ROLE_MANAGER.name())
                && !utils.getAuthenticatedUserRole().equalsIgnoreCase(UserRole.ROLE_ADMIN.name())) {
            throw new AccessDeniedException("");
        } else if( utils.getAuthenticatedUserEmail().equalsIgnoreCase(assigneeEmail)) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.OWN_ACCOUNT_DELETE_PERMISSION);
        }
    }

    public void validateUserLogin(User user) {
        if(user.getEmail() == null || user.getPassword() == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.INVALID_DATA);
        }
    }

    public void checkIfUserHaveAccess(String assigneeEmail) {
        if(utils.getAuthenticatedUserRole().equalsIgnoreCase(UserRole.ROLE_ADMIN.name())
         || utils.getAuthenticatedUserRole().equalsIgnoreCase(UserRole.ROLE_MANAGER.name())
         || utils.getAuthenticatedUserEmail().equalsIgnoreCase(assigneeEmail)) {
            //OK
        } else {
            throw new AccessDeniedException("");
        }
    }

}
