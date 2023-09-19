package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.response.StudentUserApiResponse;
import com.honeyprojects.repository.UserRepositpry;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentUserApiRepository extends UserRepositpry {

    @Query(value = """
            SELECT u.id, u.code, u.name, u.email
            FROM user_api u
            """, nativeQuery = true)
    List<StudentUserApiResponse> getUserAPI();

}
