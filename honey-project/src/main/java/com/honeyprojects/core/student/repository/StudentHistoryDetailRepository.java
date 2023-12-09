package com.honeyprojects.core.student.repository;

import com.honeyprojects.entity.HistoryDetail;
import com.honeyprojects.repository.HistoryDetailRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentHistoryDetailRepository extends HistoryDetailRepository {
    HistoryDetail findByStudentIdAndHistoryId(String studentId, String historyId);
    HistoryDetail findByHistoryId(String historyId);
}
