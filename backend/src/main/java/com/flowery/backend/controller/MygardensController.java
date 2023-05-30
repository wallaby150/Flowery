package com.flowery.backend.controller;

import com.amazonaws.services.kms.model.AlreadyExistsException;
import com.flowery.backend.model.dto.MygardensDto;
import com.flowery.backend.model.entity.Mygardens;
import com.flowery.backend.sevice.MygardensService;
import com.google.zxing.*;
import com.google.zxing.client.j2se.MatrixToImageConfig;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.client.j2se.MatrixToImageWriter;

import com.google.zxing.qrcode.QRCodeWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("myGarden")
public class MygardensController {

    private MygardensService mygardensService;
    private final Logger LOGGER = LoggerFactory.getLogger(MygardensController.class);


    MygardensController(MygardensService mygardensService){
        this.mygardensService = mygardensService;
    }

//    @GetMapping("id")
//    public ResponseEntity<List<MygardensDto>> findAllByUserId(){
//        System.out.println("hhh");
//        return new ResponseEntity<>(mygardensService.findAllByUserId(1), HttpStatus.ACCEPTED);
//    }
    
    // 마이가든에 저장
    @PostMapping
    public ResponseEntity<Mygardens> createMyGarden(@RequestBody MygardensDto mygardensDto) throws Exception {
        LOGGER.info("createMyGarden가 호출되었습니다.");
        try {
            return new ResponseEntity<Mygardens>(mygardensService.createMyGarden(mygardensDto), HttpStatus.CREATED);
        } catch (AlreadyExistsException e) {
            LOGGER.error("이미 저장된 메시지입니다.", e);
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(null);
        } catch (Exception e) {
            LOGGER.error("마이가든 저장에 실패했습니다.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    // 마이가든 값 불러오기
    @PostMapping("/get")
    public ResponseEntity<List<MygardensDto>> findAllByUserId(@RequestBody MygardensDto mygardensDto) throws Exception {
        LOGGER.info("findAllByUserId가 호출되었습니다.");
        try {
            return new ResponseEntity<List<MygardensDto>>(mygardensService.findAllByUserId(mygardensDto), HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("마이가든 조회에 실패했습니다.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }

    }
    
    //마이가든 삭제
    @DeleteMapping("/{mygardenId}")
    public ResponseEntity<?> deleteMygarden(@PathVariable("mygardenId") Integer mygardenId) {
        LOGGER.info("deleteMygarden이 호출되었습니다.");
        try{
            boolean isDeleted = mygardensService.deleteMygarden(mygardenId);
            if (isDeleted) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            LOGGER.error("마이가든 삭제에 실패했습니다.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }


    // 지금 필요한 건 편지와 영상 내용을 띄우는 프론트 페이지 주소가 필요하다.
    // 거기에 mid를 맞춰서 줘서
    @GetMapping("/qrTest")
    public Object createQR(@RequestParam String url, @RequestParam String color, @RequestParam String baseColor) throws Exception {

        BitMatrix bitMatrix = null;
        MatrixToImageConfig matrixToImageConfig = null;
        // QRCode에 담고 싶은 정보를 문자열로 표시한다. url이든 뭐든 가능하다.
        String codeInformation = "";

        System.out.println(url);

        // 큐알코드 바코드 및 배경 색상값
        int onColor = (int)Long.parseLong(color.substring(2), 16); // 바코드 색
        int offColor = (int)Long.parseLong(baseColor.substring(2), 16); // 배경 색

        // 이름 그대로 QRCode 만들때 쓰는 클래스다
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        // 큐알 전경과 배경의 색을 정한다. 값을 넣지 않으면 검정코드에 흰 배경이 기본값이다.
        matrixToImageConfig = new MatrixToImageConfig(onColor, offColor);
        Map<EncodeHintType, String> hints = new HashMap();
        // QRCode 생성시 조건을 넣어서 만들 수 있게 한다.
        // 여기서 Error_Correction의 경우 큐알 코드가 좀더 자글자글하게 만들어 주는 대신 큐알이 가려져도 인식할 가능성이 더욱 높아진다.

       /*
 	https://zxing.github.io/zxing/apidocs/com/google/zxing/qrcode/decoder/ErrorCorrectionLevel.html
        Enum Constants
        L = ~7% correction
        M = ~15% correction
        Q = ~25% correction
        H = ~30% correction
        */
        hints.put(EncodeHintType.ERROR_CORRECTION, "Q");


        // QRCode 전체 크기
        // 단위는 fixel
        int width = 200;
        int height = 200;

        // 내부에 빈 공간만들 빈 공간 -> oncolor로 만들어진다.
        int regionWidth=20;
        int regionHeight=20;

        try {
            // bitMatrix 형식으로 QRCode를 만든다.
            bitMatrix = qrCodeWriter.encode("codeInformation", BarcodeFormat.QR_CODE, width, height, hints);
            // QRCode 중간에 빈공간을 만들고 색을 offColor로 바꿔주는 메소드
//             bitMatrix= emptyQR(bitMatrix,regionHeight,regionWidth); // QR내부에 빈 공간 만드는 메소드(사용할 경우 hint의 error_correction 을 반드시 높여줘야 합니다)
        } catch (Exception e) {
            e.printStackTrace();
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream, matrixToImageConfig);

        // byteArray를 base64로 변환한 이유는 프론트에서 파일경로가 아닌 binary 형식으로 전송해서 보여주기 위해서다.
        // 이렇게 할 경우 DB에 이미지를 저장하지 않고 화면에 보여줄 수 있다.

//        return ResponseEntity.ok()
//                .contentType(MediaType.IMAGE_PNG)
//                .body(outputStream.toByteArray());

        return new ResponseEntity<>(Base64.getEncoder().encodeToString(outputStream.toByteArray()), HttpStatus.ACCEPTED);
    }

    private BitMatrix emptyQR(BitMatrix bitMatrix, int regionHeight, int regionWidth) {
        // 이 메소드는 bitmatrix에 네모난 공간을 만드는 것이다.

        // 빈 공간의 넓이와 높이
        int width=bitMatrix.getWidth();
        int height=bitMatrix.getHeight();

        // 빈 공간의 위치(중앙으로 설정했다.)
        int left=(width-regionWidth)/2;
        int top=(height-regionHeight)/2;

        // 빈 공간 생성하기(이때 색은 offColor)
        bitMatrix.setRegion(left,top,regionWidth,regionHeight);
        // 빈 공간의 색을 배경색으로 반전시킨다.(fixel 단위로 찾아서 색을 뒤집는다.)
        for (int y = top; y <= top+regionHeight; y++) {
            for (int x = left; x <= left+regionWidth; x++) {
                if(bitMatrix.get(x, y)){
                    bitMatrix.unset(x,y);
                };
            }
        }
        return bitMatrix;
    }

}
