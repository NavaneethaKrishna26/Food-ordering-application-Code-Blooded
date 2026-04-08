package com.foodapp.backend.controller;

import com.foodapp.backend.dto.cart.CartItemRequest;
import com.foodapp.backend.dto.cart.CartResponse;
import com.foodapp.backend.dto.cart.UpdateCartItemRequest;
import com.foodapp.backend.dto.common.ApiResponse;
import com.foodapp.backend.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<ApiResponse<CartResponse>> getMyCart() {
        return ResponseEntity.ok(ApiResponse.ok("Cart fetched", cartService.getMyCart()));
    }

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<CartResponse>> addItem(@Valid @RequestBody CartItemRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Item added to cart", cartService.addItem(request)));
    }

    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<ApiResponse<CartResponse>> updateItem(@PathVariable Long cartItemId,
                                                                @Valid @RequestBody UpdateCartItemRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Cart item updated", cartService.updateItem(cartItemId, request)));
    }

    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<ApiResponse<CartResponse>> removeItem(@PathVariable Long cartItemId) {
        return ResponseEntity.ok(ApiResponse.ok("Cart item removed", cartService.removeItem(cartItemId)));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<CartResponse>> clearCart() {
        return ResponseEntity.ok(ApiResponse.ok("Cart cleared", cartService.clearCart()));
    }
}
