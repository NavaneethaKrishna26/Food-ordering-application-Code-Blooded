package com.foodapp.backend.dto.auth;

public record AuthResponse(
        String token,
        String tokenType,
        long expiresIn,
        AuthUser user
) {
    public record AuthUser(
            Long id,
            String name,
            String email,
            String role
    ) {
    }
}
