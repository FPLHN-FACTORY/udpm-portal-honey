package com.portalprojects.core.admin.repository;

import com.portalprojects.entity.Gift;
import com.portalprojects.repository.GiftRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;

public interface AdGiftRepository extends GiftRepository {

//    @Query(value = """
//             SELECT * FROM gift g ORDER BY g.last_modified_date DESC
//            """, nativeQuery = true)
//    ArrayList<Gift> getAll();
}
