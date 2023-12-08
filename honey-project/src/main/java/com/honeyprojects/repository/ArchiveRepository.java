package com.honeyprojects.repository;

import com.honeyprojects.entity.Archive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository(ArchiveRepository.NAME)
public interface ArchiveRepository extends JpaRepository<Archive, String> {
    public static final String NAME = "BaseArchiveRepository";
    Optional<Archive> findByStudentId(String studentId);
}
