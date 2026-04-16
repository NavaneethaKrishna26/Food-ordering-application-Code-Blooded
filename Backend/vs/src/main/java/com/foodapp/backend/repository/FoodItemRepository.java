package com.foodapp.backend.repository;

import com.foodapp.backend.entity.FoodItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
    List<FoodItem> findByCategoryId(Long categoryId);

    List<FoodItem> findByAvailableTrue();
}
