package com.foodapp.backend.service;

import com.foodapp.backend.dto.category.CategoryRequest;
import com.foodapp.backend.dto.category.CategoryResponse;
import java.util.List;

public interface CategoryService {
    CategoryResponse create(CategoryRequest request);

    CategoryResponse update(Long id, CategoryRequest request);

    CategoryResponse getById(Long id);

    List<CategoryResponse> getAll();

    void delete(Long id);
}
