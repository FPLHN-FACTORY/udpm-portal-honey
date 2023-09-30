package com.honeyprojects.core.teacher.repository;

import com.honeyprojects.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TeacherClubRepository extends JpaRepository<Club,String> {

    @Query(value = """
        select c.id from club c where c.code =:code
""",nativeQuery = true)
    public String getIdGiftByCode(String code);
}
