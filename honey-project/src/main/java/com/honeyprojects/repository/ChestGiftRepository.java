package com.honeyprojects.repository;

import com.honeyprojects.entity.ChestGift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(ChestGiftRepository.NAME)
public interface ChestGiftRepository extends JpaRepository<ChestGift, String> {
    public static final String NAME = "BaseChestGiftRepository";
}
