package com.portalprojects.core.admin.repository;

import com.portalprojects.entity.Gift;
import com.portalprojects.repository.GiftRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdGiftRepository extends GiftRepository {

    @Query(value = """
      SELECT DISTINCT b.* FROM gift_detail a
      JOIN gift b ON b.id = a.gift_id
      WHERE a.student_id  = :studentId
            """,nativeQuery = true)
    List<Gift> getMyGift(@Param("studentId") String studentId);

}
