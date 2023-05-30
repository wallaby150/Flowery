package com.flowery.backend.model.dto;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class ReservationDto {

    private int reservationId;

    private Integer userId;

    private Integer storeId;

    private String messageId;

    private String goodsName;

    private Integer price;

    private String demand;

    private LocalDateTime date;

    private int printed;

    private Integer permission;

    private String reservationName;

    private String phrase;

    private String image;

    private Integer card;

    private String renderedCard;

    private String phone;

}
