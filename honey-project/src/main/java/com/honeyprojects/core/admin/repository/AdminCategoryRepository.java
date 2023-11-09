package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminCategoryRequest;
import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.repository.CategoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminCategoryRepository extends CategoryRepository {
    @Query(value = """
            SELECT c.id, c.name, c.code, c.last_modified_date FROM category c JOIN articles a on c.id = a.category_id
            WHERE a.category_status = 0
            GROUP BY c.id, c.name, c.code, c.last_modified_date
            ORDER BY c.last_modified_date DESC
            """, nativeQuery = true)
    List<AdminCategoryResponse> getAllCategory();

    @Query(value = """
            SELECT ROW_NUMBER() OVER(ORDER BY ca.created_date DESC) AS stt, ca.id, ca.code, ca.name, ca.last_modified_date,ca.image,
                ca.category_status, ca.transaction_rights 
                FROM category ca
                    WHERE ( ( :#{#request.search} IS NULL
                              OR :#{#request.search} LIKE '' 
                             OR ca.code LIKE %:#{#request.search}% )
                    OR ( :#{#request.search} IS NULL
                            OR :#{#request.search} LIKE '' 
                            OR ca.name LIKE %:#{#request.search}% ) ) 
                    AND ( :#{#request.status} IS NULL
                        OR :#{#request.status} LIKE ''
                        OR  ca.category_status LIKE %:#{#request.status}%
                        )
                    AND ( :#{#request.transactionRights} IS NULL
                        OR :#{#request.transactionRights} LIKE ''
                        OR  ca.transaction_rights LIKE %:#{#request.transactionRights}%
                        )
                    """, countQuery = """
            SELECT ROW_NUMBER() OVER(ORDER BY ca.created_date DESC) AS stt, ca.id, ca.code, ca.name, ca.last_modified_date,ca.image,
                ca.category_status, ca.transaction_rights 
                FROM category ca
                    WHERE ( ( :#{#request.search} IS NULL
                              OR :#{#request.search} LIKE '' 
                             OR ca.code LIKE %:#{#request.search}% )
                    OR ( :#{#request.search} IS NULL
                            OR :#{#request.search} LIKE '' 
                            OR ca.name LIKE %:#{#request.search}% ) ) 
                    AND ( :#{#request.status} IS NULL
                        OR  ca.category_status = :#{#request.status}%
                        )
                    AND ( :#{#request.transactionRights} IS NULL
                        OR  ca.transaction_rights = :#{#request.transactionRights}%
                        )
                    """, nativeQuery = true)
    Page<AdminCategoryResponse> getAllCategoryByAdmin(Pageable pageable, @Param("request") AdminCategoryRequest request);

    @Query(value = """
            SELECT c.id, c.name, c.code, c.last_modified_date ,c.category_status ,c.image, c.transaction_rights  
            FROM category c 
            WHERE c.category_status <> 0
            ORDER BY c.last_modified_date DESC
            """, nativeQuery = true)
    List<AdminCategoryResponse> getAllListCategory();

}
