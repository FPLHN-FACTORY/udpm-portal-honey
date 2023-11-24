package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.response.transaction.StudentGiftTransactionResponse;
import com.honeyprojects.repository.GiftRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentGiftTransactionRepository extends GiftRepository {

    @Query(value = """
            select g.id, g.name, g.image, ag.quantity from gift g
            join archive_gift ag on g.id = ag.gift_id
            join archive a on a.id = ag.archive_id
            where a.student_id = :studentId and g.transaction_gift = 0 and ag.quantity > 0 and g.status = 'DANG_HOAT_DONG'
            """, nativeQuery = true)
    List<StudentGiftTransactionResponse> getGiftTransaction(String studentId);
}
