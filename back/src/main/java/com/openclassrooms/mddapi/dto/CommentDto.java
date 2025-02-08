package com.openclassrooms.mddapi.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {

    private Long id;

    private Long post_id;

    private Long user_id;

    private String content;

    private Date created_at;

    private String username;
}
