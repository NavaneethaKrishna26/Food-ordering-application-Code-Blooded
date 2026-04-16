package com.foodapp.backend.service.impl;

import com.foodapp.backend.dto.restaurant.RestaurantRequest;
import com.foodapp.backend.dto.restaurant.RestaurantResponse;
import com.foodapp.backend.entity.Restaurant;
import com.foodapp.backend.exception.ResourceNotFoundException;
import com.foodapp.backend.repository.RestaurantRepository;
import com.foodapp.backend.service.RestaurantService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;

    @Override
    public List<RestaurantResponse> getAllPublic() {
        return restaurantRepository.findByIsActiveTrue().stream().map(this::toResponse).toList();
    }

    @Override
    public RestaurantResponse getById(Long id) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));
        return toResponse(restaurant);
    }

    @Override
    @Transactional
    public RestaurantResponse create(RestaurantRequest request) {
        Restaurant restaurant = Restaurant.builder()
                .name(request.name())
                .description(request.description())
                .address(request.address())
                .phone(request.phone())
                .imageUrl(request.imageUrl())
                .isActive(request.isActive() == null ? Boolean.TRUE : request.isActive())
                .build();
        return toResponse(restaurantRepository.save(restaurant));
    }

    @Override
    @Transactional
    public RestaurantResponse update(Long id, RestaurantRequest request) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found with id: " + id));

        if (request.name() != null) {
            restaurant.setName(request.name());
        }
        if (request.description() != null) {
            restaurant.setDescription(request.description());
        }
        if (request.address() != null) {
            restaurant.setAddress(request.address());
        }
        if (request.phone() != null) {
            restaurant.setPhone(request.phone());
        }
        if (request.imageUrl() != null) {
            restaurant.setImageUrl(request.imageUrl());
        }
        if (request.isActive() != null) {
            restaurant.setIsActive(request.isActive());
        }

        return toResponse(restaurantRepository.save(restaurant));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!restaurantRepository.existsById(id)) {
            throw new ResourceNotFoundException("Restaurant not found with id: " + id);
        }
        restaurantRepository.deleteById(id);
    }

    private RestaurantResponse toResponse(Restaurant restaurant) {
        return new RestaurantResponse(
                restaurant.getId(),
                restaurant.getName(),
                restaurant.getDescription(),
                restaurant.getAddress(),
                restaurant.getPhone(),
                restaurant.getImageUrl(),
                restaurant.getIsActive(),
                restaurant.getRating(),
                restaurant.getCreatedAt()
        );
    }
}
