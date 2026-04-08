package com.foodapp.backend.service;

import com.foodapp.backend.dto.menu.MenuItemRequest;
import com.foodapp.backend.dto.menu.MenuItemResponse;
import java.util.List;

public interface MenuService {
    List<MenuItemResponse> getByRestaurant(Long restaurantId);

    MenuItemResponse getById(Long itemId);

    MenuItemResponse create(Long restaurantId, MenuItemRequest request);

    MenuItemResponse update(Long itemId, MenuItemRequest request);

    void delete(Long itemId);
}
