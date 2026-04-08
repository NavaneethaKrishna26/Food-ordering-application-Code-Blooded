package com.foodapp.backend.repository;

import com.foodapp.backend.entity.CartItem;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartIdAndMenuItemId(Long cartId, Long menuItemId);
}
