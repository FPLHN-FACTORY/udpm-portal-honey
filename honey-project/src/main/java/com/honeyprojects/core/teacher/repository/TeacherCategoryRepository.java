package com.honeyprojects.core.teacher.repository;

import com.honeyprojects.core.teacher.model.response.TeacherCategoryResponse;
import com.honeyprojects.entity.Category;
import com.honeyprojects.repository.CategoryRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherCategoryRepository extends CategoryRepository {
    @Query(value = """
            SELECT c.id, c.name FROM category c
            WHERE c.category_status <> 0
            """, nativeQuery = true)
    List<TeacherCategoryResponse> getAllCategory();

    @Query(value = """
            SELECT c FROM Category c
            WHERE c.name =:name
            """)
    Category getCategoryByName(String name);
}
