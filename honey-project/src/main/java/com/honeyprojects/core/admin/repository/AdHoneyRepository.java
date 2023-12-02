package com.honeyprojects.core.admin.repository;

import com.honeyprojects.entity.Honey;
import com.honeyprojects.repository.HoneyRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdHoneyRepository extends HoneyRepository {

    List<Honey> findAllByHoneyCategoryId(String id);

    @Query("SELECT h FROM Honey h WHERE h.studentId = :studentId AND h.honeyCategoryId = :honeyCategoryId")
    Honey getPoint(String studentId, String honeyCategoryId);

    @Query(value = """
            SELECT h.honey_point 
            FROM Honey h 
            WHERE h.student_id = :studentId 
            AND h.honey_category_id IS NULL OR h.honey_category_id = '' OR h.honey_category_id = :honeyCategoryId 
            """, nativeQuery = true)
    Integer getPointByIdStudentAndIdCategory(String studentId, String honeyCategoryId);

}
