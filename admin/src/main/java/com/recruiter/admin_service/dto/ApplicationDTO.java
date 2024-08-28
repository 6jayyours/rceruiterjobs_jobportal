package com.recruiter.admin_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ApplicationDTO {
    private Integer jobId;
    private LocalDateTime appliedTime;
    private String status;
    private String postedBy;
    private String applicant;
    private String jobTitle;
    private String resumeFileName;
    private String downloadUrl;
    private Integer postedId;
}
