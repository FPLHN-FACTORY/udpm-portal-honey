package com.honeyprojects.core.admin.repository;

import com.honeyprojects.entity.Honey;
import com.honeyprojects.repository.HoneyRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdHoneyRepository extends HoneyRepository {
    @Query("SELECT h FROM Honey h WHERE h.studentId = :studentId AND h.honeyCategoryId = :honeyCategoryId AND h.userSemesterId = :userSemesterId")
    Honey getPoint(String studentId, String honeyCategoryId, String userSemesterId);

}
