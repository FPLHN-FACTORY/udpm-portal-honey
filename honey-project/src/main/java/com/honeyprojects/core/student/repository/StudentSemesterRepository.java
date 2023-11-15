package com.honeyprojects.core.student.repository;

import com.honeyprojects.entity.Semester;
import com.honeyprojects.infrastructure.contant.SemesterStatus;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.repository.SemesterRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentSemesterRepository extends SemesterRepository {
    Optional<Semester> findByStatus(SemesterStatus status);
}
