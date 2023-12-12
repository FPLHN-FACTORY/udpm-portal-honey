package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminAuctionChartLineRequest;
import com.honeyprojects.core.admin.model.request.AdminAuctionChartTableRequest;
import com.honeyprojects.core.admin.model.response.AdminAuctionChartLineResponse;
import com.honeyprojects.core.admin.model.response.AdminAuctionChartTableResponse;
import com.honeyprojects.core.admin.model.response.AdminAuctionStatisticResponse;
import com.honeyprojects.repository.AuctionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdAuctionChartLineRepository extends AuctionRepository {

    @Query(value = """
        SELECT DATE(FROM_UNIXTIME(a.created_date / 1000)) AS ngay, SUM(a.quantity) AS tongSoLuong, a.gift_id, g.name
        FROM honey_project.auction a join gift g on a.gift_id = g.id
        GROUP BY ngay, gift_id
        ORDER BY ngay, tongSoLuong;
    """, nativeQuery = true)
    List<AdminAuctionChartLineResponse> auctionChartLine(@Param("req") AdminAuctionChartLineRequest req);

    @Query(value = """
        SELECT
              ROW_NUMBER() OVER(ORDER BY SUM(a.quantity) DESC) AS stt,
               a.gift_id,
               SUM(a.quantity) AS tongSoLuong,
               g.name
        FROM honey_project.auction a
        JOIN honey_project.gift g ON a.gift_id = g.id
        GROUP BY gift_id
        ORDER BY tongSoLuong DESC
        ;
    """, nativeQuery = true)
    Page<AdminAuctionChartTableResponse> getAuctionTable(@Param("req") AdminAuctionChartTableRequest req,
                                                         Pageable pageable);

    @Query(value = """
        SELECT
            CAST(COALESCE(COUNT(a.id), 0) AS SIGNED) AS id_count,
            CAST(COALESCE(SUM(quantity), 0) AS SIGNED) AS total_quantity,
            CAST(COALESCE(SUM(starting_price), 0) AS SIGNED) AS total_starting_price,
            CAST(COALESCE(SUM(last_price), 0) AS SIGNED) AS total_last_price
        FROM honey_project.auction a;
    """, nativeQuery = true)
    AdminAuctionStatisticResponse getAuctionStatistic();
}
