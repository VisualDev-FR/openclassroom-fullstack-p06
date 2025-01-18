package com.openclassrooms.mddapi.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class UserDto {

    Long id;
    String name;
    String email;
    Date created_at;
    Date updated_at;
}
