package com.foodapp.backend.service;

import com.foodapp.backend.dto.order.OrderResponse;
import com.foodapp.backend.dto.order.PlaceOrderRequest;
import com.foodapp.backend.dto.order.OrderStatusUpdateRequest;
import com.foodapp.backend.entity.OrderStatus;
import java.util.List;

public interface OrderService {
    OrderResponse placeOrder(PlaceOrderRequest request);

    List<OrderResponse> getMyOrders();

    OrderResponse getOrderById(Long orderId);

    OrderResponse cancelOrder(Long orderId);

    List<OrderResponse> getAllOrders(OrderStatus status);

    OrderResponse updateStatus(Long orderId, OrderStatusUpdateRequest request);
}
