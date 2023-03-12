package com.portalprojects.infrastructure.listener;

import com.portalprojects.entity.base.PrimaryEntity;
import jakarta.persistence.PrePersist;
import java.util.UUID;
public class CreatePrimaryEntityListener {


    @PrePersist
    private void onCreate(PrimaryEntity entity){
        entity.setId(UUID.randomUUID().toString());
    }
}
