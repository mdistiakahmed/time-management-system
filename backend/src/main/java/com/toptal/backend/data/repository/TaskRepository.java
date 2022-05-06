package com.toptal.backend.data.repository;

import com.toptal.backend.data.model.Status;
import com.toptal.backend.data.model.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;

public interface TaskRepository extends JpaRepository<Task, Long> {
    Page<Task> findByAssigneeAndStatusAndCompletionDateBetween(String assignee, Status status, Date startDate, Date endDate, Pageable pageable);
    Page<Task> findByStatusAndCompletionDateBetween(Status status, Date startDate, Date endDate, Pageable pageable);
    Page<Task> findByAssigneeAndStatus(String assignee, Status status, Pageable pageable);
    Page<Task> findByStatus(Status status, Pageable pageable);
}
