package com.flowery.backend.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.flowery.backend.model.entity.Stores;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.List;

@Data
public class GoodsDto {
    private int goodsId;

    private int storeId;

    private String goodsName;

    private int goodsPrice;

    private String goodsDetail;

    private List<String> samples;
}
