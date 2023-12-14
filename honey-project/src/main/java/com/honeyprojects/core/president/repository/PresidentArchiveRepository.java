package com.honeyprojects.core.president.repository;

import com.honeyprojects.repository.ArchiveRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PresidentArchiveRepository extends ArchiveRepository {
    @Query(value = """
            SELECT id
            FROM archive
            WHERE student_id = :#{#studentId}
            """, nativeQuery = true)
    String getIdArchiveByIdStudent(String studentId);
}
