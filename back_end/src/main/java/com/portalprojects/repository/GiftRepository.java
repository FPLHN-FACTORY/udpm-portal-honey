package com.portalprojects.repository;

import com.portalprojects.entity.Gift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository(GiftRepository.NAME)
public interface GiftRepository extends JpaRepository<Gift,String> {
    public static final String NAME = "BaseGiftRepository";

    @Query(value = """
                SELECT code FROM gift 
                ORDER BY created_date DESC LIMIT 1
            """, nativeQuery = true)
    String getNearestCodeGift();
}
