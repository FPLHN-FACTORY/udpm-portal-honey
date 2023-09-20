package com.honeyprojects.repository;

import com.honeyprojects.entity.UserAPI;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(UserRepositpry.NAME)
public interface UserRepositpry extends JpaRepository<UserAPI, String> {
    public static final String NAME = "BaseAdminRepository";
}
