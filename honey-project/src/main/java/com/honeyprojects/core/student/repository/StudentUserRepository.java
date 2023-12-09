package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.response.StudentMyHoneyResponse;
import com.honeyprojects.core.student.model.response.StudentPageStudentResponse;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.repository.HoneyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentUserRepository extends HoneyRepository {

    @Query(value = """
            SELECT 
            h.honey_point,
            c.name,
            c.image
            FROM honey h
            JOIN category c ON h.honey_category_id = c.id
            WHERE h.student_id = :userId AND h.status = 0
             """, nativeQuery = true)
    List<StudentMyHoneyResponse> getHoney(String userId);

    @Query(value = """
            SELECT
                 ROW_NUMBER() OVER(ORDER BY SUM(h.honey_point) DESC) AS stt,
                 h.student_id,
                 SUM(h.honey_point) AS 'totalHoney'
             FROM honey h
             JOIN category c ON h.honey_category_id = c.id
             WHERE h.status = 0
             AND ( :search is null OR h.student_id = :search)
             GROUP BY h.student_id
             ORDER BY SUM(h.honey_point) DESC;
             """, countQuery = """
                SELECT ROW_NUMBER() OVER(ORDER BY SUM(h.honey_point) DESC) AS stt,
                         h.student_id,
                         SUM(h.honey_point) AS 'totalHoney'
                     FROM honey h
                     JOIN category c ON h.honey_category_id = c.id
                     WHERE h.status = 0
                     AND ( :search is null OR h.student_id = :search)
                     GROUP BY h.student_id
                     ORDER BY SUM(h.honey_point) DESC;
            """, nativeQuery = true)
    Page<StudentPageStudentResponse> getPageHallOfFame(Pageable pageable,
                                                       @Param("search") String search);

    List<Honey> findByStudentIdIn(List<String> lstStudentId);

    @Query(value = """
            SELECT
                 ROW_NUMBER() OVER(ORDER BY SUM(h.honey_point) DESC) AS stt,
                 h.student_id,
                 SUM(h.honey_point) AS 'totalHoney'
             FROM honey h
             JOIN category c ON h.honey_category_id = c.id
             WHERE h.status = 0
             GROUP BY h.student_id
             ORDER BY SUM(h.honey_point) DESC LIMIT 3;
             """,  nativeQuery = true)
    List<StudentPageStudentResponse> getTop3Student();
}
