package com.honeyprojects.core.admin.model.request;

import com.articlesproject.infrastructure.constant.CategoryStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminUpdateCategoryRequest {
    private String name;
    private CategoryStatus categoryStatus;
}
