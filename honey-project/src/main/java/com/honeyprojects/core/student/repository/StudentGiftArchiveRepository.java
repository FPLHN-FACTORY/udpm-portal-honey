package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.request.StudentArchiveFilterRequest;
import com.honeyprojects.core.student.model.request.StudentArchiveOpenChestRequest;
import com.honeyprojects.core.student.model.response.StudentArchiveGetChestResponse;
import com.honeyprojects.core.student.model.response.StudentArchiveResponse;
import com.honeyprojects.repository.ArchiveGiftRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Primary
public interface StudentGiftArchiveRepository extends ArchiveGiftRepository {
    @Query(value = """
                    SELECT ROW_NUMBER() OVER(ORDER BY a.created_date DESC) AS stt, ag.id, g.code, g.name, g.status, g.type, g.to_date, g.from_date, g.image 
                    FROM archive_gift ag JOIN archive a ON ag.archive_id = a.id 
                    LEFT JOIN gift g ON ag.gift_id = g.id 
                    WHERE (a.student_id = :#{#req.idStudent})
                    AND (:#{#req.status} IS NULL OR g.status = :#{#req.status})
                    AND (:#{#req.type} IS NULL OR g.type = :#{#req.type})
            """, nativeQuery = true)
    Page<StudentArchiveResponse> getAllGiftArchive(@Param("req") StudentArchiveFilterRequest req, Pageable pageable);

    @Query(value = """
                    SELECT ROW_NUMBER() OVER(ORDER BY a.created_date DESC) AS stt, ag.id, c.id AS chestId, c.name
                    FROM archive_gift ag
            		JOIN chest c ON ag.chest_id = c.id
            		JOIN archive a ON ag.archive_id = a.id
            		WHERE (a.student_id = :#{#filterRequest.idStudent})
            """, nativeQuery = true)
    Page<StudentArchiveGetChestResponse> getChestArchive(StudentArchiveFilterRequest filterRequest, Pageable pageable);

    @Query(value = """
            SELECT cg.gift_id FROM chest_gift cg JOIN chest c
            ON cg.chest_id = c.id
            WHERE c.id = :#{#req.chestId}
            """, nativeQuery = true)
    List<String> listGiftId(@Param("req") StudentArchiveOpenChestRequest req);

}
