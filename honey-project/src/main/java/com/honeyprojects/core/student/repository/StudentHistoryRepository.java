package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.param.StudentSumHistoryParam;
import com.honeyprojects.core.student.model.request.StudentSearchHistoryRequest;
import com.honeyprojects.core.student.model.response.StudentHistoryResponse;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.HistoryDetail;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.repository.HistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentHistoryRepository extends HistoryRepository {

//    @Query(value = """
//                SELECT ROW_NUMBER() over (ORDER BY h.change_date desc ) as stt, h.id, h.note,
//            c.name as nameCategory, h.honey_point, h.change_date, h.student_id
//            FROM history h
//            JOIN honey ho ON h.honey_id = ho.id
//            JOIN category c ON c.id = ho.honey_category_id
//                WHERE (ho.student_id = :#{#searchParams.idUserLogin}
//                OR h.student_id = :#{#searchParams.idUserLogin})
//            AND (:#{#searchParams.toDate} is null OR h.change_date <= :#{#searchParams.toDate})
//            AND (:#{#searchParams.fromDate} is null OR h.change_date >= :#{#searchParams.fromDate})
//            AND h.type = 1 AND  h.status = 1
//            """, nativeQuery = true)
//    Page<StudentHistoryResponse> getHistory(@Param("searchParams") StudentSearchHistoryRequest searchParams,
//                                            Pageable pageable);

//    @Query("select sum(h.quantity) from History h where h.status <> 2 and h.type = 3" +
//           "and h.giftId = :#{#param.giftId} and lower(h.className) = lower(:#{#param.className}) " +
//           "and lower(h.subject) = lower(:#{#param.subject}) " +
//           "and h.createdDate between :#{#param.formSemester} and :#{#param.toSemester}")
//    Integer getTotalUseGift(StudentSumHistoryParam param);

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
