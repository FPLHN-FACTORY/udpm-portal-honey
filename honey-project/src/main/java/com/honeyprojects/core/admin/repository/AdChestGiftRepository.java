package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.request.AdminChestGiftRequest;
import com.honeyprojects.core.admin.model.response.AdminChestGiftResponse;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.entity.ChestGift;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.repository.ChestGiftRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdChestGiftRepository extends ChestGiftRepository {

    @Query(value = """
            SELECT cg.id, cg.chest_id, cg.created_date, cg.last_modified_date, cg.gift_id FROM chest_gift cg WHERE cg.chest_id = :chestId
            """, nativeQuery = true)
    List<ChestGift> listChestGift(String chestId);

    @Query(value = """
            SELECT DISTINCT g.id, g.code, g.name, g.to_date, g.from_date FROM gift g JOIN chest_gift cg ON g.id = cg.gift_id WHERE cg.chest_id = :chestId                
                   """, nativeQuery = true)
    List<AdminChestGiftResponse> getChestGift(String chestId);

    List<ChestGift> getChestGiftsByChestId(String chestId);

    @Query(value = """
            SELECT  g.id, g.code, g.name
            FROM gift g
            LEFT JOIN chest_gift cg ON cg.gift_id = g.id AND cg.chest_id = :idChest
            WHERE cg.id IS NULL
            """, nativeQuery = true)
    List<AdminGiftResponse> findGiftNotJoinChest(String idChest);

}
