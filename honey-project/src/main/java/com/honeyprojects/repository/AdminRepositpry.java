package com.honeyprojects.repository;

import com.honeyprojects.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(AdminRepositpry.NAME)
public interface AdminRepositpry extends JpaRepository<Admin, String> {
    public static final String NAME = "BaseAdminRepository";
}
