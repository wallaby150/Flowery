package com.flowery.backend.controller;

import com.flowery.backend.amazon.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Controller
@RequestMapping("storage")
public class S3Controller {
    private final S3Uploader s3Uploader;
    private final Logger LOGGER = LoggerFactory.getLogger(S3Controller.class);

    @PostMapping()
    public ResponseEntity<List<String>> uploadImage(@RequestPart MultipartFile[] pictures) {
        LOGGER.info("uploadImage가 호출되었습니다.");
        try{
            List<String> pictureUrls = new ArrayList<>();

            for(int i=0; i<pictures.length; i++){
                String tmp = s3Uploader.uploadFile(pictures[i]);
                pictureUrls.add(tmp);
            }

            return new ResponseEntity<List<String>>(pictureUrls, HttpStatus.CREATED);
        }catch (Exception e){
            LOGGER.error("uploadImage에 실패했습니다.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam Integer userId, @RequestPart(required = false) MultipartFile multipartFile) throws Exception {

        UUID uuid = UUID.nameUUIDFromBytes(userId.toString().getBytes());

        return new ResponseEntity<>("ff", HttpStatus.ACCEPTED);
    }

    @PostMapping("/test")
    public ResponseEntity<String> test(@RequestPart(required = false) MultipartFile[] multipartFile) throws Exception {

        for(int i=0; i<multipartFile.length; i++){
            System.out.println(multipartFile[i].getName());
        }

        return new ResponseEntity<>("ff", HttpStatus.ACCEPTED);
    }

}