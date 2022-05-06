package com.toptal.backend.data.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Data
@Entity
@Table(name = "T_TASK")
public class Task {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column
    private String assignee;

    @NotNull
    @Column
    private String description;

    @NotNull
    @Column
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column
    private Long startTimeInMillis;

    @Column
    private Date completionDate;

    @Column
    private Double duration;

    @Version
    private Integer version;
}
