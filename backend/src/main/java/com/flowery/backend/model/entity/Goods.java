package com.flowery.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Goods {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goods_id")
    private int goodsId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn ( name = "store_id")
    @JsonIgnore
    private Stores storeId;

    @Column(name = "goods_name")
    private String goodsName;

    @Column(name = "goods_price")
    private int goodsPrice;

    @Column(name = "goods_detail")
    private String goodsDetail;

}
