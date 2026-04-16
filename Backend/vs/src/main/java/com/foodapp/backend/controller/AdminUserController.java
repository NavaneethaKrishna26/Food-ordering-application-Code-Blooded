package com.foodapp.backend.controller;

import com.foodapp.backend.dto.common.ApiResponse;
import com.foodapp.backend.dto.user.AdminUserResponse;
import com.foodapp.backend.entity.Role;
import com.foodapp.backend.entity.User;
import com.foodapp.backend.exception.ResourceNotFoundException;
import com.foodapp.backend.repository.OrderRepository;
import com.foodapp.backend.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<AdminUserResponse>>> getAll() {
        List<AdminUserResponse> users = userRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
        return ResponseEntity.ok(ApiResponse.ok("Users fetched", users));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<AdminUserResponse>> getById(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return ResponseEntity.ok(ApiResponse.ok("User fetched", toResponse(user)));
    }

    private AdminUserResponse toResponse(User user) {
        long totalOrders = orderRepository.findByUserIdOrderByPlacedAtDesc(user.getId()).size();
        String role = user.getRole() == Role.ROLE_ADMIN ? "ADMIN" : "CUSTOMER";
        return new AdminUserResponse(user.getId(), user.getFullName(), user.getEmail(), user.getPhone(), role, totalOrders, user.getCreatedAt());
    }
}
