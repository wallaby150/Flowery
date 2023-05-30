package com.flowery.backend.model.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
public class MessagesDto {

    private String messageId;
    private String message;
    private String video;
    private String flowerPicture;
    private int papers;
    private int font;
    private LocalDateTime messageDate;
    private String poem;
    private List<String> pictures;
    private Map<String, List<String>> flowerAndMeaning;
    private String renderedCard;

}
