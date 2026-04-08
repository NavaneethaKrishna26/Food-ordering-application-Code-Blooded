package com.foodapp.backend.service;

import com.foodapp.backend.dto.restaurant.RestaurantRequest;
import com.foodapp.backend.dto.restaurant.RestaurantResponse;
import java.util.List;

public interface RestaurantService {
    List<RestaurantResponse> getAllPublic();

    RestaurantResponse getById(Long id);

    RestaurantResponse create(RestaurantRequest request);

    RestaurantResponse update(Long id, RestaurantRequest request);

    void delete(Long id);
}
