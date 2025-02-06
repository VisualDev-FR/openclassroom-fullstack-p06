package com.openclassrooms.mddapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.LoginDto;
import com.openclassrooms.mddapi.dto.RegisterDto;
import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.mapper.UserMapper;
import com.openclassrooms.mddapi.services.AuthService;
import com.openclassrooms.mddapi.services.UserService;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.payload.Request.UserUpdateRequest;
import com.openclassrooms.mddapi.payload.Response.JwtResponse;

import jakarta.validation.Valid;

@RestController
public class AuthController {

    @Autowired
    private UserService userservice;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserMapper userMapper;

    @PostMapping("/api/auth/register")
    public ResponseEntity<JwtResponse> register(@Valid @RequestBody RegisterDto registerDatas) {

        JwtResponse response = this.authService.register(registerDatas);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @PostMapping("/api/auth/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginDto data) {

        JwtResponse response = this.authService.login(data);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

    @GetMapping("/api/auth/me")
    public ResponseEntity<UserDto> me() {

        User user = userservice.getCurrentUser();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.userMapper.toDto(user));
    }

    @GetMapping("/api/user/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable Integer id) {

        User currentUser = userservice.findByID(id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.userMapper.toDto(currentUser));
    }

    @PatchMapping("/api/auth/me")
    public ResponseEntity<JwtResponse> updateCurrentUser(@RequestBody UserUpdateRequest data) {

        JwtResponse response = this.authService.updateCredentials(data);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

}
