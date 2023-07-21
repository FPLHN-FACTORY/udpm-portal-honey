package com.honeyprojects.repository;

import com.honeyprojects.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(TeacherRepository.NAME)
public interface TeacherRepository extends JpaRepository<Teacher, String> {
    public static final String NAME = "BaseTeacherRepository";
}
