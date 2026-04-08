package com.foodapp.backend.service.impl;

import com.foodapp.backend.dto.menu.MenuItemRequest;
import com.foodapp.backend.dto.menu.MenuItemResponse;
import com.foodapp.backend.entity.MenuItem;
import com.foodapp.backend.entity.Restaurant;
import com.foodapp.backend.exception.ResourceNotFoundException;
import com.foodapp.backend.repository.MenuItemRepository;
import com.foodapp.backend.repository.RestaurantRepository;
import com.foodapp.backend.service.MenuService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {

    private final MenuItemRepository menuItemRepository;
    private final RestaurantRepository restaurantRepository;

    @Override
    public List<MenuItemResponse> getByRestaurant(Long restaurantId) {
        if (!restaurantRepository.existsById(restaurantId)) {
            throw new ResourceNotFoundException("Restaurant not found with id: " + restaurantId);
        }
        return menuItemRepository.findByRestaurantIdAndIsAvailableTrue(restaurantId).stream().map(this::toResponse).toList();
    }

    @Override
    public MenuItemResponse getById(Long itemId) {
        MenuItem item = menuItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + itemId));
        return toResponse(item);
    }

    @Override
    @Transactional
    public MenuItemResponse create(Long restaurantId, MenuItemRequest request) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + restaurantId));

        MenuItem item = MenuItem.builder()
                .restaurant(restaurant)
                .name(request.name())
                .description(request.description())
                .price(request.price())
                .category(request.category())
                .imageUrl(request.imageUrl())
                .isAvailable(request.isAvailable() == null ? Boolean.TRUE : request.isAvailable())
                .build();

        return toResponse(menuItemRepository.save(item));
    }

    @Override
    @Transactional
    public MenuItemResponse update(Long itemId, MenuItemRequest request) {
        MenuItem item = menuItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id: " + itemId));

        if (request.name() != null) {
            item.setName(request.name());
        }
        if (request.description() != null) {
            item.setDescription(request.description());
        }
        if (request.price() != null) {
            item.setPrice(request.price());
        }
        if (request.category() != null) {
            item.setCategory(request.category());
        }
        if (request.imageUrl() != null) {
            item.setImageUrl(request.imageUrl());
        }
        if (request.isAvailable() != null) {
            item.setIsAvailable(request.isAvailable());
        }

        return toResponse(menuItemRepository.save(item));
    }

    @Override
    @Transactional
    public void delete(Long itemId) {
        if (!menuItemRepository.existsById(itemId)) {
            throw new ResourceNotFoundException("Menu item not found with id: " + itemId);
        }
        menuItemRepository.deleteById(itemId);
    }

    private MenuItemResponse toResponse(MenuItem item) {
        return new MenuItemResponse(
                item.getId(),
                item.getRestaurant().getId(),
                item.getName(),
                item.getDescription(),
                item.getPrice(),
                item.getCategory(),
                item.getImageUrl(),
                item.getIsAvailable()
        );
    }
}
