package com.foodapp.backend.controller;

import com.foodapp.backend.dto.common.ApiResponse;
import com.foodapp.backend.dto.food.FoodItemRequest;
import com.foodapp.backend.dto.food.FoodItemResponse;
import com.foodapp.backend.service.FoodItemService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/foods")
@RequiredArgsConstructor
public class FoodItemController {

    private final FoodItemService foodItemService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<FoodItemResponse>>> getAll(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Boolean available
    ) {
        if (categoryId != null) {
            return ResponseEntity.ok(ApiResponse.ok("Food items fetched", foodItemService.getByCategory(categoryId)));
        }

        if (Boolean.TRUE.equals(available)) {
            return ResponseEntity.ok(ApiResponse.ok("Available food items fetched", foodItemService.getAvailable()));
        }

        return ResponseEntity.ok(ApiResponse.ok("Food items fetched", foodItemService.getAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<FoodItemResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok("Food item fetched", foodItemService.getById(id)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<FoodItemResponse>> create(@Valid @RequestBody FoodItemRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Food item created", foodItemService.create(request)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<FoodItemResponse>> update(@PathVariable Long id,
                                                                @Valid @RequestBody FoodItemRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Food item updated", foodItemService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Object>> delete(@PathVariable Long id) {
        foodItemService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Food item deleted", null));
    }
}
