package com.foodapp.backend.controller;

import com.foodapp.backend.dto.common.ApiResponse;
import com.foodapp.backend.dto.menu.MenuItemRequest;
import com.foodapp.backend.dto.menu.MenuItemResponse;
import com.foodapp.backend.service.MenuService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/menus")
@RequiredArgsConstructor
public class AdminMenuController {

    private final MenuService menuService;

    @PostMapping("/{restaurantId}")
    public ResponseEntity<ApiResponse<MenuItemResponse>> create(@PathVariable Long restaurantId,
                                                                @Valid @RequestBody MenuItemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Menu item added", menuService.create(restaurantId, request)));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<MenuItemResponse>> update(@PathVariable Long itemId,
                                                                @RequestBody MenuItemRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Menu item updated", menuService.update(itemId, request)));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<ApiResponse<Object>> delete(@PathVariable Long itemId) {
        menuService.delete(itemId);
        return ResponseEntity.ok(ApiResponse.ok("Menu item deleted", null));
    }
}
