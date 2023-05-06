package com.portalprojects.entity;

import com.portalprojects.entity.base.PrimaryEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "document")
public class Document extends PrimaryEntity {

    @Column(length = 50,nullable = true)
    private String missionDetailId;

    private String docName;

    private String docType;

    private long size;

    @Lob
    private byte[] data;

    private Date uploadTime;

    public String getMissionDetailId() {
        return missionDetailId;
    }

    public String getDocName() {
        return docName;
    }

    public String getDocType() {
        return docType;
    }

    public long getSize() {
        return size;
    }

    public byte[] getData() {
        return data;
    }

    public Date getUploadTime() {
        return uploadTime;
    }
}
