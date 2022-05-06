package com.toptal.backend.controller;

import com.toptal.backend.constants.AuthorityConstants;
import com.toptal.backend.constants.RestApiConstants;
import com.toptal.backend.controller.dto.request.UserDataParam;
import com.toptal.backend.controller.dto.response.DeleteCountResponse;
import com.toptal.backend.controller.dto.response.TokenResponse;
import com.toptal.backend.controller.dto.response.UserPageResponse;
import com.toptal.backend.data.model.User;
import com.toptal.backend.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;


@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Api(tags = "users", description = "Api for user management")
public class UserController {
    private final ModelMapper modelMapper;
    private final UserService userService;

    @RequestMapping(value = "login",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Authenticates user and returns its JWT token")
    public TokenResponse login(@RequestBody UserDataParam userDataParam) {
        String token = userService.getToken(modelMapper.map(userDataParam, User.class));
        return new TokenResponse(token);
    }

    @RequestMapping(value = "signup",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Creates user with role_user and returns its JWT token")
    public TokenResponse signup(@RequestBody UserDataParam userDataParam) {
        User user = modelMapper.map(userDataParam, User.class);
        user.setRole(RestApiConstants.DEFAULT_ROLE);
        user.setPreferredWorkingHour(RestApiConstants.DEFAULT_PREFERRED_WORKING_HOUR);
        userService.createUser(user);
        String token = userService.authenticateAndGenerateToken(userDataParam.getEmail(), userDataParam.getPassword());
        return new TokenResponse(token);
    }

    @RequestMapping(value = "users",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @RolesAllowed({AuthorityConstants.MANAGER,AuthorityConstants.ADMIN})
    @ApiOperation(value = "Returns user list, manager will get users will role_user, admin will get all user", authorizations = {@Authorization(value = "apiKey")})
    public UserPageResponse getAllUser(
            @RequestParam(value = "pageNo", defaultValue = RestApiConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = RestApiConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize
    ) {
        Page<User> userPage = userService.getAllUser(pageNo, pageSize);
        return UserPageResponse.from(userPage);
    }

    @RequestMapping(value = "users",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @RolesAllowed({AuthorityConstants.MANAGER,AuthorityConstants.ADMIN})
    @ApiOperation(value = "Creates a new user. Manager can only create user with role_user, admin can create user with any role", authorizations = {@Authorization(value = "apiKey")})
    public User createUser(@RequestBody UserDataParam userDataParam) {
        return userService.createUser(modelMapper.map(userDataParam, User.class));
    }


    @RequestMapping(value = "users",
            method = RequestMethod.PUT,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Updates an existing user. User/manager can not update role, admin can update anything except self role", authorizations = {@Authorization(value = "apiKey")})
    public User updateUser(@RequestBody UserDataParam param) {
        return userService.updateUser(modelMapper.map(param, User.class));
    }

    @RequestMapping(value = "users/{username}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @RolesAllowed({AuthorityConstants.MANAGER,AuthorityConstants.ADMIN})
    @ApiOperation(value = "Deletes an existing user, but the records of the user will be preserved", authorizations = {@Authorization(value = "apiKey")})
    public DeleteCountResponse deleteUser(@PathVariable String username) {
        Long deleteCount = userService.deleteUser(username);
        return new DeleteCountResponse(deleteCount);
    }

    @RequestMapping(value = "users/{username}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "Returns a single user information")
    public User getSingleUser(@PathVariable String username) {
        return userService.getSingleUser(username);
    }
}