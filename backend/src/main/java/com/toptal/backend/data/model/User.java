package com.toptal.backend.data.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "T_USER")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Column(unique = true)
    private String email;

    @JsonIgnore
    @Column
    @NotNull
    private String password;

    @Column
    @NotNull
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column
    @NotNull
    private Double preferredWorkingHour;
}
