package com.foodapp.backend.dto.food;

import java.math.BigDecimal;

public record FoodItemResponse(
        Long id,
        String name,
        String description,
        BigDecimal price,
        boolean available,
        Long categoryId,
        String categoryName
) {
}
