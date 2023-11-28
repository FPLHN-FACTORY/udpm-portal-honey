package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.response.AdminGiftDetailResponse;
import com.honeyprojects.entity.GiftDetail;
import com.honeyprojects.repository.GiftDetailRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdGiftDetailRepository extends GiftDetailRepository {

    List<GiftDetail> findAllByCategoryId(String categoryId);

    void deleteAllByGiftId(String idGift);

    @Query(value = """
    select gd.id, gd.gift_id, gd.category_id, c.name as category_name,gd.honey from gift_detail gd 
    JOIN category c On c.id = gd.category_id
    where gift_id = :idGift
""", nativeQuery = true)
    List<AdminGiftDetailResponse> listGiftDetailByGiftId(String idGift);
}
