package com.flowery.backend.jwt;

import lombok.Getter;

@Getter
public class Subject {

    private final Integer userId;

    private final String id;

    private final String phone;

    private final String type;

    private Subject(Integer userId, String id, String phone, String type) {
        this.userId = userId;
        this.id = id;
        this.phone = phone;
        this.type = type;
    }

    public static Subject atk(Integer userId, String id, String phone) {
        return new Subject(userId, id, phone, "ATK");
    }

    public static Subject rtk(Integer userId, String id, String phone) {
        return new Subject(userId, id, phone, "RTK");
    }
}