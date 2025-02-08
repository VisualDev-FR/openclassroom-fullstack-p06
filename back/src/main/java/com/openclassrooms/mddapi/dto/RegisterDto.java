package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.validators.ValidPassword;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class RegisterDto {

    @Email(message = "Invalid email")
    @NotNull(message = "An email must be provided")
    @NotEmpty(message = "Email must not be empty")
    @Size(max = User.EMAIL_MAX_SIZE)
    protected String email;

    @ValidPassword
    @NotNull(message = "A password must be provided")
    @NotEmpty(message = "Password must not be empty")
    @Size(max = User.PASSWORD_MAX_SIZE)
    protected String password;

    @NotNull(message = "A name must be provided")
    @NotEmpty(message = "Name must not be empty")
    @Size(max = User.NAME_MAX_SIZE)
    private String username;

}
