package com.toptal.backend.data.repository;

import com.toptal.backend.data.model.TaskSummary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;

public interface TaskSummaryRepository extends JpaRepository<TaskSummary, Long> {
    Page<TaskSummary> findByAssigneeAndCompletionDateBetween(String assignee, Date startDate, Date endDate, Pageable pageable);
    Page<TaskSummary> findByCompletionDateBetween(Date startDate, Date endDate, Pageable pageable);
    TaskSummary findByAssigneeAndCompletionDate(String assignee, Date completionDate);
}
