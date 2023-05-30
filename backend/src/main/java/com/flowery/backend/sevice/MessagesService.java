package com.flowery.backend.sevice;

import com.amazonaws.services.kms.model.NotFoundException;
import com.flowery.backend.model.dto.MessagesDto;
import com.flowery.backend.model.entity.*;
import com.flowery.backend.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class MessagesService {

    private MessagesRepository messagesRepository;
    private PicturesRepository picturesRepository;
    private ReservationRepository reservationRepository;
    private FlowerRepository flowerRepository;
    private MeaningRepository meaningRepository;
    private PoemsRepository poemsRepository;
    private MyflowersRepository myflowersRepository;

    MessagesService(MessagesRepository messagesRepository, PicturesRepository picturesRepository,
                    ReservationRepository reservationRepository, FlowerRepository flowerRepository,
                    MeaningRepository meaningRepository, PoemsRepository poemsRepository,
                    MyflowersRepository myflowersRepository){
        this.messagesRepository = messagesRepository;
        this.picturesRepository = picturesRepository;
        this.reservationRepository = reservationRepository;
        this.flowerRepository = flowerRepository;
        this.meaningRepository = meaningRepository;
        this.poemsRepository = poemsRepository;
        this.myflowersRepository = myflowersRepository;
    }

    public Messages findById(String code){
        return messagesRepository.findById(code).get();
    }

    public MessagesDto messageEntityToDto(Messages messages, List<Pictures> picturesList) {
        MessagesDto messagesDto = new MessagesDto();
        messagesDto.setMessageId(messages.getMessageId());
        messagesDto.setMessage(messages.getMessage() == null ? "" : messages.getMessage());
        messagesDto.setVideo(messages.getVideo() == null ? "" : messages.getVideo());
        messagesDto.setFlowerPicture(messages.getFlowerPicture() == null ? "" : messages.getFlowerPicture());
        messagesDto.setPapers(messages.getPaper());
        messagesDto.setFont(messages.getFont());
        messagesDto.setMessageDate(messages.getMessageDate());
        messagesDto.setPoem(messages.getPoem() == null ? null : messages.getPoem());

        messagesDto.setRenderedCard(reservationRepository.findByMessageId(messages).getRenderedCard());

        // pictures에 저장된 데이터(사진 도메인) 불러오는 코드
        List<String> result = new ArrayList<>();
        for(int i=0; i<picturesList.size(); i++){
            result.add(picturesList.get(i).getUrl());
        }
        messagesDto.setPictures(result);

        // 마이플라워를 거쳐 꽃말들을 가져오는 코드
        Map<String, List<String>> flowerAndMeaning = new HashMap<>();
        List<Myflowers> myflowersList = myflowersRepository.findAllByMessageId(messages);
        for(Myflowers myflowers : myflowersList){
            Meaning meaning = myflowers.getMeanId();
            Flowers flower = meaning.getFlowerId();
            List<String> meanings = flowerAndMeaning.getOrDefault(flower.getFlowerName(), new ArrayList<>());
            meanings.add(meaning.getMean());
            flowerAndMeaning.put(flower.getFlowerName(), meanings);
        }
        System.out.println(flowerAndMeaning);
        messagesDto.setFlowerAndMeaning(flowerAndMeaning);

        return messagesDto;
    }


    // 카드 정보 조회
    public MessagesDto findByMessageId(String id){
        System.out.println(id);
        Messages message = messagesRepository.findById(id).get();
//        기본 제공하는 findby를 사용해서 repository 안 만들고 할 때
//        Messages message = messagesRepository.findByMessageId(id).get();

        List<Pictures> picturesList = picturesRepository.findAllByMessageId(message);
        System.out.println(picturesList);

        MessagesDto messagesDto = messageEntityToDto(message, picturesList);

        return messagesDto;

    }

    // 카드 제작
    public Messages createCard(String videoUrl, List<String> pictureUrl, String messageValue, Integer paperValue, Integer fontValue, LocalDateTime dateTime) throws Exception{
        Messages message = new Messages();

        // 메시지와 비디오, 사진 값이 비어있지 않다면 넣어준다.
        if(videoUrl != null){
            message.setVideo(videoUrl);
        }
        if(messageValue != null){
            message.setMessage(messageValue);
        }
        message.setPaper(paperValue);
        message.setFont(fontValue);
        message.setMessageId(UUID.randomUUID().toString());
        message.setMessageDate(dateTime);

        Messages result = messagesRepository.save(message);

        for(int i=0; i<pictureUrl.size(); i++){
            Pictures pictures = new Pictures();
            pictures.setUrl(pictureUrl.get(i));
            pictures.setMessageId(result);
            picturesRepository.save(pictures);
        }

        return result;
    }



    // 프로토타입용 카드 제작
    public Messages createProtoCard(String videoUrl, List<String> pictureUrl, String messageValue, Integer paperValue, Integer fontValue, LocalDateTime dateTime) throws Exception{
        Messages message = new Messages();

        // 메시지와 비디오, 사진 값이 비어있지 않다면 넣어준다.
        if(videoUrl != null){
            message.setVideo(videoUrl);
        }
        if(messageValue != null){
            message.setMessage(messageValue);
        }
        message.setPaper(paperValue);
        message.setFont(fontValue);
        message.setMessageId(UUID.randomUUID().toString());
        message.setMessageDate(dateTime);
        message.setFlowerPicture("https://s3.bucket.flowery.youngil.s3.ap-northeast-2.amazonaws.com/files/336d280f-a4fc-43b4-bea4-c0e17eb0a431carnation-gd57a053e6_1920.jpg");


        Integer carnation = 4;
        Flowers flower = flowerRepository.findById(carnation).orElseThrow(() -> new NotFoundException("꽃을 찾을 수 없습니다."));


        List<Poems> poemsList = poemsRepository.findAllByFlowerId(flower);
        if (!poemsList.isEmpty()) {
            Random random = new Random();
            int randomIndex = random.nextInt(poemsList.size());
            Poems randomPoem = poemsList.get(randomIndex);
//            message.setPoemId(randomPoem);
        }

//        Messages result = new Messages();

        Messages result = messagesRepository.save(message);

        for(int i=0; i<pictureUrl.size(); i++){
            Pictures pictures = new Pictures();
            pictures.setUrl(pictureUrl.get(i));
            pictures.setMessageId(result);
            picturesRepository.save(pictures);
        }

        return result;
    }

    public Messages addFlowerPicture (String pictureUrl, Integer reservationId) throws Exception {
        Reservation reservation = reservationRepository.findById(reservationId).get();
        String messageId = reservation.getMessageId().getMessageId();
        Messages result = messagesRepository.findById(messageId).get();
        result.setFlowerPicture(pictureUrl);

        return messagesRepository.save(result);
    }
}
