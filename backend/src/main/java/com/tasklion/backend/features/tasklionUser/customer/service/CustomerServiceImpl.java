package com.tasklion.backend.features.tasklionUser.customer.service;

import com.querydsl.core.BooleanBuilder;
import com.tasklion.backend.common.constant.TasklionUserRole;
import com.tasklion.backend.common.exception.ResourceNotFoundException;
import com.tasklion.backend.common.model.PaginationModel;
import com.tasklion.backend.common.util.PageUtil;
import com.tasklion.backend.features.auth.model.AuthResponseModel;
import com.tasklion.backend.features.personalDetail.PersonalDetail;
import com.tasklion.backend.features.personalDetail.PersonalDetailMapper;
import com.tasklion.backend.features.personalDetail.PersonalDetailModel;
import com.tasklion.backend.features.personalDetail.PersonalDetailRepo;
import com.tasklion.backend.features.tasklionAccount.TasklionAccount;
import com.tasklion.backend.features.tasklionAccount.TasklionAccountMapper;
import com.tasklion.backend.features.tasklionAccount.constant.TasklionAccountStatus;
import com.tasklion.backend.features.tasklionAccount.model.TasklionAccountModel;
import com.tasklion.backend.features.tasklionAccount.service.TasklionAccountService;
import com.tasklion.backend.features.tasklionUser.customer.*;
import com.tasklion.backend.security.jwt.service.JwtService;
import com.tasklion.backend.security.token.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final JwtService jwtService;
    private final TasklionAccountService tasklionAccountService;
    private final TokenService tokenService;

    private final PersonalDetailRepo personalDetailRepo;
    private final CustomerRepo customerRepo;

    private final CustomerMapper customerMapper;
    private final PersonalDetailMapper personalDetailMapper;
    private final TasklionAccountMapper tasklionAccountMapper;

    @Override
    public Page<CustomerModel> getCustomers(PaginationModel paginationModel) {
        return customerRepo.findAll(PageUtil.getPageable(paginationModel))
                .map(customer -> {
                    CustomerModel customerModel = customerMapper.toModel(customer);
                    PersonalDetailModel personalDetailModel = personalDetailRepo.findByTasklionAccountUsername(customer.getTasklionAccount().getUsername())
                            .map(personalDetailMapper::toModel)
                            .orElse(null);
                    customerModel.setPersonalDetail(personalDetailModel);
                    return customerModel;
                });
    }

    @Override
    public CustomerModel getCustomer(String username) {
        QCustomer qCustomer = QCustomer.customer;
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(qCustomer.tasklionAccount.username.eq(username));
        booleanBuilder.and(qCustomer.tasklionAccount.status.eq(TasklionAccountStatus.ACTIVE.name()));
        Customer customer = customerRepo.findOne(booleanBuilder)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        CustomerModel customerModel = customerMapper.toModel(customer);
        PersonalDetailModel personalDetailModel = personalDetailRepo.findByTasklionAccountUsername(username)
                .map(personalDetailMapper::toModel)
                .orElseThrow(() -> new ResourceNotFoundException("Personal Detail not found"));
        customerModel.setPersonalDetail(personalDetailModel);
        return customerModel;
    }

    @Override
    public long getCustomerCount() {
        QCustomer qCustomer = QCustomer.customer;
        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(qCustomer.tasklionAccount.status.eq(TasklionAccountStatus.ACTIVE.name()));
        return customerRepo.count(booleanBuilder);
    }

    @Override
    public AuthResponseModel registerCustomer(CustomerModel customerModel) {
        TasklionAccount savedTasklionAccount = saveCustomer(customerModel).getTasklionAccount();
        String accessToken = jwtService.generateJwt(savedTasklionAccount);
        String refreshToken = jwtService.generateRefreshToken(savedTasklionAccount);
        tokenService.saveToken(accessToken, savedTasklionAccount);
        tokenService.saveToken(refreshToken, savedTasklionAccount);
        return AuthResponseModel.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public Customer saveCustomer(CustomerModel customerModel) {
        Customer customer = customerMapper.toEntity(customerModel);

        TasklionAccount tasklionAccount = customer.getTasklionAccount();
        TasklionAccount savedTasklionAccount = tasklionAccountService.saveTasklionAccount(
                tasklionAccount, TasklionUserRole.CUSTOMER);

        TasklionAccountModel tasklionAccountModel = tasklionAccountMapper.toModel(savedTasklionAccount);
        customerModel.getPersonalDetail().setTasklionAccount(tasklionAccountModel);
        PersonalDetail personalDetail = PersonalDetailMapper.INSTANCE.toEntity(customerModel.getPersonalDetail());

        personalDetailRepo.save(personalDetail);
        return customerRepo.save(customer);
    }

}
