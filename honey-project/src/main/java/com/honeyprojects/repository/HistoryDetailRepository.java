package com.honeyprojects.repository;

import com.honeyprojects.entity.HistoryDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryDetailRepository extends JpaRepository<HistoryDetail,String> {
    List<HistoryDetail>findHistoryDetailByHistoryId(String historyId);
}
