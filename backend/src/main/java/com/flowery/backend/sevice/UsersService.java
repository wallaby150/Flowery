package com.flowery.backend.sevice;

import com.flowery.backend.controller.MessagesController;
import com.flowery.backend.jwt.exception.BadRequestException;
import com.flowery.backend.model.dto.SellerDto;
import com.flowery.backend.model.dto.UsersDto;
import com.flowery.backend.model.entity.Seller;
import com.flowery.backend.model.entity.Users;
import com.flowery.backend.redis.RedisDao;
import com.flowery.backend.repository.SellerRepository;
import com.flowery.backend.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {
    private final Logger LOGGER = LoggerFactory.getLogger(MessagesController.class);
    private UsersRepository usersRepository;
    private SellerRepository sellerRepository;
    private PasswordEncoder passwordEncoder;
    private RedisDao redisDao;

    private final String atxPreFix = "atk_";
    private final String rtxPreFix = "rtk_";
    private final String rolePreFix = "role_";

    UsersService(UsersRepository usersRepository, SellerRepository sellerRepository, PasswordEncoder passwordEncoder, RedisDao redisDao){
        this.usersRepository = usersRepository;
        this.sellerRepository = sellerRepository;
        this.passwordEncoder = passwordEncoder;
        this.redisDao = redisDao;
    }

    // 유저 고유번호로 유저 정보를 가져옴
    public Users findByUsersId(int userId){
        return usersRepository.findById(userId).get();
    }

    public UsersDto loginCheck(UsersDto loginDto) throws Exception{

        Users users = usersRepository.findById(loginDto.getId());

        if(!passwordEncoder.matches(loginDto.getPass(), users.getPass())){
            throw new BadRequestException("아이디 혹은 비밀번호를 확인하세요.");
        }
        else{
            UsersDto usersDto = new UsersDto(users);
            if(redisDao.hasKey(atxPreFix+usersDto.getId())){
                redisDao.setBlackList(redisDao.getValue(atxPreFix+usersDto.getId()), "accessToken", 10);
            }

            return usersDto;
        }
    }
    public SellerDto sellerLoginCheck(String userId, String pass) throws Exception{

        Users users = usersRepository.findById(userId);

        SellerDto sellerDto = new SellerDto();

        if(users == null || !passwordEncoder.matches(pass, users.getPass())){
            return sellerDto;
        }

        Seller seller = sellerRepository.findByUserId(users);

        System.out.println(seller.getSellerId());

        sellerDto.setSellerId(seller.getSellerId());
        sellerDto.setStoreId(seller.getStoreId().getStoreId());
        sellerDto.setName(seller.getSellerName());
        sellerDto.setUserId(users.getUsersId());

        return sellerDto;
    }

    public boolean register(UsersDto usersDto) throws Exception{
        String encryptedPass = passwordEncoder.encode(usersDto.getPass());

        Users users = new Users();
        users.setId(usersDto.getId());
        users.setPass(encryptedPass);
        users.setPhone(usersDto.getPhone());

        usersRepository.save(users);

        return true;

    }

    public boolean idCheck(String userId) throws Exception{
        Users users = usersRepository.findById(userId);
        if(users == null) return true;
        else return false;
    }

    public void logout(UsersDto usersDto) throws Exception{

        redisDao.setBlackList(redisDao.getValue(atxPreFix+usersDto.getId()), "accessToken", 10);
        redisDao.deleteKey(atxPreFix+usersDto.getId());
        redisDao.deleteKey(rtxPreFix+usersDto.getId());
        redisDao.deleteKey(rolePreFix+usersDto.getId());

    }

    public UsersDto loginWithId(String id) throws Exception{
        Users users = usersRepository.findById(id);
        UsersDto usersDto = new UsersDto(users);
        return usersDto;
    }

    public Boolean existId(String id) throws Exception{
        return usersRepository.existsById(id);
    }

    public UsersDto changePass(UsersDto usersDto) throws Exception{
        Users users = usersRepository.findById(usersDto.getId());
        String encryptedPass = passwordEncoder.encode(usersDto.getPass());
        users.setPass(encryptedPass);
        usersRepository.save(users);
        return new UsersDto(users);
    }
}
