package com.honeyprojects.core.teacher.repository;

import com.honeyprojects.repository.SemesterRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherSemesterRepository extends SemesterRepository {

    @Query(value = "SELECT s.id from semester s where :dateNow between s.from_date and s.to_date", nativeQuery = true)
    String getUsByStudent(Long dateNow);
}
