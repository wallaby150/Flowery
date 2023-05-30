package com.flowery.backend.jwt;

import com.flowery.backend.model.entity.Users;
import lombok.Getter;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;

@Getter
public class UsersDetail extends User {

    private final Users users;

    public UsersDetail(Users users, String role) {
        super(users.getId(), users.getPass(), List.of(new SimpleGrantedAuthority(role)));
        this.users = users;
    }

}
