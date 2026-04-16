package com.foodapp.backend.service.impl;

import com.foodapp.backend.dto.auth.AuthResponse;
import com.foodapp.backend.dto.auth.LoginRequest;
import com.foodapp.backend.dto.auth.RegisterRequest;
import com.foodapp.backend.dto.auth.UserProfileResponse;
import com.foodapp.backend.entity.Role;
import com.foodapp.backend.entity.User;
import com.foodapp.backend.exception.BadRequestException;
import com.foodapp.backend.exception.ResourceNotFoundException;
import com.foodapp.backend.repository.UserRepository;
import com.foodapp.backend.security.JwtService;
import com.foodapp.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email already registered");
        }

        User user = User.builder()
                .fullName(request.fullName())
                .email(request.email().toLowerCase())
            .phone(request.phone())
                .password(passwordEncoder.encode(request.password()))
                .role(Role.ROLE_USER)
                .build();

        User saved = userRepository.save(user);
        String token = jwtService.generateToken(saved);

        return new AuthResponse(
            token,
            "Bearer",
            jwtService.getExpirationSeconds(),
            new AuthResponse.AuthUser(saved.getId(), saved.getFullName(), saved.getEmail(), mapRole(saved.getRole()))
        );
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email().toLowerCase(), request.password())
        );

        User user = (User) authentication.getPrincipal();
        String token = jwtService.generateToken(user);
        return new AuthResponse(
            token,
            "Bearer",
            jwtService.getExpirationSeconds(),
            new AuthResponse.AuthUser(user.getId(), user.getFullName(), user.getEmail(), mapRole(user.getRole()))
        );
        }

        @Override
        public UserProfileResponse getMyProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return new UserProfileResponse(
            user.getId(),
            user.getFullName(),
            user.getEmail(),
            user.getPhone(),
            mapRole(user.getRole()),
            user.getCreatedAt()
        );
        }

        private String mapRole(Role role) {
        return role == Role.ROLE_ADMIN ? "ADMIN" : "CUSTOMER";
    }
}
