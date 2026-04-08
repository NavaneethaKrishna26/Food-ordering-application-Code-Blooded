package com.foodapp.backend.dto.user;

import java.time.LocalDateTime;

public record AdminUserResponse(
        Long id,
        String name,
        String email,
        String phone,
        String role,
        long totalOrders,
        LocalDateTime createdAt
) {
}
