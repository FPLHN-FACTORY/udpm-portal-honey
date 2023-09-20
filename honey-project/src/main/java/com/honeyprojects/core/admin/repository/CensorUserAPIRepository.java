package com.honeyprojects.core.admin.repository;

import com.honeyprojects.core.admin.model.response.CensorUserApiResponse;
import com.honeyprojects.repository.UserRepositpry;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CensorUserAPIRepository extends UserRepositpry {

    @Query(value = """
            SELECT u.id, u.code, u.name, u.email
            FROM user_api u
            LEFT JOIN user_semester us ON us.student_id = u.id
            LEFT JOIN semester s On us.semester_id = s.id
            WHERE u.code = :code AND :dateNow BETWEEN s.from_date AND s.to_date
            """, nativeQuery = true)
    CensorUserApiResponse getUserApiByCode(String code, @Param("dateNow") Long dateNow);

    @Query(value = """
            SELECT u.id, u.code, u.name, u.email
            FROM user_api u
            LEFT JOIN user_semester us ON us.student_id = u.id
            LEFT JOIN semester s On us.semester_id = s.id
            WHERE u.id = :id AND :dateNow BETWEEN s.from_date AND s.to_date
            """, nativeQuery = true)
    CensorUserApiResponse getUserApiById(String id, @Param("dateNow") Long dateNow);
}
