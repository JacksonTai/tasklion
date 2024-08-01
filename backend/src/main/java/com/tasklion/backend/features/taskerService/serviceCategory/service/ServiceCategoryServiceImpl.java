package com.tasklion.backend.features.taskerService.serviceCategory.service;

import com.tasklion.backend.features.taskerService.serviceCategory.ServiceCategory;
import com.tasklion.backend.features.taskerService.serviceCategory.ServiceCategoryRepo;
import com.tasklion.backend.features.taskerService.serviceCategory.model.ServiceCategoryModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ServiceCategoryServiceImpl implements ServiceCategoryService {

    private final ServiceCategoryRepo serviceCategoryRepo;

    @Override
    public List<String> getTaskerServiceCategories(String searchKey) {
        if (searchKey == null) {
            return serviceCategoryRepo.findAll().stream().map(ServiceCategory::getName).toList();
        }
        return serviceCategoryRepo.findDistinctByNameContainingIgnoreCase(searchKey)
                        .stream().map(ServiceCategory::getName).toList();
    }

    @Override
    public ServiceCategory saveServiceCategory(ServiceCategoryModel serviceCategoryModel) {
        return serviceCategoryRepo.findByNameIgnoreCase(serviceCategoryModel.getName())
                .orElseGet(() -> serviceCategoryRepo.save(ServiceCategory.builder()
                        .name(serviceCategoryModel.getName())
                        .build()));
    }

}
