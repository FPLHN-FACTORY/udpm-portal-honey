package com.honeyprojects.core.teacher.repository;

import com.honeyprojects.entity.Archive;
import com.honeyprojects.repository.ArchiveRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherArchiveRepository extends ArchiveRepository {

    Optional<Archive> findByStudentId(String studentId);
}
