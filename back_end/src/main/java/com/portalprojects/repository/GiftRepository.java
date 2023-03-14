package com.portalprojects.repository;

import com.portalprojects.entity.Gift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository()
public interface GiftRepository extends JpaRepository<Gift,String> {

    String NAME = "BaseGiftRepository";
}
