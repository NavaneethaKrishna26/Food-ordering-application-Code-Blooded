package com.foodapp.backend.service.impl;

import com.foodapp.backend.dto.food.FoodItemRequest;
import com.foodapp.backend.dto.food.FoodItemResponse;
import com.foodapp.backend.entity.Category;
import com.foodapp.backend.entity.FoodItem;
import com.foodapp.backend.exception.ResourceNotFoundException;
import com.foodapp.backend.repository.CategoryRepository;
import com.foodapp.backend.repository.FoodItemRepository;
import com.foodapp.backend.service.FoodItemService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FoodItemServiceImpl implements FoodItemService {

    private final FoodItemRepository foodItemRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public FoodItemResponse create(FoodItemRequest request) {
        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.categoryId()));

        FoodItem foodItem = FoodItem.builder()
                .name(request.name())
                .description(request.description())
                .price(request.price())
                .available(request.available())
                .category(category)
                .build();

        return toResponse(foodItemRepository.save(foodItem));
    }

    @Override
    @Transactional
    public FoodItemResponse update(Long id, FoodItemRequest request) {
        FoodItem foodItem = foodItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food item not found with id: " + id));

        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.categoryId()));

        foodItem.setName(request.name());
        foodItem.setDescription(request.description());
        foodItem.setPrice(request.price());
        foodItem.setAvailable(request.available());
        foodItem.setCategory(category);

        return toResponse(foodItemRepository.save(foodItem));
    }

    @Override
    public FoodItemResponse getById(Long id) {
        FoodItem foodItem = foodItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food item not found with id: " + id));
        return toResponse(foodItem);
    }

    @Override
    public List<FoodItemResponse> getAll() {
        return foodItemRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Override
    public List<FoodItemResponse> getAvailable() {
        return foodItemRepository.findByAvailableTrue().stream().map(this::toResponse).toList();
    }

    @Override
    public List<FoodItemResponse> getByCategory(Long categoryId) {
        return foodItemRepository.findByCategoryId(categoryId).stream().map(this::toResponse).toList();
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!foodItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Food item not found with id: " + id);
        }
        foodItemRepository.deleteById(id);
    }

    private FoodItemResponse toResponse(FoodItem foodItem) {
        return new FoodItemResponse(
                foodItem.getId(),
                foodItem.getName(),
                foodItem.getDescription(),
                foodItem.getPrice(),
                foodItem.isAvailable(),
                foodItem.getCategory().getId(),
                foodItem.getCategory().getName()
        );
    }
}
