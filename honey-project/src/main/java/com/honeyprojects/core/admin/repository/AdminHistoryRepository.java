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
            SELECT ROW_NUMBER() over (ORDER BY c.created_date desc ) as stt, h.id, h.note,
            c.name as nameCategory, h.honey_point, h.created_date, h.status, h.student_id
            FROM history h
            JOIN honey ho ON h.honey_id = ho.id
            JOIN category c ON c.id = ho.honey_category_id
            WHERE (h.status = 1 or h.status = 2)
            AND (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory})
            AND (:#{#searchParams.idStudent} IS NULL OR h.student_id = :#{#searchParams.idStudent})
            AND h.type = 0 AND h.teacher_id = :#{#searchParams.idAdmin}
            """, nativeQuery = true)
    Page<AdminAddHoneyHistoryResponse> getHistory(@Param("searchParams") AdminSearchHistoryRequest searchParams,
                                                  Pageable pageable);

    @Query(value = """
            SELECT ROW_NUMBER() over (ORDER BY c.created_date desc ) as stt, h.id, h.note,
            c.name as nameCategory, h.honey_point, h.created_date, h.status, h.student_id
            FROM history h
            LEFT JOIN honey ho ON h.honey_id = ho.id
            LEFT JOIN category c ON c.id = ho.honey_category_id
            WHERE (h.status = 0)
            AND (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory})
            AND (:#{#searchParams.idStudent} IS NULL OR h.student_id = :#{#searchParams.idStudent})
            AND h.type = 0 AND h.teacher_id = :#{#searchParams.idAdmin}
            """, nativeQuery = true)
    Page<AdminAddHoneyHistoryResponse> getListRequest(@Param("searchParams") AdminSearchHistoryRequest searchParams,
                                                      Pageable pageable);
}
