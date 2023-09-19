package com.honeyprojects.core.student.repository;

import com.honeyprojects.repository.SemesterRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentUserSemesterRepository extends SemesterRepository {
    @Query(value = "SELECT s.id from user_semester u join Semester s where " +
            "u.student_id = :idStudent and"
           , nativeQuery = true)
    String getSemesterByStudent(String idStudent);
}
