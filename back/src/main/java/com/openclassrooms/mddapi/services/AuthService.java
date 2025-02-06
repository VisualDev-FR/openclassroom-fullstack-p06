package com.openclassrooms.mddapi.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.Exceptions.DuplicateUserException;
import com.openclassrooms.mddapi.dto.LoginDto;
import com.openclassrooms.mddapi.dto.RegisterDto;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.payload.Request.UserUpdateRequest;
import com.openclassrooms.mddapi.payload.Response.JwtResponse;

import lombok.Data;

@Data
@Service
public class AuthService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public JwtResponse register(RegisterDto registerDatas) {

        String email = registerDatas.getEmail();

        if (userService.existsByEmail(email))
            throw new DuplicateUserException(email);

        User user = userService.createUser(
                registerDatas.getUsername(),
                registerDatas.getEmail(),
                registerDatas.getPassword());

        return this.jwtService.generateToken(user);
    }

    public JwtResponse login(LoginDto data) {

        this.TryAuthenticate(data.getEmail(), data.getPassword());

        User user = userService.findByEmail(data.getEmail());

        return this.jwtService.generateToken(user);
    }

    public Authentication TryAuthenticate(String email, String password) {

        var credentials = new UsernamePasswordAuthenticationToken(email, password);

        Authentication authentication = authenticationManager.authenticate(credentials);

        if (!authentication.isAuthenticated())
            throw new BadCredentialsException("Bad credentials");

        return authentication;
    }

    public JwtResponse updateCredentials(UserUpdateRequest datas) {

        User currentUser = this.userService.getCurrentUser();

        this.TryAuthenticate(currentUser.getEmail(), datas.getCurrentPassword());

        String username = datas.getUsername();
        String email = datas.getEmail();
        String password = datas.getPassword();

        if (username != null && !username.equals(currentUser.getName())) {
            currentUser.setName(username);
        }

        if (email != null && !email.equals(currentUser.getEmail())) {

            if (this.userService.existsByEmail(email)) {
                throw new DuplicateUserException(email);
            }

            currentUser.setEmail(email);
        }

        if (password != null && !password.equals(currentUser.getPassword())) {
            currentUser.setPassword(this.passwordEncoder.encode(password));
        }

        User updatedUser = this.userService.save(currentUser);

        return this.jwtService.generateToken(updatedUser);
    }

}
