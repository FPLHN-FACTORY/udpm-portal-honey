package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminGiftRequest;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.core.admin.model.response.CensorGiftSelectResponse;
import com.honeyprojects.core.president.model.response.PresidentExportGiftResponse;
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
            SELECT ROW_NUMBER() OVER(ORDER BY g.created_date DESC) AS stt, 
            g.id, g.code, g.name, g.note, g.quantity, g.status, g.type, g.from_date, g.to_date, g.limit_quantity, 
            g.transaction_gift ,g.last_modified_date, g.image, g.expiry,
             g.score, g.score_ratio, g.score_ratio_min, g.score_ratio_max
            FROM gift g LEFT JOIN gift_detail gd ON gd.gift_id = g.id
             WHERE (status =0 or status = 1) 
             AND ( ( :#{#request.categoryId} IS NULL 
             OR :#{#request.categoryId} LIKE ''
             OR :#{#request.categoryId} = gd.category_id)) AND 
             ( ( :#{#request.search} IS NULL
                      OR :#{#request.search} LIKE '' 
                     OR g.code LIKE %:#{#request.search}% )
            OR ( :#{#request.search} IS NULL
                    OR :#{#request.search} LIKE '' 
                    OR g.name LIKE %:#{#request.search}% ) ) 
            GROUP BY g.id
            """, countQuery = """
            SELECT count(g.id)
            FROM gift g LEFT JOIN gift_detail gd ON gd.gift_id = g.id
             WHERE (status =0 or status = 1 ) AND ( ( :#{#request.categoryId} IS NULL 
             OR :#{#request.categoryId} LIKE '' 
             OR :#{#request.categoryId} = gd.category_id)) AND
              ( ( :#{#request.search} IS NULL
                      OR :#{#request.search} LIKE '' 
                     OR g.code LIKE %:#{#request.search}% )
            OR ( :#{#request.search} IS NULL
                    OR :#{#request.search} LIKE '' 
                    OR g.name LIKE %:#{#request.search}% ) ) 
            GROUP BY g.id
            """, nativeQuery = true)
    Page<AdminGiftResponse> getAllGiftByAdmin(Pageable pageable, @Param("request") AdminGiftRequest request);

    @Query(value = """
            SELECT g.id, g.name, g.code, g.quantity, g.status, g.type, g.transaction_gift, 
            g.from_date, g.to_date, g.note, g.last_modified_date,g.limit_quantity, g.image, g.expiry , 
             g.score, g.score_ratio, g.score_ratio_min, g.score_ratio_max
            FROM gift g WHERE (status =0 OR status = 1) 
            ORDER BY g.last_modified_date DESC
            """, nativeQuery = true)
    List<AdminGiftResponse> getAllListResponse();

    @Query(value = """
            SELECT g.id, g.name, g.code, g.quantity, g.status, g.type, g.transaction_gift, 
            g.from_date, g.to_date, g.note, g.last_modified_date,g.limit_quantity, g.image, g.expiry , 
             g.score, g.score_ratio, g.score_ratio_min, g.score_ratio_max
            FROM gift g WHERE g.type = 1
            ORDER BY g.last_modified_date DESC
            """, nativeQuery = true)
    List<AdminGiftResponse> getAllListGiftUpgrade();

    @Query(value = """
             SELECT g.id, g.name FROM gift g where g.status in (0,1) ORDER BY g.last_modified_date DESC
            """, nativeQuery = true )
    List<CensorGiftSelectResponse> getAllGiftExist();

    List<Gift> findAllByIdIn(List<String> ids);

    @Query(value = """
            SELECT g.name, g.status from gift g
            where g.status <> 2
            """, nativeQuery = true)
    List<PresidentExportGiftResponse> getGiftToExport();

    @Query(value = """
            SELECT * from gift
            where status <> 2
            and name = :name 
            and id <> :id
            """, nativeQuery = true)
    Gift getNameExists(String name, String id );
}
