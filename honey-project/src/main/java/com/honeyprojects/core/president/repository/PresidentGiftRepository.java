package com.honeyprojects.core.president.repository;

import com.honeyprojects.core.president.model.response.PresidentExportGiftResponse;
import com.honeyprojects.repository.GiftRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PresidentGiftRepository extends GiftRepository {

    @Query(value = """
            SELECT g.name, g.status from gift g
            where status <> 2
            """, nativeQuery = true)
    List<PresidentExportGiftResponse> getGiftToExport();
}
