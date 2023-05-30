package com.flowery.backend.repository;

import com.flowery.backend.model.entity.Messages;
import com.flowery.backend.model.entity.Reservation;
import com.flowery.backend.model.entity.Stores;
import com.flowery.backend.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    public List<Reservation> findAllByDateBetween(LocalDateTime before, LocalDateTime after);

    public List<Reservation> findByStoreIdOrderByDateAsc(Stores storeId);

    @Query(value = "SELECT * FROM reservation WHERE reservation.store_id = ?1 AND reservation.date >= ?2 AND reservation.date <= ?3 AND reservation.user_id != 0", nativeQuery = true)
    public List<Reservation> findAllByStoreIdInToday(Integer store, LocalDateTime from, LocalDateTime to);
    public List<Reservation> findAllByStoreIdAndDateBetween(Stores store, LocalDateTime from, LocalDateTime to);

    public List<Reservation> findAllByUserIdOrderByDateDesc(Users users);

    public Reservation findByMessageId(Messages messageId);

}
