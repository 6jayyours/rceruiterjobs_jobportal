package com.recruiter.admin_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class JobDTO {
    private Integer id;
    private String jobTitle;
    private String jobCategory;
    private String jobType;
    private String jobLevel;
    private String experience;
    private String qualification;
    private String salary;
    private String skills;
    private String country;
    private String state;
    private String city;
    private String pincode;
    private String company;
    private LocalDateTime postedTime;
    private Integer user;
    private String description;
    private String requirements;
    private String responsibilities;
    private String posted;
    private String status;
}
