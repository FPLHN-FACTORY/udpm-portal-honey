package com.honeyprojects.repository;

import com.honeyprojects.entity.Verification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(VerificationRepository.NAME)
public interface VerificationRepository extends JpaRepository<Verification, String> {
    public static final String NAME = "BaseVerificationRepository";
}
