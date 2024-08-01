package com.tasklion.backend.features.taskerService.serviceReview;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceReviewRepo extends JpaRepository<ServiceReview, Long> {

    Page<ServiceReview> findServiceReviewByTaskTaskerServiceId(Long taskerServiceId, Pageable pageable);

}
