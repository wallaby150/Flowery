package com.flowery.backend.model.dto;

import com.flowery.backend.model.entity.Seller;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SellerDto {

    private Integer sellerId;

    private Integer userId;

    private Integer storeId;

    private String name;

    SellerDto(Seller seller){
        this.sellerId = seller.getSellerId();
        this.userId = seller.getUserId().getUsersId();
        this.storeId = seller.getStoreId().getStoreId();
        this.name = seller.getSellerName();
    }


}
