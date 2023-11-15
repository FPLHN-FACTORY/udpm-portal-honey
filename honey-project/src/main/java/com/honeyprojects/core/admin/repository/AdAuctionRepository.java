package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminFindAuctionRequest;
import com.honeyprojects.core.admin.model.response.AdminAuctionResponse;
import com.honeyprojects.core.student.model.request.auction.StudentAuctionRoomFilterRequest;
import com.honeyprojects.core.student.model.response.StudentAuctionResponse;
import com.honeyprojects.entity.Auction;
import com.honeyprojects.repository.AuctionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdAuctionRepository extends AuctionRepository {

    @Query(value = """
             select *
             from auction
            """, nativeQuery = true)
    List<Auction> getAllAuction();

    @Query(value = """
            update auction a set a.status = 1 where a.id = :id
                        """, nativeQuery = true)
    boolean changeStatus(@Param("id") String id);

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
            JOIN semester s on g.semester_id = s.id
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
    Page<AdminAuctionResponse> findAllAuction(@Param("req") AdminFindAuctionRequest req, Pageable pageable);


    @Query(value = """
            SELECT
                ROW_NUMBER() OVER(ORDER BY a.last_modified_date DESC) AS stt,
                a.id AS id,
                a.name,
                cate.name AS category_name,
                cate.id AS category_id,
                CASE
                    WHEN a.status = 0 THEN 'HOAT_DONG'
                    WHEN a.status = 1 THEN 'KHONG_HOAT_DONG'
                END AS status
            FROM auction a
            LEFT JOIN category cate ON cate.id = a.honey_category_id
            WHERE  a.status = 0
            AND a.id_room IS NULL
            AND (:#{#req.name} IS NULL OR a.name = :#{#req.name})
            ORDER BY a.last_modified_date ASC 
            """
            , nativeQuery = true)
    List<AdminAuctionResponse> findAll(@Param("req") AdminFindAuctionRequest req);
}






