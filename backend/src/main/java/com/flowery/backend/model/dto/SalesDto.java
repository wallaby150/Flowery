package com.flowery.backend.model.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SalesDto {

    private int saleId;

    private int flowerId;

    private int reservationId;

    private LocalDateTime date;

    private int count;

}
