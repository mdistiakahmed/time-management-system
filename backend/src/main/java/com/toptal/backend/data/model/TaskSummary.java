package com.toptal.backend.data.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Data
@Entity
@Table(name = "T_TASK_SUMMARY")
public class TaskSummary {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column
    private String assignee;

    @NotNull
    @Column
    private Date completionDate;

    @Column
    private Double totalDuration;

    @Column
    private Integer taskCount;

    @Column
    private Double currentPreferredWorkingHour;

    @Version
    private Integer version;
}
