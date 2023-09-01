package com.honeyprojects.core.censor.model.request;

import com.honeyprojects.infrastructure.contant.CategoryStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminUpdateCategoryRequest {
    private String name;
    private CategoryStatus categoryStatus;
}
