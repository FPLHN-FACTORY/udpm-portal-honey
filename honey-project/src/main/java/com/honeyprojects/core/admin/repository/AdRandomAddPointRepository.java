package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.entity.Archive;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.repository.HoneyRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdRandomAddPointRepository extends HoneyRepository {
    @Query(value = """
            SELECT c.id, c.name, c.code
            FROM category c
            ORDER BY c.last_modified_date DESC
            """, nativeQuery = true)
    List<AdminCategoryResponse> getAllCategory();

    @Query(value = """
            SELECT *
            FROM honey
            WHERE student_id = :#{#idStudent} and honey_category_id = :#{#idCategory}
            """, nativeQuery = true)
    Optional<Honey> getHoneyByIdStudent(String idStudent, String idCategory);

    @Query(value = """
            SELECT c.id, c.name, c.code
            FROM category c WHERE c.name = :#{#nameCategory}
            """, nativeQuery = true)
    AdminCategoryResponse getCategoryByName(String nameCategory);

    @Query(value = """
            SELECT DISTINCT type
            FROM gift
            ORDER BY type ASC 
            """, nativeQuery = true)
    List<Integer> getAllTypeGift();

    @Query(value = """
            SELECT *
            FROM gift
            WHERE type = :#{#typeNumber}
            ORDER BY type ASC 
            """, nativeQuery = true)
    List<AdminGiftResponse> getGiftByType(Integer typeNumber);

    @Query(value = """
            SELECT DISTINCT *
            FROM archive
            WHERE student_id = :#{#idStudent}
            """, nativeQuery = true)
    Archive getArchiveByIdStudent(String idStudent);
}
