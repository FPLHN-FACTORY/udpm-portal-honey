package com.honeyprojects.core.president.service;

import com.honeyprojects.core.teacher.model.request.TeacherGetPointRequest;
import com.honeyprojects.core.teacher.model.response.TeacherPointResponse;
import com.honeyprojects.repository.HoneyRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PresidentHoneyRepository extends HoneyRepository {

    @Query(value = """
            SELECT h.id, h.honey_point from honey h
            where h.student_id = :#{#getPointRequest.studentId}
            and h.honey_category_id = :#{#getPointRequest.categoryId}
            """, nativeQuery = true)
    TeacherPointResponse getPoint(TeacherGetPointRequest getPointRequest);

}
