package com.foodapp.backend.dto.menu;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record MenuItemRequest(
        @NotBlank(message = "Name is required")
        String name,
        String description,
        @NotNull(message = "Price is required")
        @DecimalMin(value = "0.0", inclusive = false, message = "Price must be positive")
        BigDecimal price,
        String category,
        String imageUrl,
        Boolean isAvailable
) {
}
