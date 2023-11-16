package com.honeyprojects.core.student.model.response;

import com.honeyprojects.entity.base.IsIdentified;
import org.springframework.beans.factory.annotation.Value;

public interface StudentCategoryResponse extends IsIdentified {
    String getName();
    String getImage();
}
