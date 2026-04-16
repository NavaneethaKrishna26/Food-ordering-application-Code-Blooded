package com.foodapp.backend.service.impl;

import com.foodapp.backend.dto.cart.CartItemRequest;
import com.foodapp.backend.dto.cart.CartItemResponse;
import com.foodapp.backend.dto.cart.CartResponse;
import com.foodapp.backend.dto.cart.UpdateCartItemRequest;
import com.foodapp.backend.entity.Cart;
import com.foodapp.backend.entity.CartItem;
import com.foodapp.backend.entity.MenuItem;
import com.foodapp.backend.entity.Restaurant;
import com.foodapp.backend.entity.User;
import com.foodapp.backend.exception.BadRequestException;
import com.foodapp.backend.exception.ResourceNotFoundException;
import com.foodapp.backend.repository.CartItemRepository;
import com.foodapp.backend.repository.CartRepository;
import com.foodapp.backend.repository.MenuItemRepository;
import com.foodapp.backend.repository.UserRepository;
import com.foodapp.backend.service.CartService;
import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public CartResponse getMyCart() {
        User currentUser = getCurrentUser();
        Cart cart = getOrCreateCart(currentUser);
        return toResponse(cart);
    }

    @Override
    @Transactional
    public CartResponse addItem(CartItemRequest request) {
        User currentUser = getCurrentUser();
        Cart cart = getOrCreateCart(currentUser);

        MenuItem menuItem = menuItemRepository.findById(request.menuItemId())
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + request.menuItemId()));

        if (!menuItem.getIsAvailable()) {
            throw new BadRequestException("Menu item is currently unavailable");
        }

        if (cart.getRestaurant() != null && !cart.getRestaurant().getId().equals(menuItem.getRestaurant().getId())) {
            cart.getItems().clear();
        }
        cart.setRestaurant(menuItem.getRestaurant());

        Restaurant restaurant = cart.getRestaurant();
        if (restaurant == null) {
            throw new BadRequestException("Cart restaurant context is invalid");
        }

        CartItem cartItem = cartItemRepository.findByCartIdAndMenuItemId(cart.getId(), menuItem.getId())
                .orElseGet(() -> CartItem.builder()
                        .cart(cart)
                        .menuItem(menuItem)
                        .quantity(0)
                        .build());

        cartItem.setQuantity(cartItem.getQuantity() + request.quantity());
        cartItemRepository.save(cartItem);

        return toResponse(getOrCreateCart(currentUser));
    }

    @Override
    @Transactional
    public CartResponse updateItem(Long cartItemId, UpdateCartItemRequest request) {
        User currentUser = getCurrentUser();
        Cart cart = getOrCreateCart(currentUser);

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with id: " + cartItemId));

        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new BadRequestException("Cart item does not belong to current user");
        }

        if (request.quantity() == 0) {
            cartItemRepository.delete(cartItem);
            return toResponse(getOrCreateCart(currentUser));
        }

        cartItem.setQuantity(request.quantity());
        cartItemRepository.save(cartItem);

        return toResponse(getOrCreateCart(currentUser));
    }

    @Override
    @Transactional
    public CartResponse removeItem(Long cartItemId) {
        User currentUser = getCurrentUser();
        Cart cart = getOrCreateCart(currentUser);

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with id: " + cartItemId));

        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new BadRequestException("Cart item does not belong to current user");
        }

        cartItemRepository.delete(cartItem);
        return toResponse(getOrCreateCart(currentUser));
    }

    @Override
    @Transactional
    public CartResponse clearCart() {
        User currentUser = getCurrentUser();
        Cart cart = getOrCreateCart(currentUser);

        cart.getItems().clear();
        cart.setRestaurant(null);
        cartRepository.save(cart);

        return toResponse(cart);
    }

    private Cart getOrCreateCart(User user) {
        return cartRepository.findByUserId(user.getId())
                .orElseGet(() -> cartRepository.save(Cart.builder().user(user).build()));
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private CartResponse toResponse(Cart cart) {
        List<CartItemResponse> items = cart.getItems().stream()
                .map(this::toItemResponse)
                .toList();

        BigDecimal total = items.stream()
            .map(CartItemResponse::subTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int itemCount = items.stream().map(CartItemResponse::quantity).reduce(0, Integer::sum);

        Long restaurantId = cart.getRestaurant() == null ? null : cart.getRestaurant().getId();
        String restaurantName = cart.getRestaurant() == null ? null : cart.getRestaurant().getName();

        return new CartResponse(cart.getId(), restaurantId, restaurantName, items, total, itemCount);
    }

    private CartItemResponse toItemResponse(CartItem cartItem) {
        BigDecimal lineTotal = cartItem.getMenuItem().getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity()));

        return new CartItemResponse(
                cartItem.getId(),
            cartItem.getMenuItem().getId(),
            cartItem.getMenuItem().getName(),
            cartItem.getMenuItem().getPrice(),
                cartItem.getQuantity(),
                lineTotal
        );
    }
}
