package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminCategoryRequest;
import com.honeyprojects.core.admin.model.request.AdminGiftRequest;
import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.core.admin.model.response.CensorGiftSelectResponse;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.repository.GiftRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdGiftRepository extends GiftRepository {

    @Query(value = """
            SELECT ROW_NUMBER() OVER(ORDER BY g.created_date DESC) AS stt, g.id, g.code, g.name,g.note,g.quantity,g.status,g.type,g.from_date, g.to_date, g.semester_id,g.limit_quantity, 
            g.last_modified_date, g.image
            FROM gift g
             WHERE (status =0 or status = 1) AND 
             ( ( :#{#request.search} IS NULL
                      OR :#{#request.search} LIKE '' 
                     OR g.code LIKE %:#{#request.search}% )
            OR ( :#{#request.search} IS NULL
                    OR :#{#request.search} LIKE '' 
                    OR g.name LIKE %:#{#request.search}% ) )
            """, countQuery = """
            SELECT ROW_NUMBER() OVER(ORDER BY g.created_date DESC) AS stt, g.id, g.code, g.name,g.quantity,g.status,g.type, g.last_modified_date,g.limit_quantity, g.image, g.type,g.note,g.from_date, g.to_date, g.semester_id
            FROM gift g
             WHERE (status =0 or status = 1 ) AND 
              ( ( :#{#request.search} IS NULL
                      OR :#{#request.search} LIKE '' 
                     OR g.code LIKE %:#{#request.search}% )
            OR ( :#{#request.search} IS NULL
                    OR :#{#request.search} LIKE '' 
                    OR g.name LIKE %:#{#request.search}% ) )
            """, nativeQuery = true)
    Page<AdminGiftResponse> getAllGiftByAdmin(Pageable pageable, @Param("request") AdminGiftRequest request);

    @Query(value = """
            SELECT g.id, g.name, g.code,g.quantity,g.status,g.type, g.from_date, g.to_date, g.semester_id,g.note, g.last_modified_date,g.limit_quantity, g.image FROM gift g where (status =0 or status = 1) 
            ORDER BY g.last_modified_date DESC
            """, nativeQuery = true)
    List<AdminGiftResponse> getAllListResponse();

    @Query(value = """
            SELECT g.name FROM gift g where (g.status = 0 or g.status = 1) 
            ORDER BY g.last_modified_date DESC
            """, nativeQuery = true )
    List<String> getAllNameByStatus();

    @Query(value = """
             SELECT g.id, g.name FROM gift g where g.status in (0,1) ORDER BY g.last_modified_date DESC
            """, nativeQuery = true )
    List<CensorGiftSelectResponse> getAllGiftExist();

    @Query(value = """
              SELECT g.id, g.name FROM gift g LEFT JOIN upgrade_rate_gift u ON g.id = u.id_gift WHERE u.id_upgrade_rate = :id AND g.status in (0,1) ORDER BY g.last_modified_date DESC
            """, nativeQuery = true )
    List<CensorGiftSelectResponse> getGiftsExistByUpgradeRateGiftId(@Param("id") String id);
}
