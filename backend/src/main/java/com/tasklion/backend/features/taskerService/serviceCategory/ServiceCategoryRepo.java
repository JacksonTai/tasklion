package com.tasklion.backend.features.taskerService.serviceCategory;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ServiceCategoryRepo extends JpaRepository<ServiceCategory, Long> {

     Optional<ServiceCategory> findByNameIgnoreCase(String name);

     List<ServiceCategory> findDistinctByNameContainingIgnoreCase(String searchKey);

}
