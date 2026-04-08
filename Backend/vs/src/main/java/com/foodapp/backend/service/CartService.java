package com.foodapp.backend.service;

import com.foodapp.backend.dto.cart.CartItemRequest;
import com.foodapp.backend.dto.cart.CartResponse;
import com.foodapp.backend.dto.cart.UpdateCartItemRequest;

public interface CartService {
    CartResponse getMyCart();

    CartResponse addItem(CartItemRequest request);

    CartResponse updateItem(Long cartItemId, UpdateCartItemRequest request);

    CartResponse removeItem(Long cartItemId);

    CartResponse clearCart();
}
