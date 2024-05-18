package com.thunder.aurora.security.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.thunder.aurora.security.entity.User;
import com.thunder.aurora.security.pojos.request.AuthenticationRequest;
import com.thunder.aurora.security.pojos.request.RegisterRequest;
import com.thunder.aurora.security.pojos.request.UserProfileRequest;
import com.thunder.aurora.security.pojos.response.AuthenticationResponse;
import com.thunder.aurora.security.repository.UserRepo;
import com.thunder.aurora.service.UserProfileService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

        private final UserRepo userRepo;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
        private final AuthenticationManager authenticationManager;

        private final UserProfileService userProfileService;

        public AuthenticationResponse register(RegisterRequest registerRequest) {

                User existingUser = userRepo.findByEmail(registerRequest.getEmail()).orElse(null);

                if (existingUser != null) {
                        log.error("User already exists with email : {}", registerRequest.getEmail());

                        throw new ResponseStatusException(
                                        HttpStatus.BAD_REQUEST,
                                        "User already exists with email: " + registerRequest.getEmail());
                }

                User user = User.builder()
                                .firstName(registerRequest.getFirstName())
                                .lastName(registerRequest.getLastName())
                                .email(registerRequest.getEmail())
                                .password(passwordEncoder.encode(registerRequest.getPassword()))
                                .build();

                User savedUser = userRepo.save(user);

                log.info("User saved : {}", savedUser);

                String jwtToken = jwtService.generateToken(user);

                // TODO : Decoupling
                UserProfileRequest userProfileRequest = UserProfileRequest.builder()
                                .gender(registerRequest.getGender())
                                .country(registerRequest.getCountry())
                                .user(savedUser)
                                .build();

                userProfileService.createUserProfile(userProfileRequest);

                log.info("User Profile Created");

                return AuthenticationResponse.builder()
                                .jwtToken(jwtToken)
                                .build();
        }

        public AuthenticationResponse authenticate(AuthenticationRequest authRequest) {
                try {
                        authenticationManager.authenticate(
                                        new UsernamePasswordAuthenticationToken(authRequest.getEmail(),
                                                        authRequest.getPassword()));
                        User user = userRepo.findByEmail(authRequest.getEmail())
                                        .orElseThrow(() -> new UsernameNotFoundException(
                                                        "User not found with email : " + authRequest.getEmail()));

                        String jwtToken = jwtService.generateToken(user);
                        return AuthenticationResponse.builder()
                                        .jwtToken(jwtToken)
                                        .build();
                } catch (Exception e) {
                        log.error("Error authenticating user : {}", e.getMessage());

                        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage());
                }

        }

        public boolean existsByEmail(String email) {
                return userRepo.existsByEmail(email);
        }

        public boolean verifyToken(String token) {
                return jwtService.isTokenValid(token);
        }
}
