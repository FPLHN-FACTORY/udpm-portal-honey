package com.honeyprojects.repository;

import com.honeyprojects.entity.HoneyCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(HoneyCategoryRepository.NAME)
public interface HoneyCategoryRepository extends JpaRepository<HoneyCategory, String> {
    public static final String NAME = "BaseHoneyCategoryRepository";
}
