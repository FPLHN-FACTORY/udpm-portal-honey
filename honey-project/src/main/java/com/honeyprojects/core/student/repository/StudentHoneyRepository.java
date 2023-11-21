package com.honeyprojects.core.student.repository;


import com.honeyprojects.core.student.model.request.StudentHoneyRequest;
import com.honeyprojects.core.student.model.response.StudentHoneyResponse;
import com.honeyprojects.entity.Honey;

import com.honeyprojects.repository.HoneyRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentHoneyRepository extends HoneyRepository {
    @Query(value = """
            SELECT h.id, h.honey_point from honey h
            where h.student_id = :#{#rep.studentId}
            and h.honey_category_id = :#{#rep.categoryId}
            """, nativeQuery = true)
    StudentHoneyResponse getPointHoney(StudentHoneyRequest rep);

    Honey findByStudentIdAndHoneyCategoryId(String studentId, String honeyCategoryId);

    @Query(value = """
            SELECT h.id, h.honey_point from honey h
            where h.student_id = :studentId
            and h.honey_category_id = :categoryId
            """, nativeQuery = true)
    StudentHoneyResponse getPoint(String categoryId,String studentId);

    @Query(value = """
            SELECT *
             FROM honey h
             WHERE h.student_id = :id
             """,
            nativeQuery = true)
    List<Honey> getListIdCategory(@Param("id") String id);
}
