package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.response.archive.StudentArchiveByUserResponse;
import com.honeyprojects.entity.Archive;
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
                ROW_NUMBER() OVER(ORDER BY a.last_modified_date DESC) AS stt,
                a.student_id AS idStudent,
                g.id AS idGift,
                g.image AS image,
                g.name AS nameGift,
                gd.category_id AS idCategory
            FROM archive_gift ag
            LEFT JOIN archive a ON ag.archive_id = a.id
            LEFT JOIN gift g ON ag.gift_id = g.id
            LEFT JOIN gift_detail gd  ON gd.gift_id = g.id
            LEFT JOIN semester s on g.semester_id = s.id
            WHERE a.student_id = :idUser 
             """, nativeQuery = true)
    List<StudentArchiveByUserResponse> findArchiveByUser(@Param("idUser") String idUser);

}
