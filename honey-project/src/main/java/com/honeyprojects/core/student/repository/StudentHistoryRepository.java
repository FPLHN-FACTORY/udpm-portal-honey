package com.honeyprojects.core.student.repository;

import com.honeyprojects.entity.History;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.repository.HistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentHistoryRepository extends HistoryRepository {

    @Query(value = """
            SELECT * FROM history h 
            WHERE h.student_id = :studentId
            AND ((h.status IN (1,3,4,5,6,7) AND (:type IS NULL OR h.type = :type)) 
            OR (h.status = 2 AND (:type IS NULL OR :type = 3) ))
            ORDER BY h.last_modified_date DESC
            """, nativeQuery = true)
    Page<History> getListHistory(String studentId, Integer type, Pageable pageable);

    @Query("""
            select h from History h where h.studentId = :studentId and
            h.status <> 1 and h.type <> 0 and (:type is null or h.type = :type)
            """)
    Page<History> getListRequest(String studentId, TypeHistory type, Pageable pageable);
}
