package com.flowery.backend.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.flowery.backend.jwt.exception.BadRequestException;
import com.flowery.backend.model.dto.SellerDto;
import com.flowery.backend.model.dto.UsersDto;
import com.flowery.backend.redis.RedisDao;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.Duration;
import java.util.Base64;
import java.util.Date;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final RedisDao redisDao;
    private final ObjectMapper objectMapper;

    @Value("${spring.jwt.key}")
    private String key;

    @Value("${spring.jwt.live.atk}")
    private Long atkLive;

    @Value("${spring.jwt.live.rtk}")
    private Long rtkLive;

    private final String atxPreFix = "atk_";
    private final String rtxPreFix = "rtk_";
    private final String rolePreFix = "role_";

    @PostConstruct
    protected void init() {
        key = Base64.getEncoder().encodeToString(key.getBytes());
    }

    public TokenResponse createTokensByLogin(UsersDto usersDto) throws JsonProcessingException {

        Subject atkSubject = Subject.atk(
                usersDto.getUsersId(),
                usersDto.getId(),
                usersDto.getPhone());
        Subject rtkSubject = Subject.rtk(
                usersDto.getUsersId(),
                usersDto.getId(),
                usersDto.getPhone());
        String atk = createToken(atkSubject, atkLive*20000);
        String rtk = createToken(rtkSubject, rtkLive*100000);

        redisDao.setValues(atxPreFix+usersDto.getId(), atk, 120);
        redisDao.setValues(rtxPreFix+usersDto.getId(), rtk, 120);
        redisDao.setValues(rolePreFix+usersDto.getId(), "ROLE_USER", 120);
        return new TokenResponse(atk, rtk);
    }

    public TokenResponse createTokensBySellerLogin(UsersDto usersDto) throws JsonProcessingException {

        Subject atkSubject = Subject.atk(
                usersDto.getUsersId(),
                usersDto.getId(),
                usersDto.getPhone());
        Subject rtkSubject = Subject.rtk(
                usersDto.getUsersId(),
                usersDto.getId(),
                usersDto.getPhone());
        String atk = createToken(atkSubject, atkLive*20000);
        String rtk = createToken(rtkSubject, rtkLive*100000);

        redisDao.setValues(atxPreFix+usersDto.getId(), atk, 120);
        redisDao.setValues(rtxPreFix+usersDto.getId(), rtk, 120);
        redisDao.setValues(rolePreFix+usersDto.getId(), "ROLE_SELLER", 120);

        return new TokenResponse(atk, rtk);
    }

    private String createToken(Subject subject, Long tokenLive) throws JsonProcessingException {
        String subjectStr = objectMapper.writeValueAsString(subject);
        Claims claims = Jwts.claims()
                .setSubject(subjectStr);
        Date date = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(date)
                .setExpiration(new Date(date.getTime() + tokenLive))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    public Subject getSubject(String atk) throws JsonProcessingException {
        if(redisDao.hasKeyBlackList(atk)){
            throw new RuntimeException("로그아웃 되었습니다!");
        }
        String subjectStr = Jwts.parser().setSigningKey(key).parseClaimsJws(atk).getBody().getSubject();
        return objectMapper.readValue(subjectStr, Subject.class);
    }

    public TokenResponse reissueAtk(UsersDto usersDto) throws JsonProcessingException {
        String rtkInRedis = redisDao.getValue(usersDto.getId());
        if (Objects.isNull(rtkInRedis)){
            throw new BadRequestException("인증 정보가 만료되었습니다.");
        }
        Subject atkSubject = Subject.atk(
                usersDto.getUsersId(),
                usersDto.getId(),
                usersDto.getPhone());
        String atk = createToken(atkSubject, atkLive);
        return new TokenResponse(atk, null);
    }
}