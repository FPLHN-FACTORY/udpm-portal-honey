package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminFindAuctionRequest;
import com.honeyprojects.core.admin.model.response.AdminAuctionResponse;
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
            select
            ROW_NUMBER() OVER(ORDER BY auc.last_modified_date DESC) AS stt,
            auc.id as id,
            auc.name as name,
            auc.from_date as from_date,
            auc.to_date as to_date,
            auc.starting_price as starting_price,
            auc.jump as jump,
            auc.honey as honey,
            CASE
                    WHEN auc.status = 1 THEN 'HOAT_DONG'
                    WHEN auc.status = 2 THEN 'KHONG_HOAT_DONG'
            END AS status,
            cate.name as category_name,
            cate.id as category_id
            from auction auc
            left join category cate on cate.id = auc.honey_category_id
             where  
             ( :#{#req.name} IS NULL
                OR :#{#req.name} LIKE ''
                OR auc.name LIKE %:#{#req.name}% )
             and
             ( :#{#req.honeyCategoryId} IS NULL
                OR :#{#req.honeyCategoryId} LIKE ''
                OR  cate.id LIKE %:#{#req.honeyCategoryId}%
            )
                  and
                 ( :#{#req.status} IS NULL
                     OR :#{#req.status} LIKE ''
                     OR status LIKE :#{#req.status}
                 )        
            order by auc.last_modified_date desc 
                        """, countQuery = """
            select COUNT(auc.id)
            from auction auc
            left join category cate on cate.id = auc.honey_category_id
             where  
             ( :#{#req.name} IS NULL
                OR :#{#req.name} LIKE ''
                OR auc.name LIKE %:#{#req.name}% 
              )
            and
                ( :#{#req.honeyCategoryId} IS NULL
                OR :#{#req.honeyCategoryId} LIKE ''
                OR  cate.id LIKE %:#{#req.honeyCategoryId}%
                )             
                   and
                  ( :#{#req.status} IS NULL
                      OR :#{#req.status} LIKE ''
                      OR status LIKE :#{#req.status}
                  )           
            """
            , nativeQuery = true)
    Page<AdminAuctionResponse> findAllAuction(@Param("req") AdminFindAuctionRequest req, Pageable pageable);
}






