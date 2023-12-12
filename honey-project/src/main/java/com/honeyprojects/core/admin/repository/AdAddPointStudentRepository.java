package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminCreateConversionHistoryRequest;
import com.honeyprojects.core.admin.model.request.AdminHistoryApprovedSearchRequest;
import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminChestGiftResponse;
import com.honeyprojects.core.admin.model.response.AdminChestReponse;
import com.honeyprojects.core.admin.model.response.AdminImportCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminImportGiftResponse;
import com.honeyprojects.core.admin.model.response.AdminRequestConversionHistoryResponse;
import com.honeyprojects.core.admin.model.response.CensorTransactionRequestResponse;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.repository.HoneyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface AdAddPointStudentRepository extends HoneyRepository {

    @Query(value = """
            SELECT ROW_NUMBER() over (ORDER BY hd.created_date desc ) as stt, h.id, h.note,
            h.change_date, h.created_date, hd.student_id, 
            hd.honey_id, h.status, h.teacher_id, h.president_id,
            GROUP_CONCAT(CONCAT(hd.honey_point, ' mật ong ', c.name) SEPARATOR ', ') AS honey
            FROM history_detail hd
            LEFT JOIN history h ON hd.history_id = h.id
            LEFT JOIN honey ho ON hd.honey_id = ho.id
            JOIN category c ON c.id = ho.honey_category_id
            WHERE (:#{#searchParams.status} IS NULL OR h.status = :#{#searchParams.status}) 
            AND (:#{#searchParams.idCategory} IS NULL OR c.id = :#{#searchParams.idCategory}) 
            AND (:#{#searchParams.idStudent} IS NULL OR h.student_id = :#{#searchParams.idStudent}) 
            AND h.type = 0
            GROUP BY hd.history_id
            ORDER BY h.last_modified_date DESC;
            """, nativeQuery = true)
    Page<CensorTransactionRequestResponse> getHistoryEvent(@Param("searchParams") AdminHistoryApprovedSearchRequest searchParams,
                                                      Pageable pageable);

}
