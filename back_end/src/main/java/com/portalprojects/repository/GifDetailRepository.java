package com.portalprojects.repository;

import com.portalprojects.entity.GiftDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(GifDetailRepository.NAME)
public interface GifDetailRepository extends JpaRepository<GiftDetail,String> {

    String NAME = "BaseGifDetailRepository";
}
