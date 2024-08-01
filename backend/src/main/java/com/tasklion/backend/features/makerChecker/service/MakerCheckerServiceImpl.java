package com.tasklion.backend.features.makerChecker.service;

import com.querydsl.core.BooleanBuilder;
import com.tasklion.backend.features.makerChecker.GetMakerCheckerRequestModel;
import com.tasklion.backend.features.makerChecker.MakerChecker;
import com.tasklion.backend.features.makerChecker.MakerCheckerRepo;
import com.tasklion.backend.features.makerChecker.QMakerChecker;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MakerCheckerServiceImpl implements MakerCheckerService {

    private final MakerCheckerRepo makerCheckerRepo;

    @Override
    public List<MakerChecker> getMakerCheckers(GetMakerCheckerRequestModel getMakerCheckerRequestModel) {
        return (List<MakerChecker>) makerCheckerRepo.findAll(getMakerCheckerBooleanBuilder(getMakerCheckerRequestModel));
    }

    private BooleanBuilder getMakerCheckerBooleanBuilder(GetMakerCheckerRequestModel getMakerCheckerRequestModel) {
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if (getMakerCheckerRequestModel.getId() != null) {
            booleanBuilder.and(QMakerChecker.makerChecker.id.eq(getMakerCheckerRequestModel.getId()));
        }
        if (getMakerCheckerRequestModel.getMakerId() != null) {
            booleanBuilder.and(QMakerChecker.makerChecker.makerId.eq(getMakerCheckerRequestModel.getMakerId()));
        }
        if (getMakerCheckerRequestModel.getCheckerId() != null) {
            booleanBuilder.and(QMakerChecker.makerChecker.checkerId.eq(getMakerCheckerRequestModel.getCheckerId()));
        }
        if (getMakerCheckerRequestModel.getStatus() != null) {
            booleanBuilder.and(QMakerChecker.makerChecker.status.eq(getMakerCheckerRequestModel.getStatus()));
        }
        return booleanBuilder;
    }

}
