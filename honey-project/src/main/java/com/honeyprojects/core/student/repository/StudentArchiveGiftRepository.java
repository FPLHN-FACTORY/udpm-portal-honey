package com.honeyprojects.core.student.repository;

import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.repository.ArchiveGiftRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentArchiveGiftRepository extends ArchiveGiftRepository {

    ArchiveGift findByGiftIdAndArchiveId(String idGift, String idArchive);

    Optional<ArchiveGift> findByGiftId(String idGift);

    List<ArchiveGift> findAllByGiftIdIn(List<String> id);
}
