package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminCategoryRequest;
import com.honeyprojects.core.admin.model.request.AdminGiftRequest;
import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.repository.GiftRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdGiftRepository extends GiftRepository {

    @Query(value = """
            SELECT ROW_NUMBER() OVER(ORDER BY g.created_date DESC) AS stt, g.id, g.code, g.name, g.last_modified_date
            FROM gift g
             WHERE ( ( :#{#request.search} IS NULL
                      OR :#{#request.search} LIKE '' 
                     OR g.code LIKE %:#{#request.search}% )
            OR ( :#{#request.search} IS NULL
                    OR :#{#request.search} LIKE '' 
                    OR g.name LIKE %:#{#request.search}% ) )
            AND g.status = 0
            """, countQuery = """
            SELECT ROW_NUMBER() OVER(ORDER BY g.created_date DESC) AS stt, g.id, g.code, g.name, g.last_modified_date
            FROM gift g
             WHERE ( ( :#{#request.search} IS NULL
                      OR :#{#request.search} LIKE '' 
                     OR g.code LIKE %:#{#request.search}% )
            OR ( :#{#request.search} IS NULL
                    OR :#{#request.search} LIKE '' 
                    OR g.name LIKE %:#{#request.search}% ) )
            AND g.status = 0
            """, nativeQuery = true)
    Page<AdminGiftResponse> getAllGiftByAdmin(Pageable pageable, @Param("request") AdminGiftRequest request);


    @Query(value = """
            SELECT g.id, g.name, g.code, g.last_modified_date FROM gift g
            ORDER BY g.last_modified_date DESC
            """, nativeQuery = true)
    List<AdminGiftResponse> getAllListResponse();


}
