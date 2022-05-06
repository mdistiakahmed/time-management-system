package com.toptal.backend.service;

import com.toptal.backend.data.model.UserRole;
import com.toptal.backend.security.JwtUtil;
import com.toptal.backend.constants.ErrorMessageConstants;
import com.toptal.backend.data.model.User;
import com.toptal.backend.data.repository.UserRepository;
import com.toptal.backend.exception.HttpException;
import com.toptal.backend.service.validation.UserValidationService;
import com.toptal.backend.service.validation.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    @Autowired
    private UserValidationService userValidationService;

    @Autowired
    private ValidationUtils utils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TaskService taskService;

    @Autowired
    private JwtUtil jwtUtil;

    public String getToken(User user) {
        userValidationService.validateUserLogin(user);
        return authenticateAndGenerateToken(user.getEmail(), user.getPassword());
    }

    public Page<User> getAllUser(int pageNo, int pageSize) {
        Pageable pageable = pageSize == -1 ? Pageable.unpaged() : PageRequest.of(pageNo, pageSize);
        Page<User> users;
        if(utils.getAuthenticatedUserRole().equalsIgnoreCase(UserRole.ROLE_ADMIN.name())) {
            users = userRepository.findAll(pageable);
        } else {
            users = userRepository.findByRole(UserRole.ROLE_USER, pageable);
        }

        return users;
    }

    public User getSingleUser(String email) {
        userValidationService.checkIfUserHaveAccess(email);
        User user = userRepository.findByEmail(email);
        if(user == null) {
            throw new HttpException(HttpStatus.NOT_FOUND, ErrorMessageConstants.ACCOUNT_NOT_EXISTS);
        }
        return user;
    }

    public User createUser(User user) {
        userValidationService.validateCreation(user);

        user.setPassword(bcryptEncoder.encode(user.getPassword()));
        User createdUser =  userRepository.save(user);
        return createdUser;
    }

    public User updateUser(User userToUpdate) {
        userValidationService.userUpdateValidate(userToUpdate);

        User user = userRepository.findByEmail(userToUpdate.getEmail());
        if(user == null) {
            throw new HttpException(HttpStatus.BAD_REQUEST, ErrorMessageConstants.ACCOUNT_NOT_EXISTS);
        }
        user.setPreferredWorkingHour(userToUpdate.getPreferredWorkingHour());
        user.setRole(userToUpdate.getRole());
        User updatedUser =  userRepository.save(user);
        taskService.updateTaskSummaryCurrentPrefWorkingHour(updatedUser.getEmail(), updatedUser.getPreferredWorkingHour());
        return updatedUser;
    }

    public long deleteUser(String email) {
        userValidationService.userDeleteValidate(email);
        return userRepository.deleteByEmail(email);
    }

    public String authenticateAndGenerateToken(String username, String password) {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username,password));
        return jwtUtil.generateToken(authentication);
    }
}
