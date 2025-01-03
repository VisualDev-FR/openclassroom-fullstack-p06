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
import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.services.JWTService;
import com.openclassrooms.mddapi.services.UserService;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.payload.Response.JwtResponse;

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

    private ResponseEntity<JwtResponse> getToken(User user) {

        String jwt = jwtService.generateToken(user.getEmail());

        JwtResponse response = JwtResponse.builder()
                .token(jwt)
                .id(user.getId())
                .email(user.getEmail())
                .build();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<JwtResponse> register(@Valid @RequestBody RegisterDto registerDatas) {

        String email = registerDatas.getEmail();

        if (userservice.userExistsByEmail(email))
            throw new DuplicateUserException(email);

        User user = userservice.createUser(new User(
                registerDatas.getName(),
                registerDatas.getEmail(),
                registerDatas.getPassword()));

        return getToken(user);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginDto data) {

        var credentials = new UsernamePasswordAuthenticationToken(
                data.getEmail(),
                data.getPassword());

        if (!userservice.userExistsByEmail(data.getEmail()))
            throw new BadCredentialsException("Bad credentials");

        Authentication authentication = authenticationManager.authenticate(credentials);

        if (!authentication.isAuthenticated())
            throw new BadCredentialsException("Bad credentials");

        User user = userservice.findByEmail(data.getEmail());

        return getToken(user);
    }

    @GetMapping("/auth/me")
    public ResponseEntity<UserDto> me() {

        User user = userservice.getCurrentUser();

        UserDto dto = UserDto.builder()
            .email(user.getEmail())
            .build();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(dto);
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
