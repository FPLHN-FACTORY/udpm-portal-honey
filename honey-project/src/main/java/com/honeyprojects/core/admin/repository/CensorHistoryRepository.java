package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminHistoryApprovedSearchRequest;
import com.honeyprojects.core.admin.model.request.CensorSearchHistoryRequest;
import com.honeyprojects.core.admin.model.response.CensorAddHoneyRequestResponse;
import com.honeyprojects.core.admin.model.response.CensorDetailRequestResponse;
import com.honeyprojects.core.admin.model.response.CensorTransactionRequestResponse;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.repository.HistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CensorHistoryRepository extends HistoryRepository {

    @Query(value = """
            SELECT ROW_NUMBER() over (ORDER BY hd.created_date DESC ) AS stt, hd.id, h.id AS idHistory, h.note,
            h.change_date, hd.student_id, hd.honey_id, h.status,
            h.teacher_id, h.president_id,
            GROUP_CONCAT(CONCAT(hd.honey_point, ' ', c.name) SEPARATOR ', ') AS honey
            FROM history_detail hd
            RIGHT JOIN history h ON hd.history_id = h.id
            LEFT JOIN honey ho ON hd.honey_id = ho.id
            LEFT JOIN category c ON c.id = ho.honey_category_id
            WHERE (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory})
            AND (:#{#searchParams.idStudent} IS NULL OR h.student_id = :#{#searchParams.idStudent})
            AND h.type = 0 AND h.status = 0
            GROUP BY hd.history_id
            """, nativeQuery = true)
    Page<CensorAddHoneyRequestResponse> getHistoryAddPoint(@Param("searchParams") CensorSearchHistoryRequest searchParams,
                                                           Pageable pageable);

    @Query(value = """
            SELECT h.id, hd.id AS history_detail_id, h.note,
            h.created_date, hd.student_id, h.status, h.type, 
            GROUP_CONCAT(CONCAT(hd.honey_point, ' ', c.name) SEPARATOR ', ') AS honey,
            GROUP_CONCAT(CONCAT(hd.quantity_gift, ' ', hd.name_gift) SEPARATOR ', ') AS gift,
            h.teacher_id, h.president_id, h.change_date
            FROM history_detail hd
            RIGHT JOIN history h ON hd.history_id = h.id
            LEFT JOIN honey ho ON hd.honey_id = ho.id
            LEFT JOIN category c ON c.id = ho.honey_category_id
            WHERE hd.history_id = :id
            """, nativeQuery = true)
    CensorDetailRequestResponse getHistoryDetail(@Param("id")String idHistory);

    @Query(value = """
            SELECT h.id, hd.id AS history_detail_id, h.type, h.note, c.name as nameCategory, hd.honey_id, hd.honey_point,
            h.change_date, h.status, h.note, hd.student_id, h.teacher_id as nguoiGui
            FROM history_detail hd
            RIGHT JOIN history h ON hd.history_id = h.id
            LEFT JOIN honey ho ON hd.honey_id = ho.id
            LEFT JOIN category c ON c.id = ho.honey_category_id
            WHERE h.id = :idHistory
            """, nativeQuery = true)
    CensorDetailRequestResponse getAddPointRequest(String idHistory);

    @Query(value = """
            SELECT ROW_NUMBER() over (ORDER BY c.created_date desc ) as stt, h.id, h.note,
            c.name as nameCategory, h.honey_point, h.created_date, h.status, h.student_id,
            ho.student_id as studentSend
            FROM history h
            LEFT JOIN honey ho ON h.honey_id = ho.id
            LEFT JOIN category c ON c.id = ho.honey_category_id
            WHERE (:#{#searchParams.status} IS NULL OR h.status = :#{#searchParams.status})
            AND (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory})
            AND (:#{#searchParams.idStudent} IS NULL OR h.student_id = :#{#searchParams.idStudent})
            AND h.type = 1
            """, nativeQuery = true)
    Page<CensorTransactionRequestResponse> getHistoryTransaction(@Param("searchParams") CensorSearchHistoryRequest searchParams,
                                                                 Pageable pageable);

    @Query(value = """
            SELECT COUNT(h) FROM history h WHERE (h.type = :type OR :type IS NULL) AND h.status = 0
            """, nativeQuery = true)
    Integer getCountRequest(@Param("type") TypeHistory type);

    @Query(value = """
            SELECT ROW_NUMBER() over (ORDER BY hd.created_date desc ) as stt, h.id, h.note,
            h.change_date, h.created_date, hd.student_id, hd.honey_id, h.status,
            GROUP_CONCAT(CONCAT(hd.honey_point, ' ', c.name) SEPARATOR ', ') AS honey
            FROM history_detail hd
            LEFT JOIN history h ON hd.history_id = h.id
            LEFT JOIN honey ho ON hd.honey_id = ho.id
            JOIN category c ON c.id = ho.honey_category_id
            WHERE h.status = :#{#searchParams.status}
            AND (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory}) 
            AND (:#{#searchParams.idStudent} IS NULL OR h.student_id = :#{#searchParams.idStudent}) 
            AND h.type = 0 
            """, nativeQuery = true)
    Page<CensorTransactionRequestResponse> getHistoryApprovedByStatus(@Param("searchParams") AdminHistoryApprovedSearchRequest searchParams,
                                                                      Pageable pageable);

    @Query(value = """
            SELECT ROW_NUMBER() over (ORDER BY hd.created_date desc ) as stt, h.id, h.note,
            h.change_date, h.created_date, hd.student_id, 
            hd.honey_id, h.status,
            GROUP_CONCAT(CONCAT(hd.honey_point, ' ', c.name) SEPARATOR ', ') AS honey
            FROM history_detail hd
            LEFT JOIN history h ON hd.history_id = h.id
            LEFT JOIN honey ho ON hd.honey_id = ho.id
            JOIN category c ON c.id = ho.honey_category_id
            WHERE h.status IN (1,2) AND :#{#searchParams.status} IS NULL
            AND (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory}) 
            AND (:#{#searchParams.idStudent} IS NULL OR h.student_id = :#{#searchParams.idStudent}) 
            AND h.type = 0
            GROUP BY hd.history_id
            """, nativeQuery = true)
    Page<CensorTransactionRequestResponse> getHistoryApprovedAllStatus(@Param("searchParams") AdminHistoryApprovedSearchRequest searchParams,
                                                                       Pageable pageable);

    @Query(value = """
            SELECT ROW_NUMBER() over (ORDER BY c.created_date desc ) as stt, h.id, h.note, 
            c.name as nameCategory, h.honey_point, h.created_date, h.status, h.student_id, 
            ho.student_id as studentSend 
            FROM history h 
            LEFT JOIN honey ho ON h.honey_id = ho.id 
            LEFT JOIN category c ON c.id = ho.honey_category_id 
            WHERE h.status IN (0,3)
            AND (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory}) 
            AND (:#{#searchParams.idStudent} IS NULL OR h.student_id = :#{#searchParams.idStudent}) 
            AND h.type = 0""", nativeQuery = true)
    Page<CensorTransactionRequestResponse> getListRequests(@Param("searchParams") AdminHistoryApprovedSearchRequest searchParams,
                                                           Pageable pageable);

    @Query(value = """
            SELECT ROW_NUMBER() over (ORDER BY c.created_date desc ) as stt, h.id, h.note, 
            c.name as nameCategory, h.honey_point, h.created_date, h.status, h.student_id, 
            ho.student_id as studentSend 
            FROM history h 
            LEFT JOIN honey ho ON h.honey_id = ho.id 
            LEFT JOIN category c ON c.id = ho.honey_category_id 
            WHERE h.status = :#{#searchParams.status}
            AND (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory}) 
            AND (:#{#searchParams.idStudent} IS NULL OR h.student_id = :#{#searchParams.idStudent}) 
            AND h.type = 0""", nativeQuery = true)
    Page<CensorTransactionRequestResponse> getListRequestsByStatus(@Param("searchParams") AdminHistoryApprovedSearchRequest searchParams,
                                                                   Pageable pageable);

    @Query(value = """
            SELECT ROW_NUMBER() over (ORDER BY c.created_date desc ) as stt, h.id, h.note, 
            c.name as nameCategory, h.honey_point, h.created_date, h.status, h.student_id, 
            ho.student_id as studentSend 
            FROM history h 
            LEFT JOIN gift g ON h.gift_id = g.id
            LEFT JOIN honey ho ON h.honey_id = ho.id 
            LEFT JOIN category c ON c.id = ho.honey_category_id 
            WHERE h.status IN (0,3) AND :#{#searchParams.status} IS NULL
            AND (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory}) 
            AND (:#{#searchParams.idStudent} IS NULL OR h.student_id = :#{#searchParams.idStudent}) 
            """, nativeQuery = true)
    Page<CensorTransactionRequestResponse> getExchangeGiftAllStatus(@Param("searchParams") AdminHistoryApprovedSearchRequest searchParams,
                                                                    Pageable pageable);

    @Query(value = """
            SELECT ROW_NUMBER() over (ORDER BY c.created_date desc ) as stt, h.id, h.note, 
            c.name as nameCategory, h.honey_point, h.created_date, h.status, h.student_id, 
            ho.student_id as studentSend 
            FROM history h 
            LEFT JOIN gift g ON h.gift_id = g.id
            LEFT JOIN honey ho ON h.honey_id = ho.id 
            LEFT JOIN category c ON c.id = ho.honey_category_id 
            WHERE h.status = :#{#searchParams.status}
            AND (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory}) 
            AND (:#{#searchParams.idStudent} IS NULL OR h.student_id = :#{#searchParams.idStudent}) 
            """, nativeQuery = true)
    Page<CensorTransactionRequestResponse> getExchangeGiftByStatus(@Param("searchParams") AdminHistoryApprovedSearchRequest searchParams,
                                                                   Pageable pageable);

}
