package com.foodapp.backend.dto.cart;

import java.math.BigDecimal;

public record CartItemResponse(
        Long cartItemId,
        Long menuItemId,
        String name,
        BigDecimal price,
        Integer quantity,
        BigDecimal subTotal
) {
}
