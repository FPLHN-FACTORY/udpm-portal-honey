package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.response.StudentHoneyResponse;
import com.honeyprojects.repository.HoneyRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentHoneyRepository extends HoneyRepository {
    @Query(value = """
            SELECT h.id, h.honey_point from honey h
            LEFT JOIN semester s ON h.user_semester_id = s.id
            where h.student_id = :studentId
            and h.honey_category_id = :categoryId
            AND :dateNow BETWEEN s.from_date AND s.to_date
            """, nativeQuery = true)
    StudentHoneyResponse getPoint(String categoryId,String studentId, Long dateNow);
}
