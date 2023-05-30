package com.flowery.backend.model.dto;

import lombok.Data;

@Data
public class CardDto {

    private String qrBase64;

    private String reservationName;

    private String phrase;

    private int card;
}
