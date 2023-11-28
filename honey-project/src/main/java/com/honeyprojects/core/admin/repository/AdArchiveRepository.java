package com.honeyprojects.core.admin.repository;

import com.honeyprojects.repository.ArchiveRepository;
import org.springframework.data.jpa.repository.Query;

public interface AdArchiveRepository extends ArchiveRepository {
    @Query(value = """
            SELECT id
            FROM archive
            WHERE student_id = :#{#studentId} and status = '0'
            """, nativeQuery = true)
    String getIdArchiveByIdStudent(String studentId);
}
