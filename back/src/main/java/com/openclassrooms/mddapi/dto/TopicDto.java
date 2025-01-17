package com.openclassrooms.mddapi.dto;

import lombok.Data;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopicDto {

    private Long id;

    private String title;

    private String description;

    private Date created_at;
}
