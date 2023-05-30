package com.flowery.backend.controller;

import com.flowery.backend.model.dto.ReservationDto;
import com.flowery.backend.model.dto.SalesDto;
import com.flowery.backend.sevice.FlowerService;
import com.flowery.backend.sevice.ReservationService;
import com.flowery.backend.sevice.SalesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("sales")
public class SalesController {

    // sales에서 판매 기록이 나옴 (매출, 꽃 나간 량)
    private SalesService salesService;
    private final Logger LOGGER = LoggerFactory.getLogger(SalesController.class);


    SalesController(SalesService salesService, FlowerService flowerService, ReservationService reservationService){
        this.salesService = salesService;
    }

    @GetMapping("/hi")
    public ResponseEntity<List<SalesDto>> hi(@RequestParam int reservationId){
        return new ResponseEntity<>(salesService.findByReservationId(reservationId), HttpStatus.ACCEPTED);
    }

    // 상품별 판매 내역 확인
    @GetMapping("/goods")
    public ResponseEntity<List<List<Object>>> findAllByGoods (@RequestParam Integer storeId,
                                                                      @RequestParam String startDate,
                                                                      @RequestParam String endDate){
        LOGGER.info("findAllByGoods가 호출되었습니다.");
        try{
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
            LocalDateTime startTime = LocalDateTime.parse(startDate, formatter);
            LocalDateTime endTime = LocalDateTime.parse(endDate, formatter);
            
            return new ResponseEntity<List<List<Object>>>(salesService.findAllByGoods(storeId, startTime, endTime), HttpStatus.OK);
        } catch(Exception e) {
            LOGGER.error("내역 조회에 실패했습니다.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    // 꽃별 판매 내역 확인
    @GetMapping("/flowers")
    public ResponseEntity<List<List<Object>>> findAllByFlowers (@RequestParam Integer storeId,
                                                                @RequestParam String startDate,
                                                                @RequestParam String endDate){
        LOGGER.info("findAllByFlowers가 호출되었습니다.");
        try{
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
            LocalDateTime startTime = LocalDateTime.parse(startDate, formatter);
            LocalDateTime endTime = LocalDateTime.parse(endDate, formatter);

            return new ResponseEntity<List<List<Object>>>(salesService.findAllByFlowers(storeId, startTime, endTime), HttpStatus.OK);
        } catch(Exception e) {
            LOGGER.error("내역 조회에 실패했습니다.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    // 기간 내 판매 금액 확인
    @GetMapping("/total")
    public ResponseEntity<Integer> findAllByPrices (@RequestParam Integer storeId,
                                                                  @RequestParam String startDate,
                                                                  @RequestParam String endDate){
        LOGGER.info("findAllByPrices가 호출되었습니다.");
        try{
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
            LocalDateTime startTime = LocalDateTime.parse(startDate, formatter);
            LocalDateTime endTime = LocalDateTime.parse(endDate, formatter);

            return new ResponseEntity<Integer>(salesService.findAllByPrices(storeId, startTime, endTime), HttpStatus.OK);
        } catch(Exception e) {
            LOGGER.error("내역 조회에 실패했습니다.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }


}
