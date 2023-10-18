package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminSearchSemesterRequest;
import com.honeyprojects.core.admin.model.response.AdminSemesterResponse;
import com.honeyprojects.repository.SemesterRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdSemesterRepository extends SemesterRepository {

    @Query(value = """
            SELECT s.id, s.name, s.code, s.last_modified_date, s.to_date, s.from_date FROM semester s
            ORDER BY s.last_modified_date DESC
            """, nativeQuery = true
    )
    List<AdminSemesterResponse> getAllListSemester();

    @Query(value = """
            SELECT ROW_NUMBER() OVER(ORDER BY s.created_date DESC) AS stt, s.id , s.code, s.name, s.last_modified_date, s.to_date, s.from_date
            FROM semester s
             WHERE ( ( :#{#request.search} IS NULL
                      OR :#{#request.search} LIKE '' 
                     OR s.code LIKE %:#{#request.search}% )
            OR ( :#{#request.search} IS NULL
                    OR :#{#request.search} LIKE '' 
                    OR s.name LIKE %:#{#request.search}% ) )
                    AND s.deleted = false
            """, countQuery = """
            SELECT ROW_NUMBER() OVER(ORDER BY s.created_date DESC) AS stt, s.id, s.code, s.name, s.last_modified_date, s.to_date, s.from_date
            FROM semester s
             WHERE ( ( :#{#request.search} IS NULL
                      OR :#{#request.search} LIKE '' 
                     OR s.code LIKE %:#{#request.search}% )
            OR ( :#{#request.search} IS NULL
                    OR :#{#request.search} LIKE '' 
                    OR s.name LIKE %:#{#request.search}% ) )
                    AND s.deleted = false
            """, nativeQuery = true
    )
    Page<AdminSemesterResponse> getAllSemesterByAdmin(Pageable pageable, @Param("request") AdminSearchSemesterRequest request);

    @Query(value = "SELECT s.id FROM semester s WHERE :dateNow BETWEEN s.from_date AND s.to_date", nativeQuery = true)
    String getUsByStudent(@Param("dateNow") Long dateNow);


}
