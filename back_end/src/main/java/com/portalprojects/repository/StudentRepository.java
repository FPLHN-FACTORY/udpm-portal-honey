package com.portalprojects.repository;

import com.portalprojects.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository(StudentRepository.NAME)
public interface StudentRepository extends JpaRepository<Student,String> {

    String NAME  = "BaseStudentRepository";

    @Query(value = """
      SELECT * FROM student s WHERE s.code =  :studentId
     """,nativeQuery = true)
    Student findByCode(@Param("studentId") String studentId);

}
