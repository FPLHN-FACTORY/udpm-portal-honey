package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.CensorSearchHistoryRequest;
import com.honeyprojects.core.admin.model.response.CensorAddHoneyRequestResponse;
import com.honeyprojects.core.admin.model.response.CensorDetailRequestResponse;
import com.honeyprojects.repository.HistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CensorHistoryRepository extends HistoryRepository {

    @Query(value = """
        SELECT ROW_NUMBER() over (ORDER BY c.created_date desc ) as stt, h.id, h.note,
        c.name as nameCategory, h.honey_point, h.created_date, h.status, h.student_id
        FROM history h
        LEFT JOIN honey ho ON h.honey_id = ho.id
        LEFT JOIN category c ON c.id = ho.honey_category_id
        WHERE (:#{#searchParams.status} IS NULL OR h.status = :#{#searchParams.status})
        AND (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory})
        AND (:#{#searchParams.idStudent} IS NULL OR h.student_id = :#{#searchParams.idStudent})
        AND h.type = 0 
        """, nativeQuery = true)
    Page<CensorAddHoneyRequestResponse> getHistoryAddPoint(@Param("searchParams") CensorSearchHistoryRequest searchParams,
                                                           Pageable pageable);
    @Query(value = """
            SELECT h.id, h.type, h.note, c.name as nameCategory, h.honey_point,
            h.created_date, h.status, h.change_date,h.note, h.student_id, h.teacher_id
            FROM history h
            LEFT JOIN honey ho ON h.honey_id = ho.id
            LEFT JOIN category c ON c.id = ho.honey_category_id
            WHERE h.id = :idHistory
            """, nativeQuery = true)
    CensorDetailRequestResponse getAddPointRequest(String idHistory);


}