package com.flowery.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Meaning {
    @Id
    @Column(name = "mean_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int meanId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "flower_id")
    private Flowers flowerId;

    @Column(name = "mean")
    private String mean;

}
