package com.honeyprojects.entity;

import com.honeyprojects.entity.base.PrimaryEntity;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.CategoryTransaction;
import com.honeyprojects.infrastructure.contant.EntityProperties;
import com.honeyprojects.infrastructure.contant.TypeCategory;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "category")
public class Category extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_CODE)
    private String code;

    @Column(length = EntityProperties.LENGTH_NAME)
    private String name;

    private CategoryStatus categoryStatus;

    private CategoryTransaction transactionRights;

    private String image;
}
