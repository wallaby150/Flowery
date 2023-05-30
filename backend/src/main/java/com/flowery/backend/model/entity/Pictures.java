package com.flowery.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Pictures {

    @Id
    @Column(name = "picture_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pictureId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "message_id")
    private Messages messageId;

    @Column(name = "url")
    private String url;

}
