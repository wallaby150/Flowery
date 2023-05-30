package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Stores;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoreRepository extends JpaRepository<Stores, Integer> {
    List<Stores> findByPermit(Integer permission);
    Stores findByStoreId(Integer storeId);

}
