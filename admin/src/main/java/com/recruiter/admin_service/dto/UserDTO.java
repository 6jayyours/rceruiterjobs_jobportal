package com.recruiter.admin_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UserDTO {
    private Integer id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private boolean status;
    private boolean subscription;
    private String idImageUrl;
    private String profileImageUrl;
    private LocalDateTime registrationDate;
}