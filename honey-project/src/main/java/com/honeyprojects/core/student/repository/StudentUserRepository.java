package com.honeyprojects.core.student.repository;

import com.honeyprojects.core.student.model.response.StudentMyHoneyResponse;
import com.honeyprojects.core.student.model.response.StudentUserResponse;
import com.honeyprojects.repository.UserRepositpry;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentUserRepository extends UserRepositpry {

    @Query(value = """
            SELECT h.honey_point, c.name
                 FROM honey h
                 JOIN category c ON h.honey_category_id = c.id
                 WHERE h.student_id = :userId
             """, nativeQuery = true)
    List<StudentMyHoneyResponse> getHoney(String userId);

}
