package com.flowery.backend.controller;

import com.flowery.backend.AES256.AES256Util;
import com.flowery.backend.jwt.JwtProvider;
import com.flowery.backend.jwt.TokenResponse;
import com.flowery.backend.model.dto.UsersDto;
import com.flowery.backend.sevice.UsersService;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("users")
public class UsersController {

    // Users에서 로그인 관련, 일반 유저, 판매자 구분 가능
    private UsersService usersService;
    final DefaultMessageService messageService;
    private final JwtProvider jwtProvider;

    UsersController(UsersService usersService, JwtProvider jwtProvider){
        this.usersService = usersService;
        this.jwtProvider =jwtProvider;
        this.messageService = NurigoApp.INSTANCE.initialize("NCSCFJLKKGWYQQ0R", "SS1RDBJ0LYUXJGE5YLYK1EMMSJYKKBNJ", "https://api.coolsms.co.kr");
    }

    // 유저용 로그인
    @PostMapping("/token-user")
    public ResponseEntity<TokenResponse> tokenUser(@RequestBody UsersDto loginDto) {
        try {
            UsersDto usersDto = usersService.loginCheck(loginDto);
            return new ResponseEntity<>(jwtProvider.createTokensByLogin(usersDto), HttpStatus.ACCEPTED);
        }catch (Exception e){
            throw new RuntimeException("회원 정보를 다시 확인해주세요");
        }
    }


    // 판매자 로그인
    @PostMapping("/token-seller")
    public ResponseEntity<TokenResponse> tokenSeller(@RequestBody UsersDto loginDto){

        try {
            UsersDto usersDto = usersService.loginCheck(loginDto);
            usersService.sellerLoginCheck(loginDto.getId(), loginDto.getPass());
            return new ResponseEntity<>(jwtProvider.createTokensBySellerLogin(usersDto), HttpStatus.ACCEPTED);
        }catch (Exception e){
            throw new RuntimeException("회원 정보를 다시 확인해주세요");
        }

    }

    // 회원가입
    @PostMapping("/register")
    public ResponseEntity<Boolean> register(@RequestBody UsersDto usersDto){

        try {
            if(usersService.existId(usersDto.getId())){
                return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(usersService.register(usersDto), HttpStatus.ACCEPTED);
        }catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/id-check")
    public ResponseEntity<Boolean> idCheck(@RequestParam String id){
        try{
            boolean check = usersService.idCheck(id);
            return new ResponseEntity<>(check,HttpStatus.ACCEPTED);
        }catch (Exception e){
            throw new RuntimeException("서버 오류가 발생하였습니다.");
        }
    }


    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<Boolean> logout(@RequestBody UsersDto loginDto){
        try {
            usersService.logout(loginDto);

        }catch (Exception e){
            throw new RuntimeException("login 정보가 없습니다!");
        }
        return new ResponseEntity<>(true,HttpStatus.ACCEPTED);
    }

    @GetMapping("/login")
    public ResponseEntity<UsersDto> login(@RequestParam String id){
        try {
            UsersDto usersDto =  usersService.loginWithId(id);
            return ResponseEntity.ok(usersDto);
        }catch (Exception e){
            throw new RuntimeException("로그인 처리 중 문제가 발생하였습니다.");
        }
    }

    @PutMapping("/change-pass")
    public ResponseEntity<Boolean> changePhone(@RequestBody UsersDto passDto){
        try {
            UsersDto usersDto = usersService.changePass(passDto);
            return ResponseEntity.ok(true);
        }catch (Exception e){
            throw new RuntimeException("로그인 처리 중 문제가 발생하였습니다.");
        }
    }


}
