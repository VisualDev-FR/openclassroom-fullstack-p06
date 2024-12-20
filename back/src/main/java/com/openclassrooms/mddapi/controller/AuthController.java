package com.openclassrooms.mddapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.Exceptions.DuplicateUserException;
import com.openclassrooms.mddapi.dto.LoginDto;
import com.openclassrooms.mddapi.dto.RegisterDto;
import com.openclassrooms.mddapi.dto.TokenDto;
import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.services.JWTService;
import com.openclassrooms.mddapi.services.UserService;
import com.openclassrooms.mddapi.model.User;

import jakarta.validation.Valid;

@RestController
public class AuthController {

    @Autowired
    private UserService userservice;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    public AuthController(JWTService jwtService) {
        this.jwtService = jwtService;
    }

    private ResponseEntity<TokenDto> getToken(String email) {
        String jwt = jwtService.generateToken(email);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new TokenDto(jwt));
    }

    @PostMapping("/auth/register")
    public ResponseEntity<TokenDto> register(@Valid @RequestBody RegisterDto registerDatas) {

        String email = registerDatas.getEmail();

        if (userservice.userExistsByEmail(email))
            throw new DuplicateUserException(email);

        userservice.createUser(new User(
                registerDatas.getName(),
                registerDatas.getEmail(),
                registerDatas.getPassword()));

        return getToken(email);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<TokenDto> login(@RequestBody LoginDto data) {

        var credentials = new UsernamePasswordAuthenticationToken(
                data.getEmail(),
                data.getPassword());

        if (!userservice.userExistsByEmail(data.getEmail()))
            throw new BadCredentialsException("Bad credentials");

        Authentication authentication = authenticationManager.authenticate(credentials);

        if (!authentication.isAuthenticated())
            throw new BadCredentialsException("Bad credentials");

        return getToken(data.getEmail());
    }

    @GetMapping("/auth/me")
    public ResponseEntity<UserDto> me() {

        User user = userservice.getCurrentUser();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new UserDto(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getCreated_at().toString(),
                        user.getUpdated_at().toString()));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Integer id) {

        User currentUser = userservice.findByID(id);

        UserDto userDTO = UserDto.builder()
                .id(currentUser.getId())
                .name(currentUser.getName())
                .email(currentUser.getEmail())
                .created_at(currentUser.getCreated_at().toString())
                .updated_at(currentUser.getUpdated_at().toString())
                .build();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(userDTO);
    }
}
