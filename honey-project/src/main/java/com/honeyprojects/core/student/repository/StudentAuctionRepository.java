package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.request.auction.StudentAuctionFilterRequest;
import com.honeyprojects.core.student.model.response.StudentAuctionResponse;
import com.honeyprojects.repository.AuctionRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentAuctionRepository extends AuctionRepository {

    @Query(value = """
            SELECT
                ROW_NUMBER() OVER(ORDER BY a.last_modified_date DESC) AS stt,
                a.id AS id,
                a.id_room AS idRoom,
                a.name,
                a.starting_price ,
                a.last_price,
                a.honey,
                a.gift_id,
                a.honey_category_id,
                g.name AS gift_name,
                a.jump,
                CASE
                    WHEN a.status = 0 THEN 'HOAT_DONG'
                    WHEN a.status = 1 THEN 'KHONG_HOAT_DONG'
                END AS status,
                a.from_date,
                a.to_date,
                g.image,
                g.note 
            FROM auction a
            LEFT JOIN gift g on a.gift_id = g.id
            WHERE  a.status = 0
            AND a.id_room = :#{#req.id} AND a.honey_category_id = :#{#req.idCategory} 
            AND (:#{#req.name} IS NULL OR :#{#req.name} LIKE '' OR a.name LIKE %:#{#req.name}%)
            AND (:#{#req.nameGift} IS NULL OR :#{#req.nameGift} LIKE '' OR g.name LIKE %:#{#req.nameGift}%)
            AND (:#{#req.startingPrice} IS NULL OR a.starting_price = :#{#req.startingPrice})
            AND (:#{#req.lastPrice} IS NULL OR a.last_price = :#{#req.lastPrice})
            AND (:#{#req.jump} IS NULL OR a.jump = :#{#req.jump})
            ORDER BY a.last_modified_date ASC
            """, nativeQuery = true)
    List<StudentAuctionResponse> findAllRoomById(@Param("req") StudentAuctionFilterRequest req);

    @Query(value = """
            SELECT
                ROW_NUMBER() OVER(ORDER BY a.last_modified_date DESC) AS stt,
                a.id AS id,
                a.id_room AS idRoom,
                a.name,
                a.starting_price ,
                a.last_price,
                a.honey,
                a.gift_id,
                a.honey_category_id,
                g.name AS gift_name,
                a.jump,
                CASE
                    WHEN a.status = 0 THEN 'HOAT_DONG'
                    WHEN a.status = 1 THEN 'KHONG_HOAT_DONG'
                END AS status,
                a.from_date,
                a.to_date,
                g.image,
                g.note 
            FROM auction a
            LEFT JOIN gift g on a.gift_id = g.id
            WHERE  a.status = 0
            AND a.id = :id 
            """, nativeQuery = true)
    StudentAuctionResponse getOneRoomById(@Param("id") String id);
}
