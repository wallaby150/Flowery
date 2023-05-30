package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Reservation;
import com.flowery.backend.model.entity.Sales;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SalesRepository extends JpaRepository<Sales, Integer> {

    public List<Sales> findAllByReservationId(Reservation reservationId);

}
