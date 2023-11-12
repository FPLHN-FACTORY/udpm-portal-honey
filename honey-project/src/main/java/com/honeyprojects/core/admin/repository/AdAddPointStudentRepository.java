package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminChestGiftResponse;
import com.honeyprojects.core.admin.model.response.AdminChestReponse;
import com.honeyprojects.core.admin.model.response.AdminImportCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminImportGiftResponse;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.repository.HoneyRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface AdAddPointStudentRepository extends HoneyRepository {

    @Query(value = """
            SELECT g.id, g.name
            from gift g
            where g.name in (:names)  and g.status in (0, 1)
            """, nativeQuery = true)
    List<AdminImportGiftResponse> getGiftsByNames(Set<String> names);

}
