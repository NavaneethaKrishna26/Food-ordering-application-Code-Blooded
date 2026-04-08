package com.foodapp.backend.repository;

import com.foodapp.backend.entity.Order;
import com.foodapp.backend.entity.OrderStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserIdOrderByPlacedAtDesc(Long userId);

    List<Order> findByOrderByPlacedAtDesc();

    List<Order> findByStatusOrderByPlacedAtDesc(OrderStatus status);
}
