package com.flowery.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Poems {
    @Id
    @Column(name = "poem_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int poemId;

//    @ManyToOne
//    @JsonIgnore
//    @JoinColumn(name = "flower_id")
    @Column(name = "flower_id")
    private Integer flowerId;

    @Column(name = "poem")
    private String poem;

}
