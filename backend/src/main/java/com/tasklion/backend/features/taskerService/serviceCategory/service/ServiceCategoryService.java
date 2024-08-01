package com.tasklion.backend.features.taskerService.serviceCategory.service;

import com.tasklion.backend.features.taskerService.serviceCategory.ServiceCategory;
import com.tasklion.backend.features.taskerService.serviceCategory.model.ServiceCategoryModel;

import java.util.List;

public interface ServiceCategoryService {

    List<String> getTaskerServiceCategories(String searchKey);

    ServiceCategory saveServiceCategory(ServiceCategoryModel serviceCategoryModel);

}
