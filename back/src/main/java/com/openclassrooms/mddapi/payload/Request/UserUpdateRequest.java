package com.openclassrooms.mddapi.payload.Request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserUpdateRequest {

    @NotNull
    @NotEmpty
    private String currentPassword;

    @Email
    private String email;

    @NotEmpty
    private String username;

    @NotEmpty
    private String password;
}
