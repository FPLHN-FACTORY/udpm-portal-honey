package com.honeyprojects.entity;

import com.honeyprojects.entity.base.PrimaryEntity;
import com.honeyprojects.infrastructure.contant.EntityProperties;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.contant.StatusGift;
import com.honeyprojects.infrastructure.contant.TypeGift;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "gift")
public class Gift extends PrimaryEntity {

    @Column(length = EntityProperties.LENGTH_CODE)
    private String code;

    @Column(length = EntityProperties.LENGTH_NAME)
    private String name;

    private StatusGift status;

    private TypeGift type;

    private Integer quantity;

    private Long toDate;

    private Long fromDate;

    @Column(length = EntityProperties.LENGTH_ID)
    private String honeyCategoryId;

    private Integer honey;

    private String note;

    @Column(length = EntityProperties.LENGTH_ID)
    private String semesterId;

    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private byte[] image;

}