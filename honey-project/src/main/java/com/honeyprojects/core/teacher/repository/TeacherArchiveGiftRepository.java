package com.honeyprojects.core.teacher.repository;

import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.repository.ArchiveGiftRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherArchiveGiftRepository extends ArchiveGiftRepository {
    Optional<ArchiveGift> findByArchiveIdAndGiftId(String archiveId, String giftId);
}
