package com.foodapp.backend.controller;

import com.foodapp.backend.dto.common.ApiResponse;
import com.foodapp.backend.dto.order.OrderResponse;
import com.foodapp.backend.dto.order.PlaceOrderRequest;
import com.foodapp.backend.dto.order.OrderStatusUpdateRequest;
import com.foodapp.backend.service.OrderService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> placeOrder(@Valid @RequestBody PlaceOrderRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Order placed successfully", orderService.placeOrder(request)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getMyOrders() {
        return ResponseEntity.ok(ApiResponse.ok("Orders fetched", orderService.getMyOrders()));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<OrderResponse>> getById(@PathVariable Long orderId) {
        return ResponseEntity.ok(ApiResponse.ok("Order fetched", orderService.getOrderById(orderId)));
    }

    @PatchMapping("/{orderId}/cancel")
    public ResponseEntity<ApiResponse<OrderResponse>> cancel(@PathVariable Long orderId) {
        return ResponseEntity.ok(ApiResponse.ok("Order cancelled successfully", orderService.cancelOrder(orderId)));
    }
}
