package com.honeyprojects.core.student.repository;

import com.honeyprojects.entity.Verification;
import com.honeyprojects.repository.VerificationRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentVericationRepository extends VerificationRepository {

    Optional<Verification> findByStudentId(String StudentId);
}
