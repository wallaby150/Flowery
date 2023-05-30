package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Messages;
import com.flowery.backend.model.entity.Mygardens;
import com.flowery.backend.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MygardensRepository extends JpaRepository<Mygardens, Integer> {

    Mygardens findByUserIdAndMessageId(Users user, Messages message);

    List<Mygardens> findAllByUserId(Users user);
}
