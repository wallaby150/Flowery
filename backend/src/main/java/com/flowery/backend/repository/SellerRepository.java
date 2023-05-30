package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Seller;
import com.flowery.backend.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerRepository extends JpaRepository<Seller, Integer> {

    public Seller findByUserId(Users userId);

}
