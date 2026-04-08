package com.foodapp.backend.controller;

import com.foodapp.backend.dto.common.ApiResponse;
import com.foodapp.backend.dto.order.OrderResponse;
import com.foodapp.backend.dto.order.OrderStatusUpdateRequest;
import com.foodapp.backend.entity.OrderStatus;
import com.foodapp.backend.service.OrderService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getAll(@RequestParam(required = false) OrderStatus status) {
        return ResponseEntity.ok(ApiResponse.ok("All orders fetched", orderService.getAllOrders(status)));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<OrderResponse>> getById(@PathVariable Long orderId) {
        return ResponseEntity.ok(ApiResponse.ok("Order details fetched", orderService.getOrderById(orderId)));
    }

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<ApiResponse<OrderResponse>> updateStatus(@PathVariable Long orderId,
                                                                   @Valid @RequestBody OrderStatusUpdateRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Order status updated", orderService.updateStatus(orderId, request)));
    }
}
