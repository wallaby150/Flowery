package com.flowery.backend.model.dto;

import lombok.Data;

@Data
public class SmsMessageDto {
    private String to;
    private String content;
}
