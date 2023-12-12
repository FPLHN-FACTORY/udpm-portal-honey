package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminSearchHistoryRequest;
import com.honeyprojects.core.admin.model.response.AdminAddHoneyHistoryResponse;
import com.honeyprojects.core.president.model.request.PresidentFindGiftHistoryRequest;
import com.honeyprojects.core.president.model.response.PresidentGiftHistoryResponse;
import com.honeyprojects.repository.HistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminHistoryRepository extends HistoryRepository {
    @Query(value = """
            SELECT ROW_NUMBER() over (ORDER BY hd.created_date desc ) as stt, h.id, h.note, 
            h.change_date, hd.student_id, h.student_name,
            GROUP_CONCAT(CONCAT(hd.honey_point, ' mật ong ', c.name) SEPARATOR ', ') AS honey
            FROM history_detail hd
            LEFT JOIN history h ON hd.history_id = h.id
            LEFT JOIN honey ho ON hd.honey_id = ho.id
            JOIN category c ON c.id = ho.honey_category_id
            WHERE (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory})
            AND (:#{#searchParams.idStudent} IS NULL OR h.student_id = :#{#searchParams.idStudent})
            AND h.type = 0 AND h.status = 3
            GROUP BY hd.history_id
            ORDER BY h.last_modified_date DESC;
            """, nativeQuery = true)
    Page<AdminAddHoneyHistoryResponse> getHistory(@Param("searchParams") AdminSearchHistoryRequest searchParams,
                                                  Pageable pageable);

    @Query(value = """
            SELECT hd.id AS history_detail_id, h.id, h.change_date,
            h.created_date, h.status, hd.student_id, h.student_name,
            GROUP_CONCAT(CONCAT(hd.quantity_gift, ' ', hd.name_gift) SEPARATOR ', ') AS gift
            FROM history h
            JOIN history_detail hd ON hd.history_id = h.id
            WHERE (:#{#request.status} IS NULL OR h.status = :#{#request.status})
            AND (:#{#request.idStudent} IS NULL OR h.student_id = :#{#request.idStudent})
            AND h.type = 4 AND h.status = 3
            GROUP BY hd.history_id
            ORDER BY h.last_modified_date DESC
                """, nativeQuery = true)
    Page<PresidentGiftHistoryResponse> getGiftHistory(@Param("request") AdminSearchHistoryRequest request,
                                                      Pageable pageable);

    @Query(value = """
            SELECT ROW_NUMBER() over (ORDER BY c.created_date desc ) as stt, h.id, h.note,
            c.name as nameCategory, h.honey_point, h.created_date, h.status, h.student_id
            FROM history h
            LEFT JOIN honey ho ON h.honey_id = ho.id
            LEFT JOIN category c ON c.id = ho.honey_category_id
            WHERE h.status in (0,3)
            AND (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory})
            AND (:#{#searchParams.idStudent} IS NULL OR h.student_id = :#{#searchParams.idStudent})
            AND h.type = 0 AND h.teacher_id = :#{#searchParams.idAdmin}
            """, nativeQuery = true)
    Page<AdminAddHoneyHistoryResponse> getListRequest(@Param("searchParams") AdminSearchHistoryRequest searchParams,
                                                      Pageable pageable);
}
