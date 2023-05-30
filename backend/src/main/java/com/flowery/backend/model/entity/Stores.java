package com.flowery.backend.model.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Stores {
    @Id
    @Column(name = "store_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int storeId;

    @Column(name = "store_name")
    private String storeName;

    @Column(name = "store_phone")
    private String storePhone;

    @Column(name = "permit")
    private int permit;

    @Column(name = "open")
    private int open;

    @Column(name = "close")
    private int close;

    @Column(name = "address")
    private String address;

    @Column(name = "info")
    private String info;

    @Column(name = "image")
    private String image;

    @Column(name = "profile")
    private String profile;

}
