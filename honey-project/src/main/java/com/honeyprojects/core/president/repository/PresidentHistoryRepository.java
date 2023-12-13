package com.honeyprojects.core.president.repository;

import com.honeyprojects.core.president.model.request.PresidentFindGiftHistoryRequest;
import com.honeyprojects.core.president.model.request.PresidentFindHoneyHistoryRequest;
import com.honeyprojects.core.president.model.response.PresidentGiftHistoryResponse;
import com.honeyprojects.core.president.model.response.PresidentHoneyHistoryResponse;
import com.honeyprojects.core.teacher.model.request.TeacherSearchHistoryRequest;
import com.honeyprojects.core.teacher.model.response.TeacherAddHoneyHistoryResponse;
import com.honeyprojects.repository.HistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PresidentHistoryRepository extends HistoryRepository {

    @Query(value = """
            SELECT h.id, h.change_date, h.created_date, hd.student_id, h.status,
            GROUP_CONCAT(CONCAT(hd.honey_point, ' mật ong ', c.name) SEPARATOR ', ') AS honey
            FROM history_detail hd
            LEFT JOIN history h ON hd.history_id = h.id
            LEFT JOIN honey ho ON hd.honey_id = ho.id
            JOIN category c ON c.id = ho.honey_category_id
            WHERE h.status = 1 
            AND (:#{#request.idCategory} IS NULL OR c.id = :#{#request.idCategory})
            AND (:#{#request.idStudent} IS NULL OR h.student_id = :#{#request.idStudent})
            AND h.type = 0 AND h.president_id = :id
            GROUP BY hd.history_id
            ORDER BY h.last_modified_date DESC
            """, nativeQuery = true)
    Page<PresidentHoneyHistoryResponse> getHoneyHistory(@Param("request") PresidentFindHoneyHistoryRequest request,
                                                                       Pageable pageable, @Param("id") String idPresident);

    @Query(value = """
            SELECT hd.id AS history_detail_id, h.president_id,h.id, h.change_date,
            h.created_date, h.status, hd.student_id,
            GROUP_CONCAT(CONCAT(hd.quantity_gift, ' ', hd.name_gift) SEPARATOR ', ') AS gift
            FROM history h
            JOIN history_detail hd ON hd.history_id = h.id
            WHERE (:#{#request.status} IS NULL OR h.status = :#{#request.status})
            AND (:#{#request.idCategory} IS NULL OR c.id = :#{#request.idCategory})
            AND (:#{#request.idStudent} IS NULL OR h.student_id = :#{#request.idStudent})
            AND h.type = 4 AND h.status = 1 AND h.president_id = :id
            GROUP BY hd.history_id
            ORDER BY h.last_modified_date DESC
                """, nativeQuery = true)
    Page<PresidentGiftHistoryResponse> getGiftHistory(@Param("request") PresidentFindGiftHistoryRequest request,
                                                      Pageable pageable, @Param("id") String idPresident);

    @Query(value = """
            SELECT ROW_NUMBER() over (ORDER BY hd.created_date desc ) as stt, h.id, h.note,
            h.change_date, hd.student_id, hd.honey_id, h.status, 
            GROUP_CONCAT(CONCAT(hd.honey_point, ' ', c.name) SEPARATOR ', ') AS honey
            FROM history_detail hd
            LEFT JOIN history h ON hd.history_id = h.id
            LEFT JOIN honey ho ON hd.honey_id = ho.id
            JOIN category c ON c.id = ho.honey_category_id
            WHERE h.status = 0
            AND (:#{#request.idCategory} IS NULL OR c.id = :#{#request.idCategory})
            AND (:#{#request.idStudent} IS NULL OR h.student_id = :#{#request.idStudent})
            AND h.type = 0 AND h.president_id = :id
            GROUP BY hd.history_id
            ORDER BY h.last_modified_date DESC
            """, nativeQuery = true)
    Page<PresidentGiftHistoryResponse> getListRequest(@Param("searchParams") PresidentFindGiftHistoryRequest request,
                                                        Pageable pageable, @Param("id") String idPresident);
}
