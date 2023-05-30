package com.flowery.backend.controller;

import com.flowery.backend.amazon.S3Uploader;
import com.flowery.backend.model.dto.MessagesDto;
import com.flowery.backend.model.entity.Messages;
import com.flowery.backend.sevice.MessagesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("messages")
public class MessagesController {
    private final Logger LOGGER = LoggerFactory.getLogger(MessagesController.class);
    private MessagesService messagesService;
    private final S3Uploader s3Uploader;

    MessagesController(MessagesService messagesService, S3Uploader s3Uploader){
        this.messagesService = messagesService;
        this.s3Uploader = s3Uploader;
    }

    @PostMapping("/card")
    public ResponseEntity<Messages> createCard(@RequestPart(required = false) MultipartFile[] pictures,
                                               @RequestPart(required = false) MultipartFile video,
                                               @RequestParam Integer paper, @RequestParam String message,
                                               @RequestParam Integer font, @RequestParam String date) {

        LOGGER.info("createCard가 호출되었습니다.");

        try {
            String videoUrl = null;
            List<String> pictureUrl = new ArrayList<>();
            String messageValue = null;
            Integer paperValue = 0;
            Integer fontValue = 0;

            if(!video.isEmpty()){
                videoUrl = s3Uploader.uploadFile(video);
            }

            for(int i=0; i<pictures.length; i++){
                String tmp = s3Uploader.uploadFile(pictures[i]);
                pictureUrl.add(tmp);
            }

            if(message != null || !message.equals("")){
                messageValue = message;
            }

            if(-1< paper && paper < 10){
                paperValue = paper;
            }

            if(-1< font && font < 20){
                fontValue = font;
            }

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
            LocalDateTime dateTime = LocalDateTime.parse(date, formatter);


            return new ResponseEntity<>(messagesService.createCard(videoUrl, pictureUrl, messageValue, paperValue, fontValue, dateTime), HttpStatus.ACCEPTED);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

    }

    // 프로토타입용 카드 생성기
    @PostMapping("/card/prototype")
    public ResponseEntity<Messages> createProtoCard(@RequestPart(required = false) MultipartFile[] pictures,
                                               @RequestPart(required = false) MultipartFile video,
                                               @RequestParam Integer paper, @RequestParam String message,
                                               @RequestParam Integer font, @RequestParam String date) {

        LOGGER.info("createProtoCard가 호출되었습니다.");

        try {
            String videoUrl = null;
            List<String> pictureUrl = new ArrayList<>();
            String messageValue = null;
            Integer paperValue = 0;
            Integer fontValue = 0;

            if(!video.isEmpty()){
                videoUrl = s3Uploader.uploadFile(video);
            }

            for(int i=0; i<pictures.length; i++){
                String tmp = s3Uploader.uploadFile(pictures[i]);
                pictureUrl.add(tmp);
            }

            if(message != null || !message.equals("")){
                messageValue = message;
            }

            if(-1< paper && paper < 10){
                paperValue = paper;
            }

            if(-1< font && font < 20){
                fontValue = font;
            }

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
            LocalDateTime dateTime = LocalDateTime.parse(date, formatter);


            return new ResponseEntity<>(messagesService.createProtoCard(videoUrl, pictureUrl, messageValue, paperValue, fontValue, dateTime), HttpStatus.ACCEPTED);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

    }




    
    // 메시지 정보 가져오기
    @PostMapping("/get-card")
    public ResponseEntity<MessagesDto> findByMessageId(@RequestBody Map<String, String> requestData) {
        LOGGER.info("findByMessageId가 호출되었습니다.");
        String a = requestData.get("messageId");

        return new ResponseEntity<MessagesDto>(messagesService.findByMessageId(a), HttpStatus.ACCEPTED);
    }

    @PostMapping("/flower-picture")
    public ResponseEntity<Messages> addFlowerPicture(@RequestPart MultipartFile picture,
                                             @RequestParam Integer reservationId) throws Exception{
        LOGGER.info("addFlowerPicture 호출되었습니다.");
        try {
            String pictureUrl = s3Uploader.uploadFile(picture);

            return new ResponseEntity<Messages>(messagesService.addFlowerPicture(pictureUrl, reservationId), HttpStatus.ACCEPTED);
        }catch (Exception e){
            System.out.println(e.toString());
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

    }



}
