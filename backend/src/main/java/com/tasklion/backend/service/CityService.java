package com.tasklion.backend.service;

import com.tasklion.backend.domain.entity.City;

import java.util.List;
import java.util.Map;

public interface CityService {

    List<City> findAllCity();

    Map<String, List<String>> getCitiesByState();

}
