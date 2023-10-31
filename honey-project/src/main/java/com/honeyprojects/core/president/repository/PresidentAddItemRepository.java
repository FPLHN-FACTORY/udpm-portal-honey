package com.honeyprojects.core.president.repository;

import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminChestGiftResponse;
import com.honeyprojects.core.admin.model.response.AdminChestReponse;
import com.honeyprojects.core.president.model.response.PresidentCategoryResponse;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.repository.HoneyRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PresidentAddItemRepository extends HoneyRepository {
    @Query(value = """
            SELECT  row_number()  OVER(ORDER BY created_date DESC) as stt, id, name, code, category_status, transaction_rights
            FROM category
            where name = :categoryPoint
            """, nativeQuery = true)
    PresidentCategoryResponse getCategoryByName(String categoryPoint);

    @Query(value = """
            SELECT g.id
            from gift g
            where g.name like :#{#name} and g.status in (0, 1)
            """, nativeQuery = true)
    String getIdGiftByName(String name);
}
