package com.portalprojects.repository;

import com.portalprojects.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(TeacherRepository.NAME)
public interface TeacherRepository extends JpaRepository<Teacher, String> {

    String NAME = "BaseTeacherRepository";
}
