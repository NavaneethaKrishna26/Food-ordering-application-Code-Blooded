package com.foodapp.backend.dto.order;

import java.math.BigDecimal;

public record OrderItemResponse(
        Long menuItemId,
        String name,
        Integer quantity,
        BigDecimal price,
        BigDecimal subTotal
) {
}
