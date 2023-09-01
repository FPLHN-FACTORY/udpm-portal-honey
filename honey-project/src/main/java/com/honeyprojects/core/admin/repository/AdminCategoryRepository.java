package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminCategoryRequest;
import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.repository.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdminCategoryRepository extends CategoryRepository {
    @Query(value = """
            SELECT c.id, c.name, c.code, c.last_modified_date FROM category c JOIN articles a on c.id = a.category_id
            WHERE a.category_status = 0
            GROUP BY c.id, c.name, c.code, c.last_modified_date
            ORDER BY c.last_modified_date DESC
            """, nativeQuery = true)
    List<AdminCategoryResponse> getAllCategory();

    @Query(value = """
            SELECT ROW_NUMBER() OVER(ORDER BY ca.created_date DESC) AS stt, ca.id, ca.code, ca.name, ca.last_modified_date
            FROM category ca
             WHERE ( ( :#{#request.search} IS NULL
                      OR :#{#request.search} LIKE '' 
                     OR ca.code LIKE %:#{#request.search}% )
            OR ( :#{#request.search} IS NULL
                    OR :#{#request.search} LIKE '' 
                    OR ca.name LIKE %:#{#request.search}% ) )
            AND ca.category_status = 0
            """, countQuery = """
            SELECT ROW_NUMBER() OVER(ORDER BY ca.created_date DESC) AS stt, ca.id, ca.code, ca.name, ca.last_modified_date
            FROM category ca
             WHERE ( ( :#{#request.search} IS NULL
                      OR :#{#request.search} LIKE '' 
                     OR ca.code LIKE %:#{#request.search}% )
            OR ( :#{#request.search} IS NULL
                    OR :#{#request.search} LIKE '' 
                    OR ca.name LIKE %:#{#request.search}% ) )
            AND ca.category_status = 0
            """, nativeQuery = true)
    Page<AdminCategoryResponse> getAllCategoryByAdmin(Pageable pageable, @Param("request") AdminCategoryRequest request);


    @Query(value = """
            SELECT c.id, c.name, c.code, c.last_modified_date FROM category c
            ORDER BY c.last_modified_date DESC
            """, nativeQuery = true)
    List<AdminCategoryResponse> getAllListCategory();
}
