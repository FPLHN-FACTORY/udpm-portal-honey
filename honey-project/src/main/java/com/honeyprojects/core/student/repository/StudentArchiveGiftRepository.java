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
        SELECT ag.* FROM archive_gift ag 
        JOIN gift g ON ag.gift_id = g.id
         JOIN archive a ON a.id = ag.archive_id
         WHERE expiry NOT IN ('HET_HAN', 'CHUA_HOAT_DONG') AND ag.gift_id in (:id) AND a.student_id in (:idUser)
    """, nativeQuery = true)
    List<ArchiveGift> findAllByGiftIdIn(@Param("id") List<String> id, @Param("idUser") String idUser);
}
