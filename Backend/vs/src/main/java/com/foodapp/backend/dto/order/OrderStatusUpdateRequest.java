package com.foodapp.backend.dto.order;

import com.foodapp.backend.entity.OrderStatus;
import jakarta.validation.constraints.NotNull;

public record OrderStatusUpdateRequest(
        @NotNull(message = "Status is required")
        OrderStatus status
) {
}
