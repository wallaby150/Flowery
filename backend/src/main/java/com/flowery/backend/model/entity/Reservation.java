package com.flowery.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Reservation {

    @Id
    @Column(name = "reservation_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reservationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private Users userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "store_id")
    private Stores storeId;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "message_id")
    private Messages messageId;

    @Column(name = "goods_name")
    private String goodsName;

    @Column(name = "price")
    private int price;

    @Column(name = "demand")
    private String demand;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "printed")
    private int printed;

    @Column(name = "permission")
    private Integer permission;

    @Column(name = "reservation_name")
    private String reservationName;

    @Column(name = "phrase")
    private String phrase;

    @Column(name = "image")
    private String image;

    @Column(name = "card")
    private int card;

    @Column(name = "rendered_card")
    private String renderedCard;

}
