package com.tasklion.backend.features.tasklionAccount.service;

import com.tasklion.backend.features.tasklionAccount.TasklionAccountRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TasklionAccountUserDetails implements UserDetailsService {

    private final TasklionAccountRepo tasklionAccountRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return tasklionAccountRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Account not found"));
    }

}
