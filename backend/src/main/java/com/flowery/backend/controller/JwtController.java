package com.flowery.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.flowery.backend.jwt.JwtProvider;
import com.flowery.backend.jwt.TokenResponse;
import com.flowery.backend.jwt.UsersDetail;
import com.flowery.backend.model.dto.UsersDto;
import com.flowery.backend.redis.RedisDao;
import com.flowery.backend.sevice.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("token")
@RequiredArgsConstructor
public class JwtController {

    private UsersService usersService;
    private final JwtProvider jwtProvider;
    private final RedisDao redisDao;

    @GetMapping("/reissue")
    public ResponseEntity<TokenResponse> reissue(@AuthenticationPrincipal UsersDetail usersDetail) throws JsonProcessingException {
        UsersDto usersDto = new UsersDto(usersDetail.getUsers());
        return new ResponseEntity<>(jwtProvider.reissueAtk(usersDto), HttpStatus.ACCEPTED);
    }

    @GetMapping("/rtk")
    public ResponseEntity<TokenResponse> getRtk(@RequestParam String userId){
        TokenResponse tokenResponse = new TokenResponse("", redisDao.getValue(userId));
        return new ResponseEntity<>(tokenResponse, HttpStatus.ACCEPTED);
    }

}
