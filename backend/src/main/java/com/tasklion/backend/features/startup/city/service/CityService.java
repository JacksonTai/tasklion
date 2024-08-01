package com.tasklion.backend.features.startup.city.service;


import com.tasklion.backend.features.startup.city.City;

import java.util.List;
import java.util.Map;

public interface CityService {

    List<City> findAllCity();

    Map<String, List<String>> getCitiesByState();

}
