package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminClubRequest;
import com.honeyprojects.core.admin.model.request.AdminGiftRequest;
import com.honeyprojects.core.admin.model.response.AdminClubGiftResponse;
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
            SELECT ROW_NUMBER() OVER(ORDER BY g.last_modified_date DESC) AS stt, g.id, g.code, g.name
            FROM club g
             WHERE ( ( :#{#request.search} IS NULL
                      OR :#{#request.search} LIKE '' 
                     OR g.code LIKE %:#{#request.search}% )
            OR ( :#{#request.search} IS NULL
                    OR :#{#request.search} LIKE '' 
                    OR g.name LIKE %:#{#request.search}% ) )
            AND g.status = 0
            """, countQuery = """
            SELECT ROW_NUMBER() OVER(ORDER BY g.last_modified_date DESC) AS stt, g.id, g.code, g.name
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

    @Query(value = """
            SELECT ROW_NUMBER() OVER(ORDER BY g.last_modified_date DESC) AS stt, g.id, g.code, g.name, g.type, g.image, g.status
            FROM gift g LEFT JOIN club_gift cl ON g.id = cl.gift_id
            WHERE ((:#{#request.search} IS NULL
            OR :#{#request.search} LIKE ''
            OR g.code LIKE %:#{#request.search}%)
            OR (:#{#request.search} IS NULL
            OR :#{#request.search} LIKE ''
            OR g.name LIKE %:#{#request.search}% ))
            AND cl.club_id = :#{#request.idClub}
            AND g.type = 1  
            """, countQuery = """
                    SELECT COUNT(g.id)
                    FROM gift g JOIN club_gift cl ON g.id = cl.gift_id
                    WHERE (( :#{#request.search} IS NULL
                    OR :#{#request.search} LIKE ''
                    OR g.code LIKE %:#{#request.search}%)
                    OR (:#{#request.search} IS NULL
                    OR :#{#request.search} LIKE ''
                    OR g.name LIKE %:#{#request.search}%))
                    AND cl.club_id = :#{#request.idClub}
                    AND g.type = 1
                    GROUP BY g.id
            """, nativeQuery = true)
    Page<AdminClubGiftResponse> findGiftInClub(Pageable pageable, @Param("request") AdminGiftRequest request);

    @Query(value = """
            SELECT ROW_NUMBER() OVER(ORDER BY g.last_modified_date DESC) AS stt, g.id, g.code, g.name, g.type, g.image, g.status
            FROM gift g LEFT JOIN club_gift cl ON g.id = cl.gift_id AND cl.club_id = :#{#request.idClub}
            WHERE ((:#{#request.search} IS NULL
            OR :#{#request.search} LIKE ''
            OR g.code LIKE %:#{#request.search}%)
            OR (:#{#request.search} IS NULL
            OR :#{#request.search} LIKE ''
            OR g.name LIKE %:#{#request.search}% ))
            AND cl.gift_id IS NULL
            AND g.type = 1  
            """, countQuery = """
                    SELECT COUNT(g.id)
                    FROM gift g LEFT JOIN club_gift cl ON g.id = cl.gift_id AND cl.club_id = :#{#request.idClub}
                    WHERE (( :#{#request.search} IS NULL
                    OR :#{#request.search} LIKE ''
                    OR g.code LIKE %:#{#request.search}%)
                    OR (:#{#request.search} IS NULL
                    OR :#{#request.search} LIKE ''
                    OR g.name LIKE %:#{#request.search}%))
                    AND cl.gift_id IS NULL
                    AND g.type = 1
                    GROUP BY g.id
            """, nativeQuery = true)
    Page<AdminClubGiftResponse> findGiftNotInClub(Pageable pageable, @Param("request") AdminGiftRequest request);

}
