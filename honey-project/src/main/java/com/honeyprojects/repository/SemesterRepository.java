package com.honeyprojects.repository;

import com.honeyprojects.entity.Semester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(SemesterRepository.NAME)
public interface SemesterRepository extends JpaRepository<Semester, String> {
    public static final String NAME = "BaseSemesterRepository";
}
