package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminSearchConversionRequest;
import com.honeyprojects.core.admin.model.response.AdminConversionResponse;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.repository.ConversionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdConversionRepository extends ConversionRepository {

    @Query(value = """
            SELECT c.id, c.code, c.ratio,c.gift_id,c.category_id, c.last_modified_date FROM conversion c
            ORDER BY c.last_modified_date DESC
            """, nativeQuery = true)
    List<AdminConversionResponse> getAllListResponse();

    @Query(value = """
            SELECT c.id, c.code, c.ratio,c.gift_id,c.category_id, c.last_modified_date FROM conversion c
            where (:#{#request.textSearch} IS NULL OR c.code like %:#{#request.textSearch}%)
            ORDER BY c.last_modified_date DESC
            """, nativeQuery = true)
    Page<AdminConversionResponse> getPageListResponse(Pageable pageable,
                                                      @Param("request") AdminSearchConversionRequest request);

    @Query(value = """
            SELECT c.id, c.code, c.ratio, c.gift_id,c.category_id,c.last_modified_date FROM conversion c where c.code like %:textSearch%
            ORDER BY c.last_modified_date DESC
            """, nativeQuery = true)
    Page<AdminConversionResponse> SearchByName(Pageable pageable, @Param("textSearch") String textSearch);

}
