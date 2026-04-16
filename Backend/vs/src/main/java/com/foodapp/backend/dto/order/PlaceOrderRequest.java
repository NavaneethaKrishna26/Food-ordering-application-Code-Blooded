package com.foodapp.backend.dto.order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PlaceOrderRequest(
        @NotNull(message = "Restaurant id is required")
        Long restaurantId,
        @NotBlank(message = "Delivery address is required")
        String deliveryAddress,
        String specialInstructions
) {
}
