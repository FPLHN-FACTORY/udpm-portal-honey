package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.response.StudentHistoryDetailResponse;
import com.honeyprojects.core.student.model.response.StudentHistoryGiftResponse;
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
    SELECT h.id, h.change_date, hd.history_id, hd.student_id, h.status, h.type,
            GROUP_CONCAT(CONCAT(hd.honey_point, ' mật ong ', c.name) SEPARATOR ', ') AS honey
            FROM history_detail hd
            LEFT JOIN history h ON hd.history_id = h.id
            LEFT JOIN honey ho ON hd.honey_id = ho.id
            JOIN category c ON c.id = ho.honey_category_id
            WHERE h.status IN (1,3,4,5,6,7) 
            AND h.type = 0 AND hd.history_id = :history_id 
            AND hd.student_id = :student_id 
            GROUP BY hd.history_id
            ORDER BY h.last_modified_date DESC
""", nativeQuery = true)
    StudentHistoryDetailResponse getHistoryDetail(@Param("student_id") String studentId, @Param("history_id") String historyId);

    @Query(value = """
    SELECT h.id, h.change_date, hd.history_id, hd.student_id, h.status, h.type,
            GROUP_CONCAT(CONCAT(hd.quantity_gift, ' ', hd.name_gift) SEPARATOR ', ') AS gift
            FROM history_detail hd
            LEFT JOIN history h ON hd.history_id = h.id
            LEFT JOIN honey ho ON hd.honey_id = ho.id
            WHERE h.status IN (1,3,4,5,6,7) 
            AND h.type = 4 AND hd.history_id = :history_id 
            AND hd.student_id = :student_id 
            GROUP BY hd.history_id
            ORDER BY h.last_modified_date DESC
""", nativeQuery = true)
    StudentHistoryGiftResponse getHistoryGift(@Param("student_id") String studentId, @Param("history_id") String historyId);

    @Query(value = """
        SELECT COALESCE(SUM(hd.quantity_gift), 0) AS total_quantity_gift
        FROM honey_project.history_detail hd
        JOIN honey_project.history h ON h.id = hd.history_id
        WHERE hd.gift_id = :idGift AND hd.student_id = :idStudent AND h.type = 3
    """, nativeQuery = true)
    Long sumQuantityStudentUseGift(@Param("idStudent") String idStudent, @Param("idGift") String idGift);
}
