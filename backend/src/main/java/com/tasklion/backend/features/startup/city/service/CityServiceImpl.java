package com.tasklion.backend.features.startup.city.service;

import com.tasklion.backend.features.startup.city.City;
import com.tasklion.backend.features.startup.city.CityRepo;
import com.tasklion.backend.features.startup.state.State;
import com.tasklion.backend.features.startup.state.service.StateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CityServiceImpl implements CityService {

    private final CityRepo cityRepo;
    private final StateService stateService;

    @Override
    public List<City> findAllCity() {
        return cityRepo.findAll();
    }

    @Override
    public Map<String, List<String>> getCitiesByState() {
        List<State> states = stateService.findAllState();
        Map<String, List<String>> citiesByState = new HashMap<>();
        for (State state : states) {
            List<String> cityNames = state.getCities().stream()
                    .map(City::getName)
                    .collect(Collectors.toList());
            citiesByState.put(state.getName(), cityNames);
        }
        return citiesByState;
    }

}
