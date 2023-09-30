package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminClubRequest;
import com.honeyprojects.core.admin.model.response.AdminClubResponse;
import com.honeyprojects.repository.ClubRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdClubRepository extends ClubRepository {
    @Query(value = """
            SELECT ROW_NUMBER() OVER(ORDER BY g.created_date DESC) AS stt, g.id, g.code, g.name, g.last_modified_date
            FROM club g
             WHERE ( ( :#{#request.search} IS NULL
                      OR :#{#request.search} LIKE '' 
                     OR g.code LIKE %:#{#request.search}% )
            OR ( :#{#request.search} IS NULL
                    OR :#{#request.search} LIKE '' 
                    OR g.name LIKE %:#{#request.search}% ) )
            AND g.status = 0
            """, countQuery = """
            SELECT ROW_NUMBER() OVER(ORDER BY g.created_date DESC) AS stt, g.id, g.code, g.name, g.last_modified_date
            FROM club g
             WHERE ( ( :#{#request.search} IS NULL
                      OR :#{#request.search} LIKE '' 
                     OR g.code LIKE %:#{#request.search}% )
            OR ( :#{#request.search} IS NULL
                    OR :#{#request.search} LIKE '' 
                    OR g.name LIKE %:#{#request.search}% ) )
            AND g.status = 0
            """, nativeQuery = true)
    Page<AdminClubResponse> getAllClubByAdmin(Pageable pageable, @Param("request") AdminClubRequest request);


    @Query(value = """
            SELECT g.id, g.name, g.code, g.last_modified_date FROM club g
            ORDER BY g.last_modified_date DESC
            """, nativeQuery = true)
    List<AdminClubResponse> getAllListResponse();
}
