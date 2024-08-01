package com.tasklion.backend.features.tasklionUser.customer.service;

import com.tasklion.backend.common.model.PaginationModel;
import com.tasklion.backend.features.auth.model.AuthResponseModel;
import com.tasklion.backend.features.tasklionUser.customer.Customer;
import com.tasklion.backend.features.tasklionUser.customer.CustomerModel;
import org.springframework.data.domain.Page;

public interface CustomerService {

    Page<CustomerModel> getCustomers(PaginationModel paginationModel);

    CustomerModel getCustomer(String username);

    Customer saveCustomer(CustomerModel customerModel);

    long getCustomerCount();

    AuthResponseModel registerCustomer(CustomerModel customerModel);

}
