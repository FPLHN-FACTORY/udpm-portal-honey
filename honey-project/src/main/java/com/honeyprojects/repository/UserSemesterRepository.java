package com.honeyprojects.repository;

import com.honeyprojects.entity.UserSemester;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(UserSemesterRepository.NAME)
public interface UserSemesterRepository extends JpaRepository<UserSemester, String> {
    public static final String NAME = "BaseUserSemesterRepository";
}
