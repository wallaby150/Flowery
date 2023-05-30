package com.flowery.backend.model.dto;

import com.flowery.backend.model.entity.Users;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Data
@NoArgsConstructor
public class UsersDto {

    private Integer usersId;

    private String id;

    private String pass;

    private String phone;

    public UsersDto(Users users){
        this.usersId = users.getUsersId();
        this.id = users.getId();
        this.pass = users.getPass();
        this.phone = users.getPhone();;
    }

}
