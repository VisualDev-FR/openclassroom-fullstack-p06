package com.openclassrooms.mddapi.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {

    private Long id;

    private Long topic_id;

    private Long user_id;

    private String title;

    private String description;

    private Date created_at;

    private String username;

    private String topicTitle;
}
