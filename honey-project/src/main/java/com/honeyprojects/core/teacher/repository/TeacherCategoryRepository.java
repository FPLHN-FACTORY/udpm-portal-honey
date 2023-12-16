package com.honeyprojects.core.teacher.repository;

import com.honeyprojects.core.admin.model.response.AdminExportCategoryResponse;
import com.honeyprojects.core.teacher.model.response.TeacherCategoryResponse;
import com.honeyprojects.entity.Category;
import com.honeyprojects.repository.CategoryRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface TeacherCategoryRepository extends CategoryRepository {
    @Query(value = """
            SELECT c.id, c.name, c.category_status FROM category c
            WHERE c.category_status <> 0
            """, nativeQuery = true)
    List<TeacherCategoryResponse> getAllCategory();

    @Query(value = """
            SELECT  c.id, c.name, c.category_status
            FROM category c
            WHERE c.name IN (:names) AND c.category_status <> 0
            """, nativeQuery = true)
    List<TeacherCategoryResponse> getCategoriesByNames(Set<String> names);

    @Query(value = """
            SELECT c.name, c.category_status FROM category c
            WHERE c.category_status <> 0
            """, nativeQuery = true)
    List<AdminExportCategoryResponse> getCategoryToExport();

    @Query(value = """
            SELECT c.id, c.name, c.category_status FROM category c
            WHERE c.category_status <> 0 and c.id = :id
            """, nativeQuery = true)
    TeacherCategoryResponse getCategoryById(String id);
}
