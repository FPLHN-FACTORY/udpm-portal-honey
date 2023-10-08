package com.honeyprojects.core.student.repository;

import com.honeyprojects.entity.Archive;
import com.honeyprojects.repository.ArchiveRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Primary
public interface StudentArchiveRepository extends ArchiveRepository {

    Optional<Archive> findByStudentId(String idStudent);

}
