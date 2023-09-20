package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.infrastructure.contant.CategoryStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminUpdateCategoryRequest {
    @NotBlank
    private String name;
    private CategoryStatus categoryStatus;
}
