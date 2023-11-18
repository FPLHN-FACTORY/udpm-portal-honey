package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.response.StudentCategoryResponse;
import com.honeyprojects.repository.CategoryRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentCategoryRepository extends CategoryRepository {
    @Query(value = """
            SELECT c.id, c.name, c.image FROM category c
            join honey h on c.id = honey_category_id
            WHERE c.category_status <> 0 and h.student_id = :idUser and c.transaction_rights = 0
            """, nativeQuery = true)
    List<StudentCategoryResponse> getCategoryByIdUser(String idUser);
}
