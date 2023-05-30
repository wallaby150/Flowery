package com.flowery.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Holidays {

    @Id
    @Column(name = "holiday_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int holidayId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "store_id")
    private Stores storeId;

    @Column(name = "day")
    private String day;

}
