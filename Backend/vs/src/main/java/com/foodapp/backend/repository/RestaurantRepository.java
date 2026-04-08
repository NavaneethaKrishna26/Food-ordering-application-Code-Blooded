package com.foodapp.backend.repository;

import com.foodapp.backend.entity.Restaurant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByIsActiveTrue();
}
