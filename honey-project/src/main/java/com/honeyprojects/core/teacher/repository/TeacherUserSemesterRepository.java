package com.honeyprojects.core.teacher.repository;

import com.honeyprojects.repository.UserSemesterRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherUserSemesterRepository extends UserSemesterRepository {

    @Query(value = "SELECT s.id from user_semester u join Semester s where " +
            "u.student_id = :idStudent and" +
            " :dateNow between s.from_date and s.to_date", nativeQuery = true)
    String getUsByStudent(String idStudent, Long dateNow);
}
