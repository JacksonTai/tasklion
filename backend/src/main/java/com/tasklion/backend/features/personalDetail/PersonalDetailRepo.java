package com.tasklion.backend.features.personalDetail;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonalDetailRepo extends JpaRepository<PersonalDetail, Long> {

    boolean existsByFullNameIgnoreCase(String fullName);

    boolean existsByPhoneNumber(String phoneNumber);

    Optional<PersonalDetail> findByTasklionAccountUsername(String username);

}
