package com.recruiter.chatnotification_service.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignalingData {

    private String type;
    private String sdp;
}