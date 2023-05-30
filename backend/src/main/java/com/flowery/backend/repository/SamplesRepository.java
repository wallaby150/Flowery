package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Goods;
import com.flowery.backend.model.entity.Samples;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SamplesRepository extends JpaRepository<Samples, Integer> {

    public List<Samples> findAllByGoodsId(Goods goodsId);

}
