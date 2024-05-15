package com.tasklion.backend.domain.repository;

import com.tasklion.backend.domain.entity.PersonalDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonalDetailRepo extends JpaRepository<PersonalDetail, Long> {

    boolean existsByFullNameContainingIgnoreCase(String fullName);

    boolean existsByPhoneNumber(String phoneNumber);

}
