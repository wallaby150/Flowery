package com.flowery.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Myflowers {

    @Id
    @Column(name = "myflowers_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int myflowersId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "message_id")
    private Messages messageId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "mean_id")
    private Meaning meanId;


}
