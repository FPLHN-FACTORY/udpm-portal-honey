package com.portalprojects.repository;

import com.portalprojects.entity.MissionDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

@EnableJpaRepositories
@Repository(MissionDetailRepository.NAME)
public interface MissionDetailRepository extends JpaRepository<MissionDetail,String> {

    public static final String NAME = "BaseMissionDetailRepository";
}
