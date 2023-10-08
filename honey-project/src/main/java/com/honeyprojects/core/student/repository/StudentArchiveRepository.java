package com.honeyprojects.core.student.repository;

import com.honeyprojects.entity.Archive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentArchiveRepository extends JpaRepository<Archive, String> {

    Optional<Archive> findByStudentId(String idStudent);

}
