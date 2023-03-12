package com.portalprojects.entity.base;

import com.portalprojects.infrastructure.listener.CreatePrimaryEntityListener;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(CreatePrimaryEntityListener.class)
public abstract class PrimaryEntity implements  IsIdentified{

    @Id
    @Column(length = 50,updatable = false )
    private String id;

    @Column(updatable = false)
    private Long createdDate;

    @Column
    private Long lastModifiedDate;

}
