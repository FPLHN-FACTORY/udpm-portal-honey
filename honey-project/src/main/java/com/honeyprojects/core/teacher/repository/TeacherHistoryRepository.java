package com.honeyprojects.core.teacher.repository;

import com.honeyprojects.core.teacher.model.request.TeacherSearchHistoryRequest;
import com.honeyprojects.core.teacher.model.response.TeacherAddHoneyHistoryResponse;
import com.honeyprojects.repository.HistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherHistoryRepository extends HistoryRepository {

    @Query(value = """
        SELECT ROW_NUMBER() over (ORDER BY c.created_date desc ) as stt, h.id, us.code as mssv, us.name as nameStudent, h.note,
        c.name as nameCategory, h.honey_point, h.created_date, h.status
        FROM history h
        LEFT JOIN user_api us ON h.student_id = us.id
        LEFT JOIN honey ho ON h.honey_id = ho.id
        LEFT JOIN category c ON c.id = ho.honey_category_id
        WHERE (:#{#searchParams.textSearch} IS NULL OR us.code LIKE CONCAT('%', :#{#searchParams.textSearch}, '%') 
        OR us.name LIKE CONCAT('%', :#{#searchParams.textSearch}, '%'))
        AND (:#{#searchParams.status} IS NULL OR h.status = :#{#searchParams.status})
        AND (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory})
        AND h.type = 0
        """, nativeQuery = true)
    Page<TeacherAddHoneyHistoryResponse> getHistory(@Param("searchParams") TeacherSearchHistoryRequest searchParams,
                                                    Pageable pageable);


}
