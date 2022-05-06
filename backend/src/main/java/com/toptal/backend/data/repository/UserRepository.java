package com.toptal.backend.data.repository;

import com.toptal.backend.data.model.User;
import com.toptal.backend.data.model.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    long deleteByEmail(String email);
    Page<User> findByRole(UserRole status, Pageable pageable);
}
