package com.honeyprojects.core.admin.repository;

import com.honeyprojects.repository.HoneyRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CensorGetListStudentRepository extends HoneyRepository {

    @Query(value = """
            SELECT h.student_id FROM honey h GROUP BY h.student_id
            """, nativeQuery = true)
    List<String> listId();

}
