package com.honeyprojects.core.student.repository;

import com.honeyprojects.entity.HistoryDetail;
import com.honeyprojects.repository.HistoryDetailRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentHistoryDetailRepository extends HistoryDetailRepository {
    HistoryDetail findByStudentIdAndHistoryId(String studentId, String historyId);
    HistoryDetail findByHistoryId(String historyId);

    @Query(value = """
        SELECT COALESCE(SUM(hd.quantity_gift), 0) AS total_quantity_gift
        FROM honey_project.history_detail hd
        JOIN honey_project.history h ON h.id = hd.history_id
        WHERE hd.gift_id = :idGift AND hd.student_id = :idStudent AND h.type = 3
    """, nativeQuery = true)
    Long sumQuantityStudentUseGift(@Param("idStudent") String idStudent, @Param("idGift") String idGift);
}
