package com.honeyprojects.repository;

import com.honeyprojects.entity.ClubGift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(ClubGiftRepository.NAME)
public interface ClubGiftRepository extends JpaRepository<ClubGift, String> {
    public static final String NAME = "BaseClubGiftRepository";
}
