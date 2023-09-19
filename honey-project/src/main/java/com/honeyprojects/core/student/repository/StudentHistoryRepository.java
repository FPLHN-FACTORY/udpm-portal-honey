package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.request.StudentSearchHistoryRequest;
import com.honeyprojects.core.student.model.response.StudentHistoryResponse;
import com.honeyprojects.core.teacher.model.request.TeacherSearchHistoryRequest;
import com.honeyprojects.core.teacher.model.response.TeacherAddHoneyHistoryResponse;
import com.honeyprojects.repository.HistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentHistoryRepository extends HistoryRepository {

    @Query(value = """
        SELECT ROW_NUMBER() over (ORDER BY c.created_date desc ) as stt, h.id, h.note,
        c.name as nameCategory, h.honey_point, h.change_date, h.status, h.student_id
        FROM history h
        LEFT JOIN honey ho ON h.honey_id = ho.id
        LEFT JOIN category c ON c.id = ho.honey_category_id
        WHERE (:#{#searchParams.status} IS NULL OR h.status = :#{#searchParams.status})
        AND (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory})
        AND ho.student_id = :#{#searchParams.idUserLogin}
        AND h.type = 1
        """, nativeQuery = true)
    Page<StudentHistoryResponse> getHistory(@Param("searchParams") StudentSearchHistoryRequest searchParams,
                                            Pageable pageable);

}
