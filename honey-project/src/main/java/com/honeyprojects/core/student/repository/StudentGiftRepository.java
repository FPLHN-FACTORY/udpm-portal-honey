package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.response.StudentGiftResponse;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.repository.GiftRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentGiftRepository extends GiftRepository {

    @Query(value = """
            SELECT g.id, g.name, g.code,g.quantity,g.status,g.type,g.honey,g.honey_category_id,g.note, g.last_modified_date, g.image FROM gift g 
            where (status =0 or status = 1) and type = 0 and (g.quantity > 0 OR g.quantity IS NULL)
            ORDER BY g.last_modified_date DESC
            """, nativeQuery = true)
    List<StudentGiftResponse> getAllListGift();

    @Query(value = """
            SELECT g.id, g.name, g.code,g.quantity,g.status,g.type,g.honey,g.honey_category_id,g.note, g.last_modified_date, g.image FROM gift g 
            where (status =0 or status = 1) and (g.quantity > 0 OR g.quantity IS NULL) and type # 0 
            ORDER BY g.last_modified_date DESC
            """, nativeQuery = true)
    List<StudentGiftResponse> getAllListItem();
}
