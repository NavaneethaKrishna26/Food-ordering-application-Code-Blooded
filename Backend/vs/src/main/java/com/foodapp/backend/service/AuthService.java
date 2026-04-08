package com.foodapp.backend.service;

import com.foodapp.backend.dto.auth.AuthResponse;
import com.foodapp.backend.dto.auth.LoginRequest;
import com.foodapp.backend.dto.auth.RegisterRequest;
import com.foodapp.backend.dto.auth.UserProfileResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    UserProfileResponse getMyProfile();
}
