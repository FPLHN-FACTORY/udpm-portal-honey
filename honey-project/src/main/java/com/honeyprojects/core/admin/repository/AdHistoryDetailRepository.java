package com.honeyprojects.core.admin.repository;

import com.honeyprojects.entity.HistoryDetail;
import com.honeyprojects.repository.HistoryDetailRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdHistoryDetailRepository extends HistoryDetailRepository {
    List<HistoryDetail> findAllByGiftId(String giftId);
}
