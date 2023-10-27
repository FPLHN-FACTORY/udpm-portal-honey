package com.honeyprojects.repository;

import com.honeyprojects.entity.GiftDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(GiftDetailRepository.NAME)
public interface GiftDetailRepository extends JpaRepository<GiftDetail, String> {
    public static final String NAME = "BaseGiftDetailRepository";
}
