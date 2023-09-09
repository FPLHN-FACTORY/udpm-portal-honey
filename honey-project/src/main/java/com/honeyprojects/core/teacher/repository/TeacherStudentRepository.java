package com.honeyprojects.core.teacher.repository;

import com.honeyprojects.core.teacher.model.request.TeacherStudentRequest;
import com.honeyprojects.core.teacher.model.response.TeacherStudentResponse;
import com.honeyprojects.repository.UserRepositpry;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherStudentRepository extends UserRepositpry {

    @Query(value = """
        SELECT u.id, u.code, u.name, u.email, '0987654321' as 'phone', '17.3' as 'khoa'
        FROM user_api u
        LEFT JOIN user_semester us ON u.id = us.student_id
        LEFT JOIN semester s ON us.semester_id = s.id
        WHERE u.code = :#{#studentRequest.codeStudent} AND :dateNow BETWEEN s.from_date AND s.to_date;
        """, nativeQuery = true)
    TeacherStudentResponse getStudent(TeacherStudentRequest studentRequest, @Param("dateNow") Long dateNow);

}
