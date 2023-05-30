package com.flowery.backend.sevice;

import com.flowery.backend.model.dto.SalesDto;
import com.flowery.backend.model.entity.Flowers;
import com.flowery.backend.model.entity.Reservation;
import com.flowery.backend.model.entity.Sales;
import com.flowery.backend.model.entity.Stores;
import com.flowery.backend.repository.ReservationRepository;
import com.flowery.backend.repository.SalesRepository;
import com.flowery.backend.repository.StoreRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
public class SalesService {

    private SalesRepository salesRepository;
    private ReservationRepository reservationRepository;
    private StoreRepository storeRepository;

    SalesService(SalesRepository salesRepository, ReservationRepository reservationRepository,
                 StoreRepository storeRepository){
        this.salesRepository = salesRepository;
        this.reservationRepository = reservationRepository;
        this.storeRepository = storeRepository;
    }

    public List<SalesDto> findByReservationId(int reservationId){

        List<SalesDto> result = new ArrayList<>();

        Reservation reservation = reservationRepository.findById(reservationId).get();

        List<Sales> tmp = salesRepository.findAllByReservationId(reservation);

        for(int i=0; i< tmp.size(); i++){
            SalesDto salesDto = new SalesDto();

            salesDto.setReservationId(reservationId);
            salesDto.setSaleId(tmp.get(i).getSaleId());
            salesDto.setDate(tmp.get(i).getSaleDate());
            salesDto.setCount(tmp.get(i).getCount());
            salesDto.setFlowerId(tmp.get(i).getFlowerId().getFlowerId());

            result.add(salesDto);
        }

        return result;

    }

    // LinkedHashMap을 value 기준으로 정렬해주는 코드
    public static LinkedHashMap<String, Integer> sortMapByValue(Map<String, Integer> map) {
        List<Map.Entry<String, Integer>> entries = new LinkedList<>(map.entrySet());
        Collections.sort(entries, (o1, o2) -> o1.getValue().compareTo(o2.getValue()));

        LinkedHashMap<String, Integer> result = new LinkedHashMap<>();
        for (Map.Entry<String, Integer> entry : entries) {
            result.put(entry.getKey(), entry.getValue());
        }
        return result;
    }

    public List<List<Object>> findAllByGoods(Integer storeId, LocalDateTime startDate, LocalDateTime endDate) throws Exception {
        LocalDateTime startPoint = LocalDateTime.of(LocalDate.from(startDate), LocalTime.of(0,0,0));
        LocalDateTime endPoint = LocalDateTime.of(LocalDate.from(endDate), LocalTime.of(23,59,59));

        Stores store = storeRepository.findByStoreId(storeId);
        if (store == null) {
            throw new NoSuchElementException("해당 storeId가 없습니다.");
        }

        List<Reservation> list = reservationRepository.findAllByStoreIdAndDateBetween(store, startPoint,endPoint);

        // 각 goodsName 별로 예약 횟수를 저장할 맵
        Map<String, Integer> reservationCountMap = new LinkedHashMap<>();

        // Reservation 리스트를 순회하면서 goodsName 별 예약 횟수를 카운트
        for (Reservation reservation : list) {
            String goodsName = reservation.getGoodsName();
            reservationCountMap.put(goodsName, reservationCountMap.getOrDefault(goodsName, 0) + 1);
        }

        List<List<Object>> result = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : reservationCountMap.entrySet()) {
            List<Object> innerList = new ArrayList<>();
            innerList.add(entry.getKey()); // goodsName
            innerList.add(entry.getValue()); // count
            result.add(innerList);
        }

        // 1번 인덱스 값으로 내림차순 정렬
        Collections.sort(result, (list1, list2) -> Integer.compare((Integer) list2.get(1), (Integer) list1.get(1)));

        return result;

    }

    // 꽃별 판매 내역 확인
    public List<List<Object>> findAllByFlowers(Integer storeId, LocalDateTime startDate, LocalDateTime endDate) throws Exception {
        LocalDateTime startPoint = LocalDateTime.of(startDate.toLocalDate(), LocalTime.of(0, 0, 0));
        LocalDateTime endPoint = LocalDateTime.of(endDate.toLocalDate(), LocalTime.of(23, 59, 59));

        Stores store = storeRepository.findByStoreId(storeId);
        if (store == null) {
            throw new NoSuchElementException("해당 storeId가 없습니다.");
        }

        List<Reservation> list = reservationRepository.findAllByStoreIdAndDateBetween(store, startPoint, endPoint);

        // 각 flowerName 별로 예약 횟수를 저장할 맵
        Map<String, Integer> reservationCountMap = new HashMap<>();

        // Reservation 리스트를 순회하면서 flowerName 별 예약 횟수를 카운트
        for (Reservation reservation : list) {
            List<Sales> salesList = salesRepository.findAllByReservationId(reservation);

            for (Sales sales : salesList) {
                Flowers flowers = sales.getFlowerId();
                reservationCountMap.put(flowers.getFlowerName(), reservationCountMap.getOrDefault(flowers.getFlowerName(), 0) + sales.getCount());
            }
        }

        List<List<Object>> result = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : reservationCountMap.entrySet()) {
            List<Object> innerList = new ArrayList<>();
            innerList.add(entry.getKey()); // flowerName
            innerList.add(entry.getValue()); // count
            result.add(innerList);
        }

        // 1번 인덱스 값으로 내림차순 정렬
        Collections.sort(result, (list1, list2) -> Integer.compare((Integer) list2.get(1), (Integer) list1.get(1)));

        return result;
    }


    public Integer findAllByPrices(Integer storeId, LocalDateTime startDate, LocalDateTime endDate) {
        LocalDateTime startPoint = LocalDateTime.of(LocalDate.from(startDate), LocalTime.of(0,0,0));
        LocalDateTime endPoint = LocalDateTime.of(LocalDate.from(endDate), LocalTime.of(23,59,59));

        Stores store = storeRepository.findByStoreId(storeId);
        if (store == null) {
            throw new NoSuchElementException("해당 storeId가 없습니다.");
        }

        List<Reservation> list = reservationRepository.findAllByStoreIdAndDateBetween(store, startPoint,endPoint);

        Integer totalPrice = 0;

        for (Reservation reservation : list) {
            totalPrice += reservation.getPrice();
            }


        return totalPrice;

    }
}
