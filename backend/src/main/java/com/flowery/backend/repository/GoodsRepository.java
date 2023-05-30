package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Goods;
import com.flowery.backend.model.entity.Stores;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoodsRepository extends JpaRepository<Goods, Integer> {

    public List<Goods> findGoodsByStoreId(Stores storeId);

    public void deleteByGoodsId(Integer goodsId);

}
