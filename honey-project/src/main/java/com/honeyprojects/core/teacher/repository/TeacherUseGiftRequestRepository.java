package com.honeyprojects.core.teacher.repository;

import com.honeyprojects.core.teacher.model.request.TeacherGetUseGiftRequest;
import com.honeyprojects.core.teacher.model.response.TeacherUseGiftRequestResponse;
import com.honeyprojects.entity.History;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.repository.HistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherUseGiftRequestRepository extends HistoryRepository {

    @Query(value = """
            select ROW_NUMBER() over (ORDER BY h.created_date desc ) as stt,h.id,
            h.student_id, g.name as nameGift, h.class_name as lop,h.subject as mon, h.created_date, h.status as status
             from history h
             join gift g on g.id = h.gift_id
             where h.type = 3
             and h.status = :#{#request.status}
             and (:#{#request.idStudent} is null or h.student_id = :#{#request.idStudent})
             and (:#{#request.gift} is null or h.gift_id = :#{#request.gift})
             and (:#{#request.lop} is null or h.class_name = :#{#request.lop})
             and :#{#request.idTeacher} = h.teacher_id
            """, nativeQuery = true)
    Page<TeacherUseGiftRequestResponse> getTeacherUseGiftRequest(TeacherGetUseGiftRequest request, Pageable pageable);

    @Query("""
    select h.className from History h
    where h.status = :status and h.type = :type
    group by h.nameGift
    """)
    List<String> filterClass(HoneyStatus status, TypeHistory type);
    @Query("""
    select h.giftId from History h
    where h.status = :status and h.type = :type
    group by h.giftId
    """)
    List<String> filterGift(HoneyStatus status, TypeHistory type);
}
