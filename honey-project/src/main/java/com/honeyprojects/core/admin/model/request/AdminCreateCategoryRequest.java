package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.TypeCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminCreateCategoryRequest extends PageableRequest {

    @NotBlank(message = "Tên không được để trống")
    @Size(min = 0, max = 250)
    private String name;

    private TypeCategory type;

    private CategoryStatus status;
}
