package com.openclassrooms.mddapi.payload.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostCreationRequest {

    private Long topic_id;

    private String title;

    private String description;
}
