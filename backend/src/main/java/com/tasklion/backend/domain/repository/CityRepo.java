package com.tasklion.backend.domain.repository;

import com.tasklion.backend.domain.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepo extends JpaRepository<City, Long> {
}
