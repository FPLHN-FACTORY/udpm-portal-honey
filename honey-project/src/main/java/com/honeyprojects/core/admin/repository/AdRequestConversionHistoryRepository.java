package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminConversionRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateConversionHistoryRequest;
import com.honeyprojects.core.admin.model.response.AdminRequestConversionHistoryAddItemResponse;
import com.honeyprojects.core.admin.model.response.AdminRequestConversionHistoryResponse;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.repository.HistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdRequestConversionHistoryRepository extends HistoryRepository {
    @Query(value = """
                SELECT c.name as nameCategory,c.id as categoryId, hd.gift_id ,hd.id as idHistoryDetail, h.id,hd.name_gift, hd.honey_point, h.last_modified_date,hd.quantity_gift ,
                h.created_date, h.status, h.student_id, h.note FROM history h 
                inner join history_detail hd on hd.history_id = h.id
                inner join honey hn on hn.id = hd.honey_id 
                inner join category c on hn.honey_category_id = c.id    
                  WHERE (:#{#filter.status} IS NULL OR h.status = :#{#filter.status})
            AND (:#{#filter.idCategory} IS NULL OR c.id = :#{#filter.idCategory})
            AND (:#{#filter.idStudent} IS NULL OR h.student_id = :#{#filter.idStudent})
            AND h.type = 2 AND h.status = 0 ORDER BY h.last_modified_date DESC
                """, nativeQuery = true)
    Page<AdminRequestConversionHistoryResponse> getHistory(@Param("filter") AdminCreateConversionHistoryRequest filter,
                                                           Pageable pageable);

    @Query(value = """
                SELECT c.name as nameCategory,c.id as categoryId, hd.gift_id , h.id,hd.name_gift, hd.honey_point, h.last_modified_date,hd.quantity_gift ,
                h.created_date, h.status, h.student_id, h.note FROM history h 
                inner join history_detail hd on hd.history_id = h.id
                inner join honey hn on hn.id = hd.honey_id 
                inner join category c on hn.honey_category_id = c.id     
                  WHERE (:#{#filter.status} IS NULL OR h.status = :#{#filter.status})
            AND (:#{#filter.idCategory} IS NULL OR c.id = :#{#filter.idCategory})
            AND (:#{#filter.idStudent} IS NULL OR h.student_id = :#{#filter.idStudent})
            AND h.type = 2 AND h.status in (1,2) ORDER BY h.last_modified_date DESC
                """, nativeQuery = true)
    Page<AdminRequestConversionHistoryResponse> getBuyGiftHistory(@Param("filter") AdminCreateConversionHistoryRequest filter,
                                                                  Pageable pageable);

    @Query(value = """
                SELECT hd.gift_id , h.id,hd.id as idHistoryDetail, hd.name_gift, hd.quantity_gift,
                h.created_date, h.status, h.student_id, h.note FROM history h join history_detail hd on hd.history_id = h.id
                WHERE (:#{#filter.status} IS NULL OR h.status = :#{#filter.status})
                    AND (:#{#filter.idStudent} IS NULL OR h.student_id = :#{#filter.idStudent})
                    AND h.type = 2 AND h.status = 0 ORDER BY h.last_modified_date DESC
                """, nativeQuery = true)
    Page<AdminRequestConversionHistoryAddItemResponse> getHistoryRequestAddItem(@Param("filter") AdminCreateConversionHistoryRequest filter,
                                                                                Pageable pageable);

}
