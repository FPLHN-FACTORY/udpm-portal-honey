package com.honeyprojects.repository;

import com.honeyprojects.entity.ArchiveGift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArchiveGiftRepository extends JpaRepository<ArchiveGift, String> {
}
