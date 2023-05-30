package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Flowers;
import com.flowery.backend.model.entity.Poems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PoemsRepository extends JpaRepository<Poems, Integer> {

    List<Poems> findAllByFlowerId (Flowers flowerId);


}
