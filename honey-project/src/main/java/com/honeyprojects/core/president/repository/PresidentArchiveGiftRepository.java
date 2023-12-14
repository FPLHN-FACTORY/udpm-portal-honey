package com.honeyprojects.core.president.repository;

import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.repository.ArchiveGiftRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PresidentArchiveGiftRepository extends ArchiveGiftRepository {

    List<ArchiveGift> findAllByGiftId(String idGift);
    List<ArchiveGift> findAllByChestId(String chestId);
    Optional<ArchiveGift> findByArchiveIdAndGiftId(String archiveId, String giftId);
    Optional<ArchiveGift> findByArchiveIdAndChestId(String archiveId, String chestId);

}
