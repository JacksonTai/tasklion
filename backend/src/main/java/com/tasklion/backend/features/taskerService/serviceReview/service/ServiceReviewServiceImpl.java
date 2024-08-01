package com.tasklion.backend.features.taskerService.serviceReview.service;

import com.tasklion.backend.common.exception.ResourceNotFoundException;
import com.tasklion.backend.common.model.PaginationModel;
import com.tasklion.backend.common.util.PageUtil;
import com.tasklion.backend.features.task.Task;
import com.tasklion.backend.features.task.TaskRepo;
import com.tasklion.backend.features.task.TaskStatus;
import com.tasklion.backend.features.taskerService.TaskerService;
import com.tasklion.backend.features.taskerService.TaskerServiceRepo;
import com.tasklion.backend.features.taskerService.serviceReview.ServiceReview;
import com.tasklion.backend.features.taskerService.serviceReview.ServiceReviewMapper;
import com.tasklion.backend.features.taskerService.serviceReview.ServiceReviewRepo;
import com.tasklion.backend.features.taskerService.serviceReview.model.AddServiceReviewRequestModel;
import com.tasklion.backend.features.taskerService.serviceReview.model.ServiceReviewModel;
import com.tasklion.backend.features.tasklionUser.customer.Customer;
import com.tasklion.backend.features.tasklionUser.customer.CustomerRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@RequiredArgsConstructor
@Service
public class ServiceReviewServiceImpl implements ServiceReviewService {

    private final ServiceReviewRepo serviceReviewRepo;
    private final TaskRepo taskRepo;
    private final CustomerRepo customerRepo;
    private final TaskerServiceRepo taskerServiceRepo;

    @Override
    public Page<ServiceReviewModel> getReviewsByTaskerServiceId(Long taskerServiceId, PaginationModel paginationModel) {
        Pageable pageable = PageUtil.getPageable(paginationModel);
        Page<ServiceReview> serviceReviews = serviceReviewRepo.findServiceReviewByTaskTaskerServiceId(taskerServiceId, pageable);
        return serviceReviews.map(ServiceReviewMapper.INSTANCE::toModel);
    }

    @Override
    public Long createServiceReview(AddServiceReviewRequestModel addServiceReviewRequestModel) {
        Long taskId = addServiceReviewRequestModel.getTaskId();
        Task task = taskRepo.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task with id " + taskId + " not found"));

        String reviewerUsername = addServiceReviewRequestModel.getReviewerUsername();
        Customer customer = customerRepo.findByTasklionAccountUsername(reviewerUsername)
                .orElseThrow(() -> new ResourceNotFoundException("Customer with username " + reviewerUsername + " not found"));

        ServiceReview savedServiceReview = serviceReviewRepo.save(ServiceReview.builder()
                .task(task)
                .reviewer(customer)
                .rating(addServiceReviewRequestModel.getRating())
                .comment(addServiceReviewRequestModel.getComment())
                .reviewDate(LocalDate.now())
                .build());

        TaskerService taskerService = task.getTaskerService();
        taskerService.getReviews().add(savedServiceReview);
        taskerServiceRepo.save(taskerService);

        task.setStatus(TaskStatus.REVIEWED.name());
        taskRepo.save(task);
        return savedServiceReview.getId();
    }

}
