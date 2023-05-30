package com.flowery.backend.model.dto;

import lombok.Data;

@Data
public class InfoWithSmsDto {
    private Integer userId;
    private String phone;
    private String denyReason;
    private Integer reservationId;
    private Integer code;
}
