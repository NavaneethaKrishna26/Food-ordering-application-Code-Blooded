package com.foodapp.backend.service;

import com.foodapp.backend.dto.food.FoodItemRequest;
import com.foodapp.backend.dto.food.FoodItemResponse;
import java.util.List;

public interface FoodItemService {
    FoodItemResponse create(FoodItemRequest request);

    FoodItemResponse update(Long id, FoodItemRequest request);

    FoodItemResponse getById(Long id);

    List<FoodItemResponse> getAll();

    List<FoodItemResponse> getAvailable();

    List<FoodItemResponse> getByCategory(Long categoryId);

    void delete(Long id);
}
