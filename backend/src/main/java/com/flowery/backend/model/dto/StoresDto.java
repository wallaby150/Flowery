package com.flowery.backend.model.dto;

import com.flowery.backend.model.entity.Stores;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.List;

@Data
@NoArgsConstructor
public class StoresDto {
    private int storeId;

    private String storeName;

    private String storePhone;

    private int permit;

    private Integer open;

    private Integer close;

    private String address;

    private String info;

    private String image;

    private String profile;

    private List<String> samples;

    public StoresDto(Stores stores){
        this.storeId = stores.getStoreId();
        this.storeName = stores.getStoreName();
        this.storePhone = stores.getStorePhone();
        this.permit = stores.getPermit();
        this.open = stores.getOpen();
        this.close = stores.getClose();
        this.address = stores.getAddress();
        this.info = stores.getInfo();
        this.image = stores.getImage();
        this.profile = stores.getProfile();
    }

}
