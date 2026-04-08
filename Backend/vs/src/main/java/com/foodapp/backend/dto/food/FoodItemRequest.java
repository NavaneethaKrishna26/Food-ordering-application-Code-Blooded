package com.foodapp.backend.dto.food;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record FoodItemRequest(
        @NotBlank(message = "Food name is required")
        String name,
        String description,

        @NotNull(message = "Price is required")
        @DecimalMin(value = "0.0", inclusive = false, message = "Price must be positive")
        BigDecimal price,

        @NotNull(message = "Availability is required")
        Boolean available,

        @NotNull(message = "Category id is required")
        Long categoryId
) {
}
