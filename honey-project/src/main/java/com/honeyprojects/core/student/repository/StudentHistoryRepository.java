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

    @Query("""
            select h from History h where h.studentId = :studentId and h.type <> 6
            and ((h.status = 1 and (:type is null or h.type = :type)) or (h.status = 2 and h.type = 3 and (:type is null or :type = 3) ))
            """)
    Page<History> getListHistory(String studentId, TypeHistory type, Pageable pageable);

    @Query("""
            select h from History h where h.studentId = :studentId and
            h.status <> 1 and h.type <> 0 and (:type is null or h.type = :type)
            """)
    Page<History> getListRequest(String studentId, TypeHistory type, Pageable pageable);
}
