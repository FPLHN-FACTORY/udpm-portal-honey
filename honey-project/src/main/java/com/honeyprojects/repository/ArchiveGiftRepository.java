package com.honeyprojects.repository;

import com.honeyprojects.entity.ArchiveGift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository(ArchiveGiftRepository.NAME)
public interface ArchiveGiftRepository extends JpaRepository<ArchiveGift, String> {
    public static final String NAME = "BaseArchiveGiftRepository";
    Optional<ArchiveGift> findByArchiveIdAndGiftId(String archiveId, String giftId);
    Optional<ArchiveGift> findByArchiveIdAndChestId(String archiveId, String chestId);
}
