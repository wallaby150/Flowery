package com.flowery.backend.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.*;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Repository
public class RedisDao {
    private final int LIMIT_TIME = 3 * 60;  // (2)

    private final RedisTemplate<String, String> redisTemplate;

    private final RedisTemplate<String, Object> redisBlackListTemplate;

    public void setValues(String key, String data) {
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer(String.class));
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        values.set(key, data,Duration.ofSeconds(LIMIT_TIME));
    }

    public String getValue(String key){
        return redisTemplate.opsForValue().get(key);
    }

    public void setValues(String key, String data, int duration) {
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer(String.class));
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        values.set(key, data);
    }

    public void deleteKey(String key){
        redisTemplate.delete(key);
    }

    public boolean hasKey(String key) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }
    public void setBlackList(String key, Object o, int minutes) {
        redisBlackListTemplate.setValueSerializer(new Jackson2JsonRedisSerializer(o.getClass()));
        redisBlackListTemplate.opsForValue().set(key, o, minutes, TimeUnit.MINUTES);
    }

    public Object getBlackList(String key) {
        return redisBlackListTemplate.opsForValue().get(key);
    }

    public boolean deleteBlackList(String key) {
        return Boolean.TRUE.equals(redisBlackListTemplate.delete(key));
    }

    public boolean hasKeyBlackList(String key) {
        return Boolean.TRUE.equals(redisBlackListTemplate.hasKey(key));
    }

}