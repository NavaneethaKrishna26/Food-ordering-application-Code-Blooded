package com.foodapp.backend.dto.restaurant;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record RestaurantResponse(
        Long id,
        String name,
        String description,
        String address,
        String phone,
        String imageUrl,
        Boolean isActive,
        BigDecimal rating,
        LocalDateTime createdAt
) {
}
