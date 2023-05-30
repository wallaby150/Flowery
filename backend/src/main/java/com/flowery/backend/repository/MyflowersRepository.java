package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Messages;
import com.flowery.backend.model.entity.Myflowers;
import com.flowery.backend.model.entity.Mygardens;
import com.flowery.backend.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MyflowersRepository extends JpaRepository<Myflowers, Integer> {

    List<Myflowers> findAllByMessageId(Messages messages);

}
