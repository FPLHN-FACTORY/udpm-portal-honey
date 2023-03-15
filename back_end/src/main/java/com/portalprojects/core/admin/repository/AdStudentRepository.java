package com.portalprojects.core.admin.repository;

import com.portalprojects.entity.Student;
import com.portalprojects.repository.StudentRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdStudentRepository extends StudentRepository {

    @Query(value = """
    SELECT * FROM student 
     """,nativeQuery = true)
    List<Student> getAll();

    @Query(value = """
      SELECT * FROM student s WHERE s.code =  :studentId
     """,nativeQuery = true)
    Student findByCode(@Param("studentId") String studentId);
}
