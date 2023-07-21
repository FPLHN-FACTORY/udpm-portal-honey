package com.honeyprojects.repository;

import com.honeyprojects.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(StudentRepository.NAME)
public interface StudentRepository extends JpaRepository<Student,String> {
    public static final String NAME = "BaseStudentRepository";
}
