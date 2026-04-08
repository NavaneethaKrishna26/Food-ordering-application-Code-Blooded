package com.foodapp.backend.dto.restaurant;

import jakarta.validation.constraints.NotBlank;

public record RestaurantRequest(
        @NotBlank(message = "Restaurant name is required")
        String name,
        String description,
        @NotBlank(message = "Address is required")
        String address,
        @NotBlank(message = "Phone is required")
        String phone,
        String imageUrl,
        Boolean isActive
) {
}
