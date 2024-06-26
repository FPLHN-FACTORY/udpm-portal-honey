package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminGetPointRequest;
import com.honeyprojects.core.admin.model.response.AdminPoinResponse;
import com.honeyprojects.repository.HoneyRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminHoneyRepository extends HoneyRepository {
    @Query(value = """
            SELECT h.id, h.honey_point from honey h
            where h.student_id = :#{#getPointRequest.studentId}
            and h.honey_category_id = :#{#getPointRequest.categoryId}
            """, nativeQuery = true)
    AdminPoinResponse getPoint(AdminGetPointRequest getPointRequest);
}
