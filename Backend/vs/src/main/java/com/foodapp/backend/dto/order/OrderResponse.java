package com.foodapp.backend.dto.order;

import com.foodapp.backend.entity.OrderStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(
        Long orderId,
        Long userId,
        Long restaurantId,
        String restaurantName,
        OrderStatus status,
        String deliveryAddress,
        String specialInstructions,
        BigDecimal totalAmount,
        LocalDateTime placedAt,
        LocalDateTime deliveredAt,
        LocalDateTime cancelledAt,
        List<OrderItemResponse> items
) {
}
