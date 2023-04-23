package com.portalprojects.entity;

import com.portalprojects.entity.base.PrimaryEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "mission_detail")
public class MissionDetail extends PrimaryEntity {

    @Column(length = 50,nullable = false)
    private String studentId;

    @Column(length = 50,nullable = false)
    private String missionId;
	
	private String docName;
	
	private String docType;
	
	private long size;

	@Lob
	private byte[] data;
	
	private Date uploadTime;
	
	private int status;

}
