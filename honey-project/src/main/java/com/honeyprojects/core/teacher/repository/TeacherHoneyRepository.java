package com.honeyprojects.core.teacher.repository;

import com.honeyprojects.core.teacher.model.request.TeacherGetPointRequest;
import com.honeyprojects.core.teacher.model.response.TeacherPointResponse;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.repository.CategoryRepository;
import com.honeyprojects.repository.HoneyRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherHoneyRepository extends HoneyRepository {

    @Query(value = """
            SELECT h.id, h.honey_point from honey h
            where h.student_id = :#{#getPointRequest.studentId}
            and h.honey_category_id = :#{#getPointRequest.categoryId}
            """, nativeQuery = true)
    TeacherPointResponse getPoint(TeacherGetPointRequest getPointRequest);

    Honey findByStudentIdAndHoneyCategoryId(String id, String categoryId);

}
