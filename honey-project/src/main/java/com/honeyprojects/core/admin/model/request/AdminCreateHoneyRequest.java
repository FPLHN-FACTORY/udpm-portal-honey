package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.contant.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminCreateHoneyRequest {
    private String categoryId;
    private String studentId;
    private Integer honeyPoint;

    public Honey createHoney(Honey honey) {
        honey.setHoneyCategoryId(this.categoryId);
        honey.setStudentId(this.studentId);
        honey.setHoneyPoint(this.honeyPoint);
        honey.setStatus(Status.HOAT_DONG);
        honey.setReason(null);
        return honey;
    }
}
