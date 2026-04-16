package com.foodapp.backend.dto.menu;

import java.math.BigDecimal;

public record MenuItemResponse(
        Long id,
        Long restaurantId,
        String name,
        String description,
        BigDecimal price,
        String category,
        String imageUrl,
        Boolean isAvailable
) {
}
