package com.honeyprojects.core.student.repository;

import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.repository.ArchiveGiftRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentArchiveGiftRepository extends ArchiveGiftRepository {

    ArchiveGift findByGiftIdAndArchiveId(String idGift, String idArchive);

    Optional<ArchiveGift> findByGiftId(String idGift);

    Optional<ArchiveGift> findByGiftIdAndAndArchiveId(String idGift, String archiveId);

    @Query(value = """
        SELECT ag.* FROM archive_gift ag JOIN gift g ON ag.gift_id = g.id WHERE g.status <> 2 AND ag.gift_id in (:id)
    """, nativeQuery = true)
    List<ArchiveGift> findAllByGiftIdIn(@Param("id") List<String> id);
}
