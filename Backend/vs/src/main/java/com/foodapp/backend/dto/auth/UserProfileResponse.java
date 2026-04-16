package com.foodapp.backend.dto.auth;

import java.time.LocalDateTime;

public record UserProfileResponse(
        Long id,
        String name,
        String email,
        String phone,
        String role,
        LocalDateTime createdAt
) {
}
