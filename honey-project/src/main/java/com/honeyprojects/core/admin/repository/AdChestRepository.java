package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminChestRequest;
import com.honeyprojects.core.admin.model.response.AdminChestReponse;
import com.honeyprojects.repository.ChestRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdChestRepository extends ChestRepository {

    @Query(value = """
            SELECT ROW_NUMBER() OVER(ORDER BY c.created_date DESC) AS stt, c.id, c.name AS name
                       FROM chest c
                        WHERE ( ( :#{#request.search} IS NULL
                                 OR :#{#request.search} LIKE ''
                                OR c.name LIKE %:#{#request.search}% ) )
                       """, countQuery = """
            SELECT ROW_NUMBER() OVER(ORDER BY c.created_date DESC) AS stt, c.id, c.name AS name
                       FROM chest c
                        WHERE ( ( :#{#request.search} IS NULL
                                 OR :#{#request.search} LIKE ''
                                OR c.name LIKE %:#{#request.search}% ) )
            """, nativeQuery = true)
    Page<AdminChestReponse> getAllChestByAdmin(Pageable pageable,
                                               @Param("request") AdminChestRequest request);

}
