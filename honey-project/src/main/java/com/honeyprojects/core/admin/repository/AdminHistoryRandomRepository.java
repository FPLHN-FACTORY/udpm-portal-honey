package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.response.AdminHistoryRandomRespone;
import com.honeyprojects.repository.HistoryRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminHistoryRandomRepository extends HistoryRepository {

    @Query(value = """
            SELECT
            h.id, h.change_date as changeDate, h.created_at as createdAt,
            h.student_id as studentId, h.president_id as presidentId,
            h.teacher_id as teacherId, h.note, h.status, h.type,
            h.class_name as className, h.subject
            FROM history h
            WHERE h.student_id = :idStudent
            """,nativeQuery = true)
    AdminHistoryRandomRespone getHistoryByIdStudent(String idStudent);
}
