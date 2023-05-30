package com.flowery.backend.sevice;

import com.amazonaws.services.kms.model.AlreadyExistsException;
import com.flowery.backend.model.dto.MygardensDto;
import com.flowery.backend.model.entity.Messages;
import com.flowery.backend.model.entity.Mygardens;
import com.flowery.backend.model.entity.Users;
import com.flowery.backend.repository.MessagesRepository;
import com.flowery.backend.repository.MygardensRepository;
import com.flowery.backend.repository.UsersRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MygardensService {

    private MygardensRepository mygardensRepository;
    private UsersRepository usersRepository;
    private MessagesRepository messagesRepository;


    MygardensService(MygardensRepository mygardensRepository, UsersRepository usersRepository,
                     MessagesRepository messagesRepository){
        this.mygardensRepository = mygardensRepository;
        this.usersRepository = usersRepository;
        this.messagesRepository = messagesRepository;
    }

//    public List<MygardensDto> findAllByUserId(int code){
//
//        Users user =  usersRepository.findById(code).get();
//
//        List<Mygardens> list = mygardensRepository.findAllByUserId(user);
//        List<MygardensDto> result = new ArrayList<>();
//
//
//        for(int i=0; i<list.size(); i++){
//            MygardensDto mygardensDto = new MygardensDto();
//            mygardensDto.setUserId(code);
//            mygardensDto.setMessageId(list.get(i).getMessageId().getMessageId());
//            mygardensDto.setGardenId(list.get(i).getGardenId());
//            result.add(mygardensDto);
//        }
//
//        return result;
//    }

    public List<MygardensDto> findAllByUserId(MygardensDto requestDto){

        Users user =  usersRepository.findById(requestDto.getUserId()).get();

        List<Mygardens> list = mygardensRepository.findAllByUserId(user);
        List<MygardensDto> result = new ArrayList<>();


        for(int i=0; i<list.size(); i++){
            MygardensDto mygardensDto = new MygardensDto();
            mygardensDto.setUserId(user.getUsersId());
            mygardensDto.setMessageId(list.get(i).getMessageId().getMessageId());
            mygardensDto.setGardenId(list.get(i).getGardenId());
            result.add(mygardensDto);
        }

        // messageId를 기준으로 정렬
        Collections.sort(result, Comparator.comparing(MygardensDto::getMessageId));


        return result;
    }


    public Mygardens createMyGarden(MygardensDto mygardensDto) throws Exception {
        Mygardens mygarden = new Mygardens();
        String messageId = mygardensDto.getMessageId();
        Messages message = messagesRepository.findByMessageId(messageId);
        if (message == null) {
            throw new NoSuchElementException("해당 messageId가 없습니다.");
        }
        Integer userId = mygardensDto.getUserId();
        Users user = usersRepository.findById(userId).orElseThrow(() -> new NoSuchElementException("해당 sample_id가 없습니다."));

        Mygardens existingRecord = mygardensRepository.findByUserIdAndMessageId(user, message);
        if (existingRecord != null) {
            throw new AlreadyExistsException("해당 userId와 messageId로 이미 저장된 row가 있습니다.");
        }

        mygarden.setMessageId(message);
        mygarden.setUserId(user);

        return mygardensRepository.save(mygarden);
    }


    public boolean deleteMygarden(Integer mygardenId) {
        Optional<Mygardens> mygardenOptional = mygardensRepository.findById(mygardenId);
        if (mygardenOptional.isPresent()) {
            mygardensRepository.deleteById(mygardenId);
            return true;
        } else {
            return false;
        }
    }
}
