package com.flowery.backend.sevice;

import com.flowery.backend.model.entity.Flowers;
import com.flowery.backend.repository.FlowerRepository;
import org.springframework.stereotype.Service;

@Service
public class FlowerService {

    private FlowerRepository flowerRepository;

    FlowerService(FlowerRepository flowerRepository){
        this.flowerRepository = flowerRepository;
    }

    public Flowers findFlower(int code){
        return flowerRepository.findById(code).get();
    }

}
