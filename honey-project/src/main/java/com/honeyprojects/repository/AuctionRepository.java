package com.honeyprojects.repository;

import com.honeyprojects.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(AuctionRepository.NAME)
public interface AuctionRepository extends JpaRepository<Auction, String> {
    public static final String NAME = "BaseAuctionRepository";
}
