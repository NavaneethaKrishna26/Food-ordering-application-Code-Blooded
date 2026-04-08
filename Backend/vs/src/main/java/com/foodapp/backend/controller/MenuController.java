package com.foodapp.backend.controller;

import com.foodapp.backend.dto.common.ApiResponse;
import com.foodapp.backend.dto.menu.MenuItemResponse;
import com.foodapp.backend.service.MenuService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/menus")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @GetMapping("/{restaurantId}")
    public ResponseEntity<ApiResponse<List<MenuItemResponse>>> getByRestaurant(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(ApiResponse.ok("Menu fetched", menuService.getByRestaurant(restaurantId)));
    }

    @GetMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<MenuItemResponse>> getItem(@PathVariable Long itemId) {
        return ResponseEntity.ok(ApiResponse.ok("Item fetched", menuService.getById(itemId)));
    }
}
