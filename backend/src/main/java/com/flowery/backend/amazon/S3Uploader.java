package com.flowery.backend.amazon;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Uploader {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.region.static}")
    private String region;

    private final AmazonS3Client amazonS3Client;

    public String uploadFile(MultipartFile file) throws Exception {
        String fileName = file.getOriginalFilename();

        fileName = removeSpecialCharacters(fileName);

        String filepath = createS3FileName(fileName);

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());

        amazonS3Client.putObject(bucket, filepath, file.getInputStream(), metadata);

        String S3Url = "https://s3." + region + ".amazonaws.com/"+ bucket+"/" +  filepath;

        return S3Url;
    }


    // 파일 이름 및 경로 설정
    private String createS3FileName (String fileName) {

        UUID uuid = UUID.randomUUID();
        String newFileUrl = "files/" + uuid + fileName;
        return newFileUrl;
    }

    public void deleteS3File(String fileName) throws Exception {
        String filePath = fileName.replace("https://", "");
        boolean isObjectExist = amazonS3Client.doesObjectExist(bucket, filePath);
        System.out.println("isObjectExist = " + isObjectExist);
        if (isObjectExist) {

            amazonS3Client.deleteObject(bucket, filePath);
        }

    }

    public static String removeSpecialCharacters(String str) {
        if (str == null) {
            return null;
        }
        return str.replaceAll("[^a-zA-Z0-9가-힣\\s.]", "");
    }

}