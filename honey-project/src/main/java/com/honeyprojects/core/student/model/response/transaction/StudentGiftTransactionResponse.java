package com.honeyprojects.core.student.model.response.transaction;

import com.honeyprojects.entity.base.IsIdentified;

public interface StudentGiftTransactionResponse extends IsIdentified {
    String getName();
    String getImage();
    Integer getQuantity();
}
