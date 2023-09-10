package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.response.AdminSemesterResponse;
import com.honeyprojects.repository.SemesterRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdSemesterRepository extends SemesterRepository {

    @Query(value = "SELECT s.id, s.code, s.name FROM honey_project.semester s ORDER BY s.last_modified_date DESC", nativeQuery = true)
    List<AdminSemesterResponse> getAllListSemester();

    @Query(value = "SELECT s.id, s.code, s.name FROM honey_project.semester s ORDER BY s.last_modified_date DESC", nativeQuery = true)
    Page<AdminSemesterResponse> getAllSemesterByAdmin(Pageable pageable);

}
