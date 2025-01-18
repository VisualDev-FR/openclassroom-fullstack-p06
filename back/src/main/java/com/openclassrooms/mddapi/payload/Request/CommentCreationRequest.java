package com.openclassrooms.mddapi.payload.Request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentCreationRequest {

    @NotNull
    public Long post_id;

    @NotNull
    @NotEmpty
    public String content;
}
