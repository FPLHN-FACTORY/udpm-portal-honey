package com.honeyprojects.core.president.repository;

import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminChestGiftResponse;
import com.honeyprojects.core.admin.model.response.AdminChestReponse;
import com.honeyprojects.core.president.model.response.PresidentCategoryResponse;
import com.honeyprojects.core.president.model.response.PresidentGiftResponse;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.repository.HoneyRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface PresidentAddItemRepository extends HoneyRepository {
    @Query(value = """
            SELECT  c.id, c.name 
            FROM category c
            where c.name in (:names)
            """, nativeQuery = true)
    List<PresidentCategoryResponse> getCategoriesByNames(Set<String> names);

    @Query(value = """
            SELECT g.id, g.name
            from gift g
            where g.name in (:names)  and g.status in (0, 1)
            """, nativeQuery = true)
    List<PresidentGiftResponse> getGiftsByNames(Set<String> names);

}
