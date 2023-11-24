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
            WHERE c.category_status <> 0 and c.transaction_rights = 0
            """, nativeQuery = true)
    StudentCategoryResponse getCategory();
}
