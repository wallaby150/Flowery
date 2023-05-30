package com.flowery.backend.controller;

import com.flowery.backend.model.dto.SmsMessageDto;
import com.flowery.backend.model.dto.SmsResponseDTO;
import com.flowery.backend.model.dto.InfoWithSmsDto;
import com.flowery.backend.model.dto.UsersDto;
import com.flowery.backend.model.entity.Reservation;
import com.flowery.backend.model.entity.Users;
import com.flowery.backend.redis.PasswordGenerator;
import com.flowery.backend.redis.RedisDao;
import com.flowery.backend.repository.ReservationRepository;
import com.flowery.backend.repository.UsersRepository;
import com.flowery.backend.sevice.NaverSmsService;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.Random;

@Controller
@RequestMapping("sms")
@RequiredArgsConstructor
public class NaverSmsController {

    private final NaverSmsService naverSmsService;
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final ReservationRepository reservationRepository;
    private final RedisDao redisDao;
    private final String preFix = "[Flowery]";

    // 메시지 컨트롤러 원본
    @PostMapping("/send-sms")
    public ResponseEntity<SmsResponseDTO> sendSms(@RequestBody SmsMessageDto smsMessageDto) throws Exception{
        SmsResponseDTO smsResponseDTO =  naverSmsService.sendSms(smsMessageDto);
        return new ResponseEntity<>(smsResponseDTO, HttpStatus.ACCEPTED);
    }

    // 임시 비밀번호 보내주는 api
    @PostMapping("/send-pass")
    public ResponseEntity<Boolean> sendPass(@RequestBody InfoWithSmsDto infoWithSmsDto) {

        try {
            // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.

            // 유저를 유저id 값으로 찾아서 비밀번호를 암호화 된 임시 비밀번호의 값으로 수정해준다.
            Users users = usersRepository.findById(infoWithSmsDto.getUserId()).get();
            String tempPass = PasswordGenerator.generatePassword();
            String encryptedPass = passwordEncoder.encode(tempPass);

            users.setPass(encryptedPass);

            usersRepository.save(users);

            // 암호화 하기 전의 비밀번호를 문자로 발급한다.

            String phone = users.getPhone().replaceAll("-", "");

            String content = preFix+" 임시 비밀번호가 발급되었습니다. 비밀번호는 [ " + tempPass + " ] 입니다.";

            SmsMessageDto smsMessageDto = new SmsMessageDto();

            smsMessageDto.setTo(phone);
            smsMessageDto.setContent(content);

            naverSmsService.sendSms(smsMessageDto);


        }catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
    }

    // 전화번호 인증 값 저장
    @PostMapping("/send-cert")
    public ResponseEntity<Boolean> sendOne(@RequestBody InfoWithSmsDto infoWithSmsDto) {

        try {

            if(infoWithSmsDto.getPhone() == null || usersRepository.existsByPhone(infoWithSmsDto.getPhone())){
                return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
            }

            Random random = new Random();
            int randomNumber = random.nextInt(900000) + 100000; // 100,000 ~ 999,999 범위에서 랜덤으로 수를 생성

            String code = String.valueOf(randomNumber);

            redisDao.setValues(infoWithSmsDto.getPhone(),code);

            String phone = infoWithSmsDto.getPhone().replaceAll("-", "");

            String content = preFix+" 비밀번호 인증 번호는 다음과 같습니다 [ " + code + "]";

            SmsMessageDto smsMessageDto = new SmsMessageDto();

            smsMessageDto.setTo(phone);
            smsMessageDto.setContent(content);

            naverSmsService.sendSms(smsMessageDto);

            System.out.println(code);

        }catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
    }

    // 인증 확인
    @GetMapping("/certification")
    public ResponseEntity<Boolean> checkOne(@RequestParam String phone, Integer code){

        try {
            if(!redisDao.hasKey(phone)) return new ResponseEntity<>(false, HttpStatus.ACCEPTED);

            if (redisDao.getValue(phone).equals(String.valueOf(code))){
                System.out.println(phone);
                return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
            }
            else return new ResponseEntity<>(false, HttpStatus.ACCEPTED);
        }catch (Exception e){
            throw new RuntimeException("API 요청 중 오류가 발생하였습니다.");
        }
    }

    // 예약 거부 내역 전송
    @PostMapping("/deny")
    public ResponseEntity<Boolean> sendDeny(@RequestBody InfoWithSmsDto infoWithSmsDto){

        try {
            Reservation reservation = reservationRepository.findById(infoWithSmsDto.getReservationId()).get();

            // 예약을 건 유저의 전화번호를 가져옴
            String phone = reservation.getUserId().getPhone().replaceAll("-", "");

            String content = preFix+" "+reservation.getUserId().getId()+"님의 "+ reservation.getGoodsName() +" 상품 예약이 [ " + infoWithSmsDto.getDenyReason() + " ] 사유로 취소되었습니다.";

            SmsMessageDto smsMessageDto = new SmsMessageDto();

            smsMessageDto.setTo(phone);
            smsMessageDto.setContent(content);

            naverSmsService.sendSms(smsMessageDto);

            return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
        }catch (Exception e){
            throw new RuntimeException("API 요청 중 오류가 발생하였습니다.");
        }
    }

    // 예약 신청 전송
    @PostMapping("/reservation")
    public ResponseEntity<Boolean> reservation(@RequestBody InfoWithSmsDto infoWithSmsDto){

        try {

            Reservation reservation = reservationRepository.findById(infoWithSmsDto.getReservationId()).get();
            // 가게 매장 전화번호로 세팅
            String phone = reservation.getStoreId().getStorePhone().replaceAll("-","");

            String content = preFix+" "+reservation.getUserId().getId()+"님이 " + reservation.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")) + " 날짜로 [ "+ reservation.getGoodsName() +" ] 상품 예약을 신청하였습니다.";

            SmsMessageDto smsMessageDto = new SmsMessageDto();

            smsMessageDto.setTo(phone);
            smsMessageDto.setContent(content);

            naverSmsService.sendSms(smsMessageDto);

            return new ResponseEntity<>(true, HttpStatus.ACCEPTED);

        }catch (Exception e){
            throw new RuntimeException("API 요청 중 오류가 발생하였습니다.");
        }
    }

    // 승인 여부 api
    @PostMapping("/accept")
    public ResponseEntity<Boolean> accept(@RequestBody InfoWithSmsDto infoWithSmsDto){

        try {
            Reservation reservation = reservationRepository.findById(infoWithSmsDto.getReservationId()).get();

            // 예약을 건 유저의 전화번호를 가져옴
            String phone = reservation.getUserId().getPhone().replaceAll("-", "");

            String content = preFix+" "+reservation.getUserId().getId()+"님의 " + reservation.getDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")) + " 날짜의 [ "+ reservation.getGoodsName() +" ] 상품 예약이 승인 되었습니다.\n예약 날짜에 예쁜 꽃 받으러오세요!";

            SmsMessageDto smsMessageDto = new SmsMessageDto();

            smsMessageDto.setTo(phone);
            smsMessageDto.setContent(content);

            naverSmsService.sendSms(smsMessageDto);

            return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
        }catch (Exception e){
            throw new RuntimeException("API 요청 중 오류가 발생하였습니다.");
        }
    }

}
