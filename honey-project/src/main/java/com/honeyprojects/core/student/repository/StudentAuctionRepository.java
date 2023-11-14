package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.request.auction.StudentAuctionRoomFilterRequest;
import com.honeyprojects.core.student.model.response.StudentAuctionResponse;
import com.honeyprojects.repository.AuctionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentAuctionRepository extends AuctionRepository {

    @Query(value = """
            SELECT
                  ROW_NUMBER() OVER(ORDER BY a.last_modified_date DESC) AS stt,
                  a.id ,
                  a.name ,
                  g.name AS giftName,
                  a.from_date AS fromDate,
                  a.to_date AS toDate,
                  a.starting_price ,
                  a.last_price,
                  a.jump,
                  ca.name AS nameCategory,
                  ca.id AS idCategory,
                  CASE
                  WHEN a.status = 0 THEN 'HOAT_DONG'
                  WHEN a.status = 1 THEN 'KHONG_HOAT_DONG'
                  END AS status
            FROM auction a
            JOIN gift g on a.gift_id = g.id
            LEFT JOIN semester s on g.semester_id = s.id
            JOIN category ca ON ca.id = a.honey_category_id 
            WHERE (:#{#req.nameGift} IS NULL OR :#{#req.nameGift} LIKE '' OR g.name LIKE %:#{#req.nameGift}%) 
            AND (:#{#req.type} IS NULL OR :#{#req.type} LIKE '' OR g.type = :#{#req.type}) 
            AND (:#{#req.startingPrice} IS NULL OR :#{#req.startingPrice} LIKE ''  OR a.starting_price = :#{#req.startingPrice}) 
            AND (:#{#req.category} IS NULL OR :#{#req.category} LIKE '' OR ca.id LIKE %:#{#req.category}%)
            """, countQuery = """
            SELECT COUNT(a.id)
            FROM auction a
            JOIN gift g on a.gift_id = g.id
            JOIN semester s on g.semester_id = s.id
            JOIN category ca ON ca.id = a.honey_category_id 
            WHERE (:#{#req.nameGift} IS NULL OR :#{#req.nameGift} LIKE '' OR g.name LIKE %:#{#req.nameGift}%) 
            AND (:#{#req.type} IS NULL OR :#{#req.type} LIKE '' OR g.type = :#{#req.type}) 
            AND (:#{#req.startingPrice} IS NULL OR :#{#req.startingPrice} LIKE ''  OR a.starting_price = :#{#req.startingPrice}) 
            AND (:#{#req.category} IS NULL OR :#{#req.category} LIKE '' OR ca.id LIKE %:#{#req.category}%)
            """, nativeQuery = true)
    Page<StudentAuctionResponse> findAllAuctionRoom(@Param("req") StudentAuctionRoomFilterRequest req, Pageable pageable);
}
