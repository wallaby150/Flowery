package com.flowery.backend.sevice;

import com.flowery.backend.model.dto.CardDto;
import com.flowery.backend.model.dto.ReservationDto;
import com.flowery.backend.model.dto.StoresDto;
import com.flowery.backend.model.entity.*;
import com.flowery.backend.repository.*;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageConfig;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;


@Service
public class ReservationService {

    // 예약 거부, 승인, 확인 등이 여기 있음

    private ReservationRepository reservationRepository;
    private StoreRepository storeRepository;
    private UsersRepository usersRepository;
    private GoodsRepository goodsRepository;
    private MessagesRepository messagesRepository;
    private SamplesRepository samplesRepository;

    ReservationService(ReservationRepository reservationRepository, StoreRepository storeRepository,
                       UsersRepository usersRepository, GoodsRepository goodsRepository, MessagesRepository messagesRepository,
                       SamplesRepository samplesRepository){
        this.reservationRepository = reservationRepository;
        this.storeRepository = storeRepository;
        this.usersRepository = usersRepository;
        this.goodsRepository = goodsRepository;
        this.messagesRepository = messagesRepository;
        this.samplesRepository = samplesRepository;
    }




    public class ReservationNotFoundException extends RuntimeException {
        public ReservationNotFoundException(String message) {
            super(message);
        }
    }

    public ReservationDto updateReservation(ReservationDto reservationDto) throws Exception {
        Reservation reservation = reservationRepository.findById(reservationDto.getReservationId())
                .orElseThrow(() -> new ReservationNotFoundException("예약을 찾을 수 없습니다."));
        boolean changed = false;

        if (reservationDto.getGoodsName() != null){
            reservation.setGoodsName(reservationDto.getGoodsName());
            changed = true;
        }
        if (reservationDto.getPrice() != null) {
            reservation.setPrice(reservationDto.getPrice());
            changed = true;

        }
        if (reservationDto.getRenderedCard() != null) {
            reservation.setRenderedCard(reservationDto.getRenderedCard());
            changed = true;
        }

        if (changed) {
            List<Goods> goodsList = goodsRepository.findGoodsByStoreId(reservation.getStoreId());
            // 올바른 가격과 상품이 선택되었는지 확인함
            for(int i=0; i<goodsList.size(); i++){
                if(goodsList.get(i).getGoodsName().equals(reservationDto.getGoodsName())){
                    Goods goods = goodsList.get(i);
                    List<Samples> samplesList = samplesRepository.findAllByGoodsId(goods);
                    if (samplesList.size() > 0) {
                        String image = samplesList.get(0).getPicture();
                        reservation.setImage(image);
                    }
                }
            }
            reservationRepository.save(reservation);

            ReservationDto tmp = new ReservationDto();
            reservationEntityToDto(tmp, reservation);


            return tmp;
        }
        else {
            throw new Exception("변경사항이 입력되지 않았습니다.");
        }
    }



    public List<ReservationDto> findTodayReservation(LocalDateTime dateTime){

        LocalDateTime yesterday = LocalDateTime.of(LocalDate.from(dateTime), LocalTime.of(0,0,0));
        LocalDateTime today = LocalDateTime.of(LocalDate.from(dateTime), LocalTime.of(23,59,59));

        List<Reservation> list = reservationRepository.findAllByDateBetween(yesterday,today);
        List<ReservationDto> result = new ArrayList<>();

        for(int i=0; i<list.size(); i++){

            ReservationDto tmp = new ReservationDto();

            reservationEntityToDto(tmp, list.get(i));

            result.add(tmp);
        }

        return result;

    }

    public List<ReservationDto> findDayReservation(StoresDto storesDto, LocalDateTime dateTime){

        LocalDateTime yesterday = LocalDateTime.of(LocalDate.from(dateTime), LocalTime.of(0,0,0));
        LocalDateTime today = LocalDateTime.of(LocalDate.from(dateTime), LocalTime.of(23,59,59));


        int storeId = storesDto.getStoreId();
        Stores store = storeRepository.findById(storeId).get();

        List<Reservation> list = reservationRepository.findAllByStoreIdInToday(store.getStoreId(), yesterday, today);

        List<ReservationDto> result = new ArrayList<>();

        for(int i=0; i<list.size(); i++){

            ReservationDto tmp = new ReservationDto();

            reservationEntityToDto(tmp, list.get(i));

            result.add(tmp);
        }

        return result;

    }

    public List<ReservationDto> findByStoreId(int storeId) {
        List<ReservationDto> result = new ArrayList<>();

        Stores store = storeRepository.findById(storeId).get();
        List<Reservation> list = reservationRepository.findByStoreIdOrderByDateAsc(store);

        for(int i=0; i<list.size(); i++){

            ReservationDto tmp = new ReservationDto();

            reservationEntityToDto(tmp, list.get(i));

            result.add(tmp);
        }

        return result;


    }

    // 예약 승인
    public ReservationDto acceptReservation (ReservationDto reservationDto) throws Exception {
        Reservation reservation = reservationRepository.findById(reservationDto.getReservationId())
                .orElseThrow(() -> new ReservationNotFoundException("예약을 찾을 수 없습니다."));
        // 해당 판매자가 아니라면 승인할 수 없음
        if (reservation.getStoreId().getStoreId() != reservationDto.getStoreId()) {
            throw new NotAuthorizedException("해당 판매자의 예약이 아닙니다.");
        }

        if (reservation.getPermission() != null) {
            if (reservation.getPermission() == 1) {
                throw new AlreadyPermittedException("이미 승인된 예약입니다.");
            }

            if (reservation.getPermission() == 0) {
                throw new NotPermittedException("승인 거절된 예약입니다.");
            }
        }


        reservation.setPermission(1);
        reservationRepository.save(reservation);
        ReservationDto tmp = new ReservationDto();
        reservationEntityToDto(tmp, reservation);

        return tmp;

    }

    // 예약 거절
    public ReservationDto denyReservation (ReservationDto reservationDto) throws Exception {
       Reservation reservation = reservationRepository.findById(reservationDto.getReservationId())
                .orElseThrow(() -> new ReservationNotFoundException("예약을 찾을 수 없습니다."));

        // 해당 판매자가 아니라면 거절할 수 없음
        if (reservation.getStoreId().getStoreId() != reservationDto.getStoreId()) {
            throw new NotAuthorizedException("해당 판매자의 예약이 아닙니다.");
        }

        if (reservation.getPermission() != null) {
            if (reservation.getPermission() == 1) {
                throw new AlreadyPermittedException("이미 승인된 예약입니다.");
            }

            if (reservation.getPermission() == 0) {
                throw new NotPermittedException("승인 거절된 예약입니다.");
            }
        }


        reservation.setPermission(0);
        reservationRepository.save(reservation);
        ReservationDto tmp = new ReservationDto();
        reservationEntityToDto(tmp, reservation);

        return tmp;

    }

    public void reservationEntityToDto(ReservationDto tmp, Reservation reservation){

        tmp.setReservationId(reservation.getReservationId());
        tmp.setDate(reservation.getDate());
        tmp.setPrice(reservation.getPrice());
        tmp.setDemand(reservation.getDemand());
        tmp.setPermission(reservation.getPermission());
        tmp.setPrinted(reservation.getPrinted());
        tmp.setUserId(reservation.getUserId().getUsersId());
        tmp.setStoreId(reservation.getStoreId().getStoreId());
        tmp.setGoodsName(reservation.getGoodsName());
        tmp.setReservationName(reservation.getReservationName());
        tmp.setPhrase(reservation.getPhrase());
        tmp.setCard(reservation.getCard());
        tmp.setMessageId(reservation.getMessageId() == null ? null : reservation.getMessageId().getMessageId());
        tmp.setImage(reservation.getImage() == null ? null : reservation.getImage());
        tmp.setRenderedCard(reservation.getRenderedCard() == null ? null : reservation.getRenderedCard());

        Users user = usersRepository.findByUsersId(reservation.getUserId().getUsersId());
        tmp.setPhone(user.getPhone());



        return;

    }

    public int makeReservation(ReservationDto reservationDto) throws Exception {

        Reservation reservation = new Reservation();
        Users users = usersRepository.findById(reservationDto.getUserId()).get();
        reservation.setUserId(users);

        // store id를 가져와 goods에 해당 제품이 있는지 확인해준다.
        // 해당 제품이 없고 해당 제품과 요청 가격이 같지 않다면 return false를 해준다.
        Stores stores = storeRepository.findById(reservationDto.getStoreId()).get();

        // 가게가 아직 승인되지 않은 가게라면 무조건 false 처리
        if(stores.getPermit()==0){
            throw new NotAuthorizedException("승인되지 않은 가게입니다.");
        }

        List<Goods> goodsList = goodsRepository.findGoodsByStoreId(stores);

        boolean check = true;

        // 올바른 가격과 상품이 선택되었는지 확인함
        for(int i=0; i<goodsList.size(); i++){
            if(goodsList.get(i).getGoodsName().equals(reservationDto.getGoodsName()) &&
            goodsList.get(i).getGoodsPrice() == reservationDto.getPrice()){
                check = false;

                // 샘플 이미지 가져오는 코드
                Goods goods = goodsList.get(i);
                List<Samples> samplesList = samplesRepository.findAllByGoodsId(goods);
                if (samplesList.size() > 0) {
                    String image = samplesList.get(0).getPicture();
                    reservation.setImage(image);
                }
            }
        }

        // 만약 아니라면 false 리턴
        if(check){
            throw new NoSuchElementException("해당 상품이 없습니다.");
        }

        Messages messages = null;

        // 메시지 아이디가 null값이 아니라면 가져온다.
        if(reservationDto.getMessageId() != null){
            messages = messagesRepository.findById(reservationDto.getMessageId()).get();
        }

        reservation.setStoreId(stores);
        reservation.setMessageId(messages);

        reservation.setGoodsName(reservationDto.getGoodsName());
        reservation.setPrice(reservationDto.getPrice());

        reservation.setDemand(reservationDto.getDemand());
        reservation.setDate(reservationDto.getDate());
        reservation.setPrinted(0);
        reservation.setPermission(null);
//        프로젝트용 코드
//        reservation.setPermission(1);
        reservation.setReservationName(reservationDto.getReservationName());
        reservation.setPhrase(reservationDto.getPhrase());
//        reservation.setImage(stores.getImage());
        reservation.setCard(reservationDto.getCard());
        reservation.setRenderedCard(reservationDto.getRenderedCard());

        reservationRepository.save(reservation);
        return reservation.getReservationId();
    }

    // 현장 구매
    public int makeReservationOnSite(ReservationDto reservationDto) throws Exception {
        Reservation reservation = new Reservation();
        Users users = usersRepository.findById(reservationDto.getUserId()).get();
        reservation.setUserId(users);

        // store id를 가져와 goods에 해당 제품이 있는지 확인해준다.
        // 해당 제품이 없고 해당 제품과 요청 가격이 같지 않다면 return false를 해준다.
        Stores stores = storeRepository.findById(reservationDto.getStoreId()).get();

        // 가게가 아직 승인되지 않은 가게라면 무조건 false 처리
        if(stores.getPermit()==0){
            throw new NotAuthorizedException("승인되지 않은 가게입니다.");
        }

        List<Goods> goodsList = goodsRepository.findGoodsByStoreId(stores);

        boolean check = true;

        // 올바른 가격과 상품이 선택되었는지 확인함
        for(int i=0; i<goodsList.size(); i++){
            if(goodsList.get(i).getGoodsName().equals(reservationDto.getGoodsName()) &&
                    goodsList.get(i).getGoodsPrice() == reservationDto.getPrice()){
                check = false;

                // 샘플 이미지 가져오는 코드
                Goods goods = goodsList.get(i);
                List<Samples> samplesList = samplesRepository.findAllByGoodsId(goods);
                if (samplesList.size() > 0) {
                    String image = samplesList.get(0).getPicture();
                    reservation.setImage(image);
                }
            }
        }

        // 만약 아니라면 false 리턴
        if(check){
            throw new NoSuchElementException("해당 상품이 없습니다.");
        }

        Messages messages = null;

        reservation.setStoreId(stores);
        reservation.setMessageId(messages);

        reservation.setGoodsName(reservationDto.getGoodsName());
        reservation.setPrice(reservationDto.getPrice());

        reservation.setDemand(null);
        reservation.setDate(reservationDto.getDate());
        reservation.setPrinted(0);
        // 곧바로 승인되버리게 변경
        reservation.setPermission(1);

        reservation.setReservationName("현장 판매");
        reservation.setPhrase(null);
//        reservation.setImage(stores.getImage());
        reservation.setCard(0);
        reservation.setRenderedCard(null);

        reservationRepository.save(reservation);
        return reservation.getReservationId();
    }


//    카드 프린트
    public CardDto getcardInfo (Integer reservationId) throws Exception {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ReservationNotFoundException("예약을 찾을 수 없습니다."));

        String temp = "https://host 명/userproto/"+reservation.getMessageId().getMessageId();
        String qrBase64 = createQrBase64(temp);

        CardDto card = new CardDto();
        card.setPhrase(reservation.getPhrase());
        card.setReservationName(reservation.getReservationName());
        card.setQrBase64(qrBase64);
        card.setCard(reservation.getCard());

        return card;
    }

// qr을 base64로 뱉는 임시 함수
    public String createQrBase64(String url) throws WriterException, IOException {
        BitMatrix bitMatrix = null;
        MatrixToImageConfig matrixToImageConfig = null;

        // 큐알코드 바코드 및 배경 색상값
        int onColor = 0xFF000000;
        int offColor = 0x00FEF7F1;

        // 이름 그대로 QRCode 만들때 쓰는 클래스다
        QRCodeWriter qrCodeWriter = new QRCodeWriter();

        // 큐알 전경과 배경의 색을 정한다. 값을 넣지 않으면 검정코드에 흰 배경이 기본값이다.
        matrixToImageConfig = new MatrixToImageConfig(onColor, offColor);
        Map<EncodeHintType, String> hints = new HashMap();

        hints.put(EncodeHintType.ERROR_CORRECTION, "Q");

        // QRCode 전체 크기
        // 단위는 fixel
        int width = 100;
        int height = 100;


        bitMatrix = qrCodeWriter.encode(url, BarcodeFormat.QR_CODE, width, height, hints);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream, matrixToImageConfig);
        byte[] bytes = outputStream.toByteArray();
        String encoded = Base64.getEncoder().encodeToString(bytes);

        return encoded;
    }


    public class AlreadyPrintedException extends Exception {
        public AlreadyPrintedException(String message) {
            super(message);
        }
    }

    public class AlreadyPermittedException extends Exception {
        public AlreadyPermittedException(String message) {
            super(message);
        }
    }

    public class NotPermittedException extends Exception {
        public NotPermittedException(String message) {
            super(message);
        }
    }

// 프린트 여부를 바꿔주는 함수
    public void checkPrint(ReservationDto reservationId) throws Exception {
        Reservation reservation = reservationRepository.findById(reservationId.getReservationId())
                .orElseThrow(() -> new ReservationNotFoundException("예약을 찾을 수 없습니다."));

        if (Objects.isNull(reservation.getPermission())) {
            throw new NullPointerException("승인하지 않은 예약입니다.");
        }


        if (reservation.getPermission() == 0) {
            throw new NotPermittedException("승인 거절한 예약입니다.");
        }


        if(reservation.getPrinted() == 0){
            reservation.setPrinted(1);
            reservationRepository.save(reservation);
        }
        else {
            throw new AlreadyPrintedException("이미 출력된 예약입니다.");
        }
    }


    public class NotAuthorizedException extends Exception {
        public NotAuthorizedException(String message) {
            super(message);
        }
    }


    public List<ReservationDto> findByUserId(int userId) {
        Users user = usersRepository.findByUsersId(userId);

        System.out.println(user);
        List<Reservation> list = reservationRepository.findAllByUserIdOrderByDateDesc(user);
        List<ReservationDto> result = new ArrayList<>();

        for(int i=0; i<list.size(); i++){

            ReservationDto tmp = new ReservationDto();
            System.out.println(list.get(i));
            reservationEntityToDto(tmp, list.get(i));

            result.add(tmp);
        }

        return result;
    }
}
