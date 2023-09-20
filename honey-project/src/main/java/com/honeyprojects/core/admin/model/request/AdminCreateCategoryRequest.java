package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminCreateCategoryRequest extends PageableRequest {

    @NotBlank(message = "Tên đéo được để trống")
    @Size(min = 0, max = 250)
    private String name;
}
