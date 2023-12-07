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
            SELECT ROW_NUMBER() over (ORDER BY hd.created_date desc ) as stt, h.id, h.note,
            hd.honey_point, h.change_date, hd.student_id, hd.honey_id, c.name as nameCategory, h.status
            FROM history_detail hd
            LEFT JOIN history h ON hd.history_id = h.id
            LEFT JOIN honey ho ON hd.honey_id = ho.id
            JOIN category c ON c.id = ho.honey_category_id
            WHERE (h.status = 1 OR h.status = 2 OR h.status = 4)
            AND (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory})
            AND (:#{#searchParams.idStudent} IS NULL OR h.student_id = :#{#searchParams.idStudent})
            AND h.type = 0 AND h.teacher_id = :#{#searchParams.idTeacher}
            """, nativeQuery = true)
    Page<TeacherAddHoneyHistoryResponse> getHistory(@Param("searchParams") TeacherSearchHistoryRequest searchParams,
                                                    Pageable pageable);

    @Query(value = """
            SELECT ROW_NUMBER() over (ORDER BY hd.created_date desc ) as stt, h.id, h.note,
            hd.honey_point, h.change_date, hd.student_id, hd.honey_id, c.name as nameCategory, h.status
            FROM history_detail hd
            LEFT JOIN history h ON hd.history_id = h.id
            LEFT JOIN honey ho ON hd.honey_id = ho.id
            JOIN category c ON c.id = ho.honey_category_id
            WHERE (h.status = 0)
            AND (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory})
            AND (:#{#searchParams.idStudent} IS NULL OR h.student_id = :#{#searchParams.idStudent})
            AND h.type = 0 AND h.teacher_id = :#{#searchParams.idTeacher}
            """, nativeQuery = true)
    Page<TeacherAddHoneyHistoryResponse> getListRequest(@Param("searchParams") TeacherSearchHistoryRequest searchParams,
                                                        Pageable pageable);

}
