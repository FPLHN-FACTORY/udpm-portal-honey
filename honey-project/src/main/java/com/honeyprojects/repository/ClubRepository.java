package com.honeyprojects.repository;

import com.honeyprojects.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(ClubRepository.NAME)
public interface ClubRepository extends JpaRepository<Club, String> {
    public static final String NAME = "BaseClubRepository";
}
