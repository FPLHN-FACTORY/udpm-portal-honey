package com.honeyprojects.core.teacher.repository;

import com.honeyprojects.core.admin.model.response.AdminConversionResponse;
import com.honeyprojects.repository.ConversionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherShowConvertionRepository extends ConversionRepository {

    @Query(value = """
            SELECT c.id, c.code, c.ratio,c.gift_id,c.category_id, c.last_modified_date FROM conversion c
            WHERE c.category_id = :categoryId
            ORDER BY c.last_modified_date DESC
            """, nativeQuery = true)
    Page<AdminConversionResponse> getPageListResponse(Pageable pageable, @Param("categoryId") String categoryId);

}
