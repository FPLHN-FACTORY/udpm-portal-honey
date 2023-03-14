package com.portalprojects.repository;

import com.portalprojects.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository(MissionDetailRepository.NAME)
public interface StudentRepository extends JpaRepository<Student,String> {

    String NAME  = "BaseStudentRepository";
}
