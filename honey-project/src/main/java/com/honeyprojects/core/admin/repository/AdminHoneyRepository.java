package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminGetPointRequest;
import com.honeyprojects.core.admin.model.response.AdminPoinResponse;
import com.honeyprojects.repository.HoneyRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminHoneyRepository extends HoneyRepository {
    @Query(value = """
            SELECT h.id, h.honey_point from honey h
            LEFT JOIN semester s ON h.user_semester_id = s.id
            where h.student_id = :#{#getPointRequest.studentId}
            and h.honey_category_id = :#{#getPointRequest.categoryId}
            AND :dateNow BETWEEN s.from_date AND s.to_date
            """, nativeQuery = true)
    AdminPoinResponse getPoint(AdminGetPointRequest getPointRequest, @Param("dateNow") Long dateNow);
}
