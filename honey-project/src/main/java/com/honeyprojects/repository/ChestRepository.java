package com.honeyprojects.repository;

import com.honeyprojects.entity.Chest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(ChestRepository.NAME)
public interface ChestRepository extends JpaRepository<Chest, String> {
    public static final String NAME = "BaseChestRepository";
}
