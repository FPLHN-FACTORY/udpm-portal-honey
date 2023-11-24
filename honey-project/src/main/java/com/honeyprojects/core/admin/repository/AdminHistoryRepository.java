package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminSearchHistoryRequest;
import com.honeyprojects.core.admin.model.response.AdminAddHoneyHistoryResponse;
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
            hd.honey_point, h.created_at, hd.student_id, hd.honey_id, c.name as nameCategory
            FROM history_detail hd
            LEFT JOIN history h ON hd.history_id = h.id
            LEFT JOIN honey ho ON hd.honey_id = ho.id
            JOIN category c ON c.id = ho.honey_category_id
            AND (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory})
            AND (:#{#searchParams.idStudent} IS NULL OR h.student_id = :#{#searchParams.idStudent})
            AND h.type = 0 AND h.admin_id = :#{#searchParams.idAdmin}
            """, nativeQuery = true)
    Page<AdminAddHoneyHistoryResponse> getHistory(@Param("searchParams") AdminSearchHistoryRequest searchParams,
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
