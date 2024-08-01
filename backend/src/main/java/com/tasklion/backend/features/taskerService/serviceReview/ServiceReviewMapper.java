package com.tasklion.backend.features.taskerService.serviceReview;

import com.tasklion.backend.common.util.MathUtil;
import com.tasklion.backend.features.taskerService.serviceReview.model.RatingDetailModel;
import com.tasklion.backend.features.taskerService.serviceReview.model.ServiceReviewModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ServiceReviewMapper {

    ServiceReviewMapper INSTANCE = Mappers.getMapper(ServiceReviewMapper.class);

    @Mapping(source = "reviewer.tasklionAccount.username", target = "reviewerUsername")
    @Mapping(target = "task", ignore = true)
    ServiceReviewModel toModel(ServiceReview serviceReview);

    @Named("mapReviews")
    default List<ServiceReviewModel> mapReviews(List<ServiceReview> reviews) {
        return reviews.stream()
                .filter(review -> review.getReviewer() != null)
                .map(review -> ServiceReviewModel.builder()
                        .rating(review.getRating())
                        .comment(review.getComment())
                        .reviewDate(review.getReviewDate())
                        .reviewerUsername(review.getReviewer().getTasklionAccount().getUsername())
                        .build())
                .collect(Collectors.toList());
    }

    @Named("mapRatingDetail")
    default RatingDetailModel mapRatingDetail(List<ServiceReview> reviews) {
        return RatingDetailModel.builder()
                .overallRating(MathUtil.round(reviews.stream()
                        .mapToDouble(ServiceReview::getRating)
                        .average()
                        .orElse(0.0), 1))
                .totalReviews(reviews.size())
                .build();
    }

}
