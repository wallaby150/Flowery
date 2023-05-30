package com.flowery.backend.sevice;

import com.amazonaws.services.kms.model.NotFoundException;
import com.flowery.backend.model.dto.GoodsDto;
import com.flowery.backend.model.dto.HolidaysDto;
import com.flowery.backend.model.dto.StoresDto;
import com.flowery.backend.model.entity.*;
import com.flowery.backend.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

// 상점, 휴일, 상품, 상품 샘플 사진들 레포지토리를 가지고 있음

@Service
public class StoresService {
    private StoreRepository storeRepository;
    private HolidaysRepository holidaysRepository;
    private GoodsRepository goodsRepository;
    private SamplesRepository samplesRepository;

    private SellerRepository sellerRepository;

    private UsersRepository usersRepository;

    StoresService(StoreRepository storeRepository, HolidaysRepository holidaysRepository,
                  GoodsRepository goodsRepository, SamplesRepository samplesRepository,
                  SellerRepository sellerRepository, UsersRepository usersRepository){
        this.storeRepository = storeRepository;
        this.holidaysRepository = holidaysRepository;
        this.goodsRepository = goodsRepository;
        this.samplesRepository = samplesRepository;
        this.sellerRepository = sellerRepository;
        this.usersRepository = usersRepository;
    }

    // 모든 상점 다 가져오기
    public List<StoresDto> findAllStores(Integer permitted){
        List<Stores> storesList = storeRepository.findByPermit(permitted);
        List<StoresDto> result = new ArrayList<>();

        for (Stores store : storesList){
            StoresDto storesDto = new StoresDto();
            List<Goods> goodsList = goodsRepository.findGoodsByStoreId(store);

            storesDto.setStoreId(store.getStoreId());
            storesDto.setStoreName(store.getStoreName());
            storesDto.setStorePhone(store.getStorePhone());
            storesDto.setPermit(store.getPermit());
            storesDto.setOpen(store.getOpen());
            storesDto.setClose(store.getClose());
            storesDto.setAddress(store.getAddress());
            storesDto.setInfo(store.getInfo());
            storesDto.setImage(store.getImage());
            storesDto.setProfile(store.getProfile());

            List<String> tmp = new ArrayList<>();
            for (Goods goods : goodsList) {
                List<Samples> samplesList = samplesRepository.findAllByGoodsId(goods);
                for (Samples sample : samplesList) {
                    tmp.add(sample.getPicture());
                }
                storesDto.setSamples(tmp);

            }
            result.add(storesDto);

        }

        return result;
    }

    // 모든 상품들 다 가져오기
    public List<GoodsDto> findAll(){

        List<Goods> ori = goodsRepository.findAll();
        List<GoodsDto> result = new ArrayList<>();

        for(int i=0; i<ori.size(); i++) {

            GoodsDto tmp = new GoodsDto();

            tmp.setStoreId(ori.get(i).getStoreId().getStoreId());
            tmp.setGoodsId(ori.get(i).getGoodsId());
            tmp.setGoodsName(ori.get(i).getGoodsName());
            tmp.setGoodsDetail(ori.get(i).getGoodsDetail());
            tmp.setGoodsPrice(ori.get(i).getGoodsPrice());

            System.out.println();

            result.add(tmp);

        }


        return result;
    }

    // 가게 추가하기
    public Stores createStore(Stores store){
        return storeRepository.save(store);
    }

    public StoresDto findByStoreId(int storeId){
        Stores store = storeRepository.findById(storeId).get();
        StoresDto storesDto = new StoresDto();
        List<Goods> goodsList = goodsRepository.findGoodsByStoreId(store);

        storesDto.setStoreId(store.getStoreId());
        storesDto.setStoreName(store.getStoreName());
        storesDto.setStorePhone(store.getStorePhone());
        storesDto.setPermit(store.getPermit());
        storesDto.setOpen(store.getOpen());
        storesDto.setClose(store.getClose());
        storesDto.setAddress(store.getAddress());
        storesDto.setInfo(store.getInfo());
        storesDto.setImage(store.getImage());
        storesDto.setProfile(store.getProfile());

        List<String> tmp = new ArrayList<>();
        for (Goods goods : goodsList) {
            List<Samples> samplesList = samplesRepository.findAllByGoodsId(goods);
            for (Samples sample : samplesList) {
                tmp.add(sample.getPicture());
            }
            storesDto.setSamples(tmp);

        }

        return storesDto;
    }

    // 특정 상품의 샘플 사진들 가져오기
    public List<Samples> findAllByGoods(int goodsId){

        Goods goods = goodsRepository.findById(goodsId).get();

        return samplesRepository.findAllByGoodsId(goods);

    }


    // 가게 정보 변경
    @Transactional
    public Stores editStore(Integer storeId, StoresDto storeDTO){
        Stores store = storeRepository.findById(storeId)
                .orElseThrow(() -> new NotFoundException("Store not found with id : " + storeId));

        // 수정하고자 하는 필드들만 업데이트
        if (storeDTO.getStorePhone() != null) {
            store.setStorePhone(storeDTO.getStorePhone());
        }
        if (storeDTO.getOpen() != null) {
            store.setOpen(storeDTO.getOpen());
        }
        if (storeDTO.getClose() != null) {
            store.setClose(storeDTO.getClose());
        }
        if (storeDTO.getInfo() != null) {
            store.setInfo(storeDTO.getInfo());
        }
        if (storeDTO.getAddress() != null) {
            store.setAddress(storeDTO.getAddress());
        }
        if (storeDTO.getImage() != null) {
            store.setImage(storeDTO.getImage());
        }
        if (storeDTO.getProfile() != null) {
            store.setProfile(storeDTO.getProfile());
        }


        Stores updatedStore = storeRepository.save(store);
        return updatedStore;
    }

    // 상품 삭제
    @Transactional
    public void deleteGoods(Integer goodsId) throws Exception {
        Goods goods = goodsRepository.findById(goodsId).orElseThrow(() -> new NoSuchElementException("해당 goods_id가 없습니다."));
        // Goods와 연결된 Samples 삭제
        for (Samples sample : samplesRepository.findAllByGoodsId(goods)) {
            System.out.println(sample);
            samplesRepository.delete(sample);
        }
        goodsRepository.delete(goods);
    }


    // 상품 등록
    public Goods createGoods(GoodsDto requestData) {
        Stores store = storeRepository.findById(requestData.getStoreId())
                .orElseThrow(() -> new StoreNotFoundException("해당 id의 상점이 존재하지 않습니다."));
        Goods goods = new Goods();
        goods.setStoreId(store);
        goods.setGoodsName(requestData.getGoodsName());
        goods.setGoodsPrice(requestData.getGoodsPrice());
        goods.setGoodsDetail(requestData.getGoodsDetail());

        return goodsRepository.save(goods);
    }
    public Goods updateGoods(GoodsDto requestData, Integer goodsId) {
        Goods goods = goodsRepository.findById(goodsId)
                .orElseThrow(() -> new NotFoundException("goodsId not found with id : " + goodsId));

        goods.setGoodsDetail(requestData.getGoodsDetail());
        goods.setGoodsName(requestData.getGoodsName());
        goods.setGoodsPrice(requestData.getGoodsPrice());

        Goods updatedGoods = goodsRepository.save(goods);
        return updatedGoods;

    }


    public static class StoreNotFoundException extends RuntimeException {
        public StoreNotFoundException(String message) {
            super(message);
        }
    }


    // 휴일을 확인하는 코드
    public String getHolidays(int storeId) throws Exception {
        Stores store = storeRepository.findById(storeId)
        .orElseThrow(() -> new StoreNotFoundException("해당 id의 상점이 존재하지 않습니다."));
//        String holyday = "";
        StringBuilder holidays = new StringBuilder(); // 변경된 부분

        List<Holidays>  holidaysList = holidaysRepository.findAllByStoreId(store);

        for (Holidays holiday : holidaysList) {
            holidays.append(holiday.getDay());
        }

        return holidays.toString();
    }


    // 휴일을 업데이트하는 코드
    public void updateHolidays(HolidaysDto holidaysDto) throws Exception {
        Stores store = storeRepository.findById(holidaysDto.getStoreId())
                .orElseThrow(() -> new StoreNotFoundException("해당 id의 상점이 존재하지 않습니다."));

        // 일단 해당 storeId로 저장된 값을 다 지움.
        holidaysRepository.deleteAllByStoreId(store);

        // 빈 문자열이 아닌 경우만 새로운 휴일 데이터를 저장
        if (!holidaysDto.getHolidays().isEmpty()) {
            String[] holidays = holidaysDto.getHolidays().split("");

            for (String day : holidays) {
                Holidays holiday = new Holidays();
                holiday.setStoreId(store);
                holiday.setDay(day);

                holidaysRepository.save(holiday);
            }
        }
    }

    public Stores findStoreByUserId(String userId) throws Exception{

        Seller seller = sellerRepository.findByUserId(usersRepository.findById(userId));

        return storeRepository.findByStoreId(seller.getStoreId().getStoreId());

    }


}
