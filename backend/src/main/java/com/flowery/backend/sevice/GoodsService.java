package com.flowery.backend.sevice;

import com.flowery.backend.amazon.S3Uploader;
import com.flowery.backend.model.dto.GoodsDto;
import com.flowery.backend.model.entity.Goods;
import com.flowery.backend.model.entity.Samples;
import com.flowery.backend.model.entity.Stores;
import com.flowery.backend.repository.GoodsRepository;
import com.flowery.backend.repository.SamplesRepository;
import com.flowery.backend.repository.StoreRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class GoodsService {
    private GoodsRepository goodsRepository;
    private SamplesRepository samplesRepository;
    private StoreRepository storeRepository;
    private final S3Uploader s3Uploader;


    GoodsService(GoodsRepository goodsRepository,
                 SamplesRepository samplesRepository,
                 StoreRepository storeRepository,
                 S3Uploader s3Uploader) {
        this.goodsRepository = goodsRepository;
        this.samplesRepository = samplesRepository;
        this.storeRepository = storeRepository;
        this.s3Uploader = s3Uploader;

    }

    // 샘플 추가
    public Samples createSample(Integer goodsId, String pictureUrl) {
        Goods goods = goodsRepository.findById(goodsId).orElseThrow(() -> new NoSuchElementException("해당 goods_id가 없습니다."));

        Samples sample = new Samples();
        sample.setPicture(pictureUrl);
        sample.setGoodsId(goods);

//        goods.getSamples().add(sample);
//        goodsRepository.save(goods);
        return samplesRepository.save(sample);
    }

    // 샘플 삭제
    public void deleteSample(Integer sampleId) {
        Samples sample = samplesRepository.findById(sampleId).orElseThrow(() -> new NoSuchElementException("해당 sample_id가 없습니다."));
        samplesRepository.delete(sample);
    }

    // goods에 해당하는 samples를 가져옴
    public List<Samples> findByGoodsId(Integer goodsId) {
        Goods goods = goodsRepository.findById(goodsId)
                .orElseThrow(() -> new NoSuchElementException("Goods not found with ID: " + goodsId));
        List<Samples> samples = samplesRepository.findAllByGoodsId(goods);

        if (samples.isEmpty()) {
            throw new NoSuchElementException("No samples found for Goods with ID: " + goodsId);
        }

        return samples;
    }

//  상품 목록 조회하기.
    public List<GoodsDto> findAllBystoreId(GoodsDto goodsDto) {
        Integer storeId = goodsDto.getStoreId();
        Stores store = storeRepository.findByStoreId(storeId);
        if (store == null) {
            throw new NoSuchElementException("해당 storeId가 없습니다.");
        }

        List<Goods> goodsList = goodsRepository.findGoodsByStoreId(store);
        List<GoodsDto> result = new ArrayList<>();


        for (Goods goods : goodsList) {
            GoodsDto tempGoodsdto = new GoodsDto();
            List<String> tmp = new ArrayList<>();
            List<Samples> samplesList = samplesRepository.findAllByGoodsId(goods);
            for (Samples sample : samplesList) {
                tmp.add(sample.getPicture());
            }

            tempGoodsdto.setGoodsId(goods.getGoodsId());
            tempGoodsdto.setStoreId(goods.getStoreId().getStoreId());
            tempGoodsdto.setGoodsName(goods.getGoodsName());
            tempGoodsdto.setGoodsPrice(goods.getGoodsPrice());
            tempGoodsdto.setGoodsDetail(goods.getGoodsDetail());
            tempGoodsdto.setSamples(tmp);

            result.add(tempGoodsdto);

        }

        return result;
    }

    // 상품 생성
    public Goods createGoods(GoodsDto goodsDto, MultipartFile[] pictures) throws Exception {
        Stores store = storeRepository.findById(goodsDto.getStoreId())
                .orElseThrow(() -> new StoresService.StoreNotFoundException("해당 id의 상점이 존재하지 않습니다."));



        Goods goods = new Goods();
        goods.setStoreId(store);
        goods.setGoodsName(goodsDto.getGoodsName());
        goods.setGoodsPrice(goodsDto.getGoodsPrice());
        goods.setGoodsDetail(goodsDto.getGoodsDetail());

        Goods savedGoods = goodsRepository.save(goods);

        // 샘플 이미지를 저장하는 부분
        if (pictures == null || pictures.length == 0) {
            throw new NoSuchElementException("사진을 넣지 않았습니다.");
        }

        for (MultipartFile picture : pictures) {
            if (picture.isEmpty()) {
                throw new NoSuchElementException("사진을 넣지 않았습니다.");
            }
            String tmp = s3Uploader.uploadFile(picture);

            Samples sample = new Samples();
            sample.setPicture(tmp);
            sample.setGoodsId(savedGoods);
            samplesRepository.save(sample);
        }

        return savedGoods;

    }
}
