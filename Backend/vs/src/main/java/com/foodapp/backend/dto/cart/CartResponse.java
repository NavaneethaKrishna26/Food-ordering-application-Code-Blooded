package com.foodapp.backend.dto.cart;

import java.math.BigDecimal;
import java.util.List;

public record CartResponse(
        Long cartId,
        Long restaurantId,
        String restaurantName,
        List<CartItemResponse> items,
        BigDecimal totalAmount,
        Integer itemCount
) {
}
