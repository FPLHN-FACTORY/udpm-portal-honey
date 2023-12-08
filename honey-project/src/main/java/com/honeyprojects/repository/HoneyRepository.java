package com.honeyprojects.repository;

import com.honeyprojects.entity.Honey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository(HoneyRepository.NAME)
public interface HoneyRepository extends JpaRepository<Honey, String> {
    public static final String NAME = "BaseHoneyRepository";
    List<Honey> findAllByStudentIdAndHoneyCategoryId(String studentId, String categoryId);
}
