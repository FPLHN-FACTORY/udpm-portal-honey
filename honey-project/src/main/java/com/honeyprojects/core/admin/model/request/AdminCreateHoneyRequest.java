package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.entity.Honey;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminCreateHoneyRequest {
    private String categoryId;
    private String studentId;
    private String semesterId;
    private Integer honeyPoint;

    public Honey createHoney(Honey honey) {
        honey.setHoneyCategoryId(this.categoryId);
        honey.setStudentId(this.studentId);
        honey.setUserSemesterId(this.semesterId);
        honey.setHoneyPoint(this.honeyPoint);
        honey.setStatus(null);
        honey.setReason(null);
        return honey;
    }
}
