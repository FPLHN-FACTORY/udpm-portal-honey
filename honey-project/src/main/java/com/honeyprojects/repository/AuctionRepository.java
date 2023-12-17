package com.honeyprojects.repository;

import com.honeyprojects.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository(AuctionRepository.NAME)
public interface AuctionRepository extends JpaRepository<Auction, String> {
    public static final String NAME = "BaseAuctionRepository";

    @Query(value = """
        SELECT a.* FROM honey_project.auction a
        WHERE a.to_date < UNIX_TIMESTAMP(NOW()) AND a.status = 1;
    """, nativeQuery = true)
    List<Auction> findAllAuctionNotActive();
}
