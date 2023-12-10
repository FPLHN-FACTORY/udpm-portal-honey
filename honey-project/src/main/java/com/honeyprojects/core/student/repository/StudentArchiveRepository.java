package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.response.StudentCategoryResponse;
import com.honeyprojects.core.student.model.response.archive.StudentArchiveByUserResponse;
import com.honeyprojects.entity.Archive;
import com.honeyprojects.entity.Category;
import com.honeyprojects.repository.ArchiveRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Primary
public interface StudentArchiveRepository extends ArchiveRepository {

    Optional<Archive> findByStudentId(String idStudent);

    @Query(value = """
            SELECT
                a.student_id AS idStudent,
                g.id AS idGift,
                g.image AS image,
                g.name AS nameGift
            FROM archive_gift ag
             JOIN archive a ON ag.archive_id = a.id
             JOIN gift g ON ag.gift_id = g.id
            WHERE a.student_id = :idUser AND g.expiry NOT IN ('HET_HAN', 'CHUA_HOAT_DONG') and g.transaction_gift <> 1
             """, nativeQuery = true)
    List<StudentArchiveByUserResponse> findArchiveByUser(@Param("idUser") String idUser);

    @Query(value = """
            SELECT
                ca.id, ca.name, ca.image
            FROM category ca
             JOIN gift_detail gd ON ca.id = gd.category_id
            WHERE gd.gift_id = :idGift and ca.category_status <> 0
            GROUP BY ca.id
             """, nativeQuery = true)
    List<StudentCategoryResponse> findCategoryByIdGift(@Param("idGift") String idGift);

}
