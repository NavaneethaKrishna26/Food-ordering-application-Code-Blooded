package com.foodapp.backend.service.impl;

import com.foodapp.backend.dto.order.OrderItemResponse;
import com.foodapp.backend.dto.order.PlaceOrderRequest;
import com.foodapp.backend.dto.order.OrderResponse;
import com.foodapp.backend.dto.order.OrderStatusUpdateRequest;
import com.foodapp.backend.entity.Cart;
import com.foodapp.backend.entity.CartItem;
import com.foodapp.backend.entity.Order;
import com.foodapp.backend.entity.OrderItem;
import com.foodapp.backend.entity.OrderStatus;
import com.foodapp.backend.entity.Role;
import com.foodapp.backend.entity.User;
import com.foodapp.backend.exception.BadRequestException;
import com.foodapp.backend.exception.ResourceNotFoundException;
import com.foodapp.backend.repository.CartRepository;
import com.foodapp.backend.repository.OrderRepository;
import com.foodapp.backend.repository.RestaurantRepository;
import com.foodapp.backend.repository.UserRepository;
import com.foodapp.backend.service.OrderService;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;

    @Override
    @Transactional
    public OrderResponse placeOrder(PlaceOrderRequest request) {
        User currentUser = getCurrentUser();
        Cart cart = cartRepository.findByUserId(currentUser.getId())
                .orElseThrow(() -> new BadRequestException("Cart not found"));

        if (cart.getItems().isEmpty()) {
            throw new BadRequestException("Cannot place order with empty cart");
        }

        if (cart.getRestaurant() == null || !cart.getRestaurant().getId().equals(request.restaurantId())) {
            throw new BadRequestException("Cart restaurant mismatch");
        }

        restaurantRepository.findById(request.restaurantId())
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + request.restaurantId()));

        Order order = Order.builder()
                .user(currentUser)
                .restaurant(cart.getRestaurant())
                .deliveryAddress(request.deliveryAddress())
                .specialInstructions(request.specialInstructions())
                .status(OrderStatus.PLACED)
                .totalAmount(BigDecimal.ZERO)
                .build();

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (CartItem cartItem : cart.getItems()) {
            BigDecimal lineTotal = cartItem.getMenuItem().getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()));
            total = total.add(lineTotal);

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                .menuItem(cartItem.getMenuItem())
                    .quantity(cartItem.getQuantity())
                .priceAtPurchase(cartItem.getMenuItem().getPrice())
                    .build();
            orderItems.add(orderItem);
        }

        order.setTotalAmount(total);
        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        cart.getItems().clear();
        cart.setRestaurant(null);
        cartRepository.save(cart);

        return toResponse(savedOrder);
    }

    @Override
    public List<OrderResponse> getMyOrders() {
        User currentUser = getCurrentUser();
        return orderRepository.findByUserIdOrderByPlacedAtDesc(currentUser.getId()).stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public OrderResponse getOrderById(Long orderId) {
        User currentUser = getCurrentUser();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        boolean isAdmin = currentUser.getRole() == Role.ROLE_ADMIN;
        boolean isOwner = order.getUser().getId().equals(currentUser.getId());

        if (!isAdmin && !isOwner) {
            throw new BadRequestException("Order doesn't belong to this user");
        }

        return toResponse(order);
    }

    @Override
    @Transactional
    public OrderResponse cancelOrder(Long orderId) {
        User currentUser = getCurrentUser();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        if (!order.getUser().getId().equals(currentUser.getId())) {
            throw new BadRequestException("Order doesn't belong to this user");
        }
        if (order.getStatus() != OrderStatus.PLACED) {
            throw new BadRequestException("Only PLACED orders can be cancelled");
        }

        order.setStatus(OrderStatus.CANCELLED);
        order.setCancelledAt(java.time.LocalDateTime.now());
        return toResponse(orderRepository.save(order));
    }

    @Override
    public List<OrderResponse> getAllOrders(OrderStatus status) {
        List<Order> orders = status == null
                ? orderRepository.findByOrderByPlacedAtDesc()
                : orderRepository.findByStatusOrderByPlacedAtDesc(status);
        return orders.stream().map(this::toResponse).toList();
    }

    @Override
    @Transactional
    public OrderResponse updateStatus(Long orderId, OrderStatusUpdateRequest request) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));

        if (order.getStatus() == OrderStatus.DELIVERED || order.getStatus() == OrderStatus.CANCELLED) {
            throw new BadRequestException("Invalid status transition");
        }

        order.setStatus(request.status());
        if (request.status() == OrderStatus.DELIVERED) {
            order.setDeliveredAt(java.time.LocalDateTime.now());
        }
        return toResponse(orderRepository.save(order));
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private OrderResponse toResponse(Order order) {
        List<OrderItemResponse> items = order.getItems().stream()
                .map(item -> {
                    BigDecimal lineTotal = item.getPriceAtPurchase().multiply(BigDecimal.valueOf(item.getQuantity()));
                    return new OrderItemResponse(
                    item.getMenuItem().getId(),
                    item.getMenuItem().getName(),
                            item.getQuantity(),
                            item.getPriceAtPurchase(),
                            lineTotal
                    );
                })
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getUser().getId(),
            order.getRestaurant().getId(),
            order.getRestaurant().getName(),
                order.getStatus(),
            order.getDeliveryAddress(),
            order.getSpecialInstructions(),
                order.getTotalAmount(),
                order.getPlacedAt(),
            order.getDeliveredAt(),
            order.getCancelledAt(),
                items
        );
    }
}
