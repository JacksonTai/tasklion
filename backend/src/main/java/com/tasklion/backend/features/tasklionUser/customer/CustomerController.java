package com.tasklion.backend.features.tasklionUser.customer;

import com.tasklion.backend.common.constant.ApiEndpoint;
import com.tasklion.backend.common.model.PaginationModel;
import com.tasklion.backend.common.model.api.SuccessResponseModel;
import com.tasklion.backend.features.auth.model.AuthResponseModel;
import com.tasklion.backend.features.task.model.CustomerTaskModel;
import com.tasklion.backend.features.task.model.TaskRequestModel;
import com.tasklion.backend.features.task.service.TaskService;
import com.tasklion.backend.features.tasklionUser.customer.service.CustomerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}" + ApiEndpoint.CUSTOMER)
public class CustomerController {

    private final CustomerService customerService;
    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<SuccessResponseModel<Page<CustomerModel>>> getCustomers(
            @ModelAttribute PaginationModel paginationModel) {
        log.info("GET [{}] - getCustomers({})", ApiEndpoint.CUSTOMER, paginationModel);
        return ResponseEntity.ok(SuccessResponseModel.<Page<CustomerModel>>builder()
                .data(customerService.getCustomers(paginationModel))
                .build());
    }

    @GetMapping("/{username}")
    public ResponseEntity<SuccessResponseModel<CustomerModel>> getCustomer(@PathVariable String username) {
        log.info("GET [{}] - getCustomer()" , ApiEndpoint.CUSTOMER + "/" + username);
        return ResponseEntity.ok(SuccessResponseModel.<CustomerModel>builder()
                .data(customerService.getCustomer(username))
                .build());
    }

    @GetMapping("/{username}" + ApiEndpoint.TASKS)
    public ResponseEntity<SuccessResponseModel<Page<CustomerTaskModel>>> getTasksByStatus(
            @PathVariable String username, @ModelAttribute TaskRequestModel taskRequestModel) {
        log.info("GET [{}] - getTasksByStatus({})", ApiEndpoint.CUSTOMER + "/" + username + ApiEndpoint.TASKS, taskRequestModel);
        return ResponseEntity.ok(SuccessResponseModel.<Page<CustomerTaskModel>>builder()
                .data(taskService.getCustomerTasks(username, taskRequestModel))
                .build());
    }

    @GetMapping(ApiEndpoint.COUNT)
    public ResponseEntity<SuccessResponseModel<Long>> getCustomerCount() {
        log.info("GET [{}] - getCustomerCount()", ApiEndpoint.CUSTOMER + ApiEndpoint.COUNT);
        return ResponseEntity.ok(SuccessResponseModel.<Long>builder()
                .data(customerService.getCustomerCount())
                .build());
    }

    @PostMapping(ApiEndpoint.REGISTER)
    public ResponseEntity<SuccessResponseModel<AuthResponseModel>> registerCustomer(
            @RequestBody CustomerModel customerModel) {
        log.info("POST [{}] - registerCustomer({})",
                ApiEndpoint.CUSTOMER + ApiEndpoint.REGISTER, customerModel);
        SuccessResponseModel<AuthResponseModel> response = SuccessResponseModel.<AuthResponseModel>builder()
                .data(customerService.registerCustomer(customerModel))
                .httpStatus(HttpStatus.CREATED.value())
                .status(HttpStatus.CREATED.getReasonPhrase())
                .build();
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }

}
