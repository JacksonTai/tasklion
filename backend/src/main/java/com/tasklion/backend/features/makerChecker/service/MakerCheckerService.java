package com.tasklion.backend.features.makerChecker.service;

import com.tasklion.backend.features.makerChecker.GetMakerCheckerRequestModel;
import com.tasklion.backend.features.makerChecker.MakerChecker;

import java.util.List;

public interface MakerCheckerService {

    List<MakerChecker> getMakerCheckers(GetMakerCheckerRequestModel getMakerCheckerRequestModel);

}
