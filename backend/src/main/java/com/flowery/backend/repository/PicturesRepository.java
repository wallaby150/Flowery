package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Messages;
import com.flowery.backend.model.entity.Pictures;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PicturesRepository extends JpaRepository<Pictures, Integer> {

    List<Pictures> findAllByMessageId(Messages messageId);

}
