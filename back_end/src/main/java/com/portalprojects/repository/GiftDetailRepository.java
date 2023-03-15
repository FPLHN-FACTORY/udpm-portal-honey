package com.portalprojects.repository;

import com.portalprojects.entity.GiftDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(GiftDetailRepository.NAME)
public interface GiftDetailRepository extends JpaRepository<GiftDetail,String> {

    String NAME = "BaseGiftDetailRepository";
}
