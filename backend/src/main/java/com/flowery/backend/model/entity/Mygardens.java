package com.flowery.backend.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Mygardens {

    @Id
    @Column(name = "garden_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int gardenId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "message_id")
    private Messages messageId;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private Users userId;


}
