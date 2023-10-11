package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.CategoryTransaction;
import com.honeyprojects.infrastructure.contant.TypeCategory;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class AdminUpdateCategoryRequest {
    @NotBlank
    private String name;

    private Integer categoryStatus;

    private Integer transactionRights;

    private MultipartFile image;
}
