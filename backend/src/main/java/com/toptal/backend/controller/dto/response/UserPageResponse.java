package com.toptal.backend.controller.dto.response;

import com.toptal.backend.data.model.User;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
public class UserPageResponse {
    private List<User> userList;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;

    public static UserPageResponse from(Page<User> userPage) {
        UserPageResponse userPageResponse = new UserPageResponse();
        userPageResponse.setUserList(userPage.getContent());
        userPageResponse.setPageNumber(userPage.getNumber());
        userPageResponse.setTotalPages(userPage.getTotalPages());
        userPageResponse.setPageSize(userPage.getSize());
        userPageResponse.setTotalElements(userPage.getTotalElements());

        return userPageResponse;
    }
}
