package com.tasklion.backend.features.tasklionAccount;

import com.tasklion.backend.common.constant.ApiEndpoint;
import com.tasklion.backend.common.model.KeyValueModel;
import com.tasklion.backend.common.model.api.SuccessResponseModel;
import com.tasklion.backend.features.tasklionAccount.model.ChangePasswordRequestModel;
import com.tasklion.backend.features.tasklionAccount.model.TasklionAccountDetailsModel;
import com.tasklion.backend.features.tasklionAccount.service.TasklionAccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-url}/${api.version}" + ApiEndpoint.TASKLION_ACCOUNT)
public class TasklionAccountController {

    private final TasklionAccountService tasklionAccountService;

    @PostMapping(ApiEndpoint.IS_EXISTS)
    public ResponseEntity<SuccessResponseModel<Boolean>> isTasklionAccountExists(@RequestBody KeyValueModel<String> keyValueModel) {
        log.info("POST [{}] - isTasklionAccountExists({})", ApiEndpoint.TASKLION_ACCOUNT + ApiEndpoint.IS_EXISTS , keyValueModel);
        return ResponseEntity.ok(SuccessResponseModel.<Boolean>builder()
                .data(tasklionAccountService.isExists(keyValueModel))
                .build());
    }

    @GetMapping("/{username}")
    public ResponseEntity<SuccessResponseModel<TasklionAccountDetailsModel>> getTasklionAccount(@PathVariable String username) {
        log.info("GET [{}] - getTasklionAccount()" , ApiEndpoint.TASKLION_ACCOUNT + ApiEndpoint.USER + "/" + username);
        return ResponseEntity.ok(SuccessResponseModel.<TasklionAccountDetailsModel>builder()
                .data(tasklionAccountService.getTasklionAccountDetail(username))
                .build());
    }

    @PutMapping("/{username}")
    public ResponseEntity<SuccessResponseModel<TasklionAccountDetailsModel>> updateTasklionAccount(
            @PathVariable String username, @RequestBody TasklionAccountDetailsModel tasklionAccountDetailsModel) {
        log.info("PUT [{}] - updateTasklionAccount({})", ApiEndpoint.TASKLION_ACCOUNT + ApiEndpoint.USER + "/" +
                username, tasklionAccountDetailsModel);
        return ResponseEntity.ok(SuccessResponseModel.<TasklionAccountDetailsModel>builder()
                .data(tasklionAccountService.updateTasklionAccountDetail(username, tasklionAccountDetailsModel))
                .build());
    }

    @PutMapping("/{username}" + ApiEndpoint.STATUS)
    public ResponseEntity<SuccessResponseModel<Void>> updateTasklionAccountStatus(
            @PathVariable String username, @RequestBody String status) {
        log.info("PUT [{}] - updateTasklionAccountStatus({})", ApiEndpoint.TASKLION_ACCOUNT + ApiEndpoint.USER + "/" +
                username + ApiEndpoint.STATUS, status);
        tasklionAccountService.updateTasklionAccountStatus(username, status);
        return ResponseEntity.ok(SuccessResponseModel.<Void>builder()
                 .build());
    }

    @PostMapping(ApiEndpoint.CHANGE_PASSWORD + "/{username}")
    public ResponseEntity<SuccessResponseModel<Boolean>> changePassword(
            @PathVariable String username, @RequestBody ChangePasswordRequestModel changePasswordRequestModel) {
        log.info("POST [{}] - changePassword({})", ApiEndpoint.TASKLION_ACCOUNT + ApiEndpoint.CHANGE_PASSWORD + "/" +
                username, changePasswordRequestModel);
        return ResponseEntity.ok(SuccessResponseModel.<Boolean>builder()
                .data(tasklionAccountService.changePassword(username, changePasswordRequestModel))
                .build());
    }
}
