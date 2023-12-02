package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminCreateConversionHistoryRequest;
import com.honeyprojects.core.admin.model.response.AdminRequestConversionHistoryAddItemResponse;
import com.honeyprojects.core.admin.model.response.AdminRequestConversionHistoryResponse;
import com.honeyprojects.repository.HistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdRequestConversionHistoryRepository extends HistoryRepository {
    @Query(value = """
            SELECT hd.gift_id, h.change_date,
            hd.id AS history_detail_id, h.id, hd.name_gift, hd.honey_point, h.last_modified_date, hd.quantity_gift,
            h.created_date, h.status, h.student_id, h.note FROM history h 
            JOIN history_detail hd on hd.history_id = h.id
            LEFT JOIN honey hn on hn.id = hd.honey_id    
            WHERE (:#{#filter.status} IS NULL OR h.status = :#{#filter.status})
            AND (:#{#filter.idStudent} IS NULL OR h.student_id = :#{#filter.idStudent})
            AND h.type IN (2, 4, 6) AND h.status = 0 ORDER BY h.last_modified_date DESC
            """, nativeQuery = true)
    Page<AdminRequestConversionHistoryResponse> getHistory(@Param("filter") AdminCreateConversionHistoryRequest filter,
                                                           Pageable pageable);

    @Query(value = """
            SELECT hd.gift_id, hd.id AS history_detail_id,
            h.id, hd.name_gift, hd.honey_point, h.last_modified_date, hd.quantity_gift, h.change_date,
            h.created_date, h.status, h.student_id, h.note 
            FROM history h 
            JOIN history_detail hd ON hd.history_id = h.id
            LEFT JOIN honey hn ON hn.id = hd.honey_id    
            WHERE (:#{#filter.status} IS NULL OR h.status = :#{#filter.status})
            AND (:#{#filter.idStudent} IS NULL OR h.student_id = :#{#filter.idStudent})
            AND h.type IN (2,4,6) AND h.status IN (1,2) ORDER BY h.last_modified_date DESC
                """, nativeQuery = true)
    Page<AdminRequestConversionHistoryResponse> getBuyGiftHistory(@Param("filter") AdminCreateConversionHistoryRequest filter,
                                                                  Pageable pageable);

    @Query(value = """
            SELECT hd.gift_id , h.id,hd.id AS idHistoryDetail, hd.name_gift, hd.quantity_gift,
            h.created_date, h.status, h.student_id, h.note 
            FROM history h JOIN history_detail hd ON hd.history_id = h.id
            WHERE (:#{#filter.status} IS NULL OR h.status = :#{#filter.status})
            AND (:#{#filter.idStudent} IS NULL OR h.student_id = :#{#filter.idStudent})
            AND h.type IN (2, 4) AND h.status = 0 ORDER BY h.last_modified_date DESC
            """, nativeQuery = true)
    Page<AdminRequestConversionHistoryAddItemResponse> getHistoryRequestAddItem(@Param("filter") AdminCreateConversionHistoryRequest filter,
                                                                                Pageable pageable);

}
