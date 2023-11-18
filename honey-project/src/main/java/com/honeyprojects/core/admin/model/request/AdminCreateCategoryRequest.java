package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import com.honeyprojects.entity.Category;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.CategoryTransaction;
import com.honeyprojects.infrastructure.contant.TypeCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Random;

@Getter
@Setter
public class AdminCreateCategoryRequest extends PageableRequest {

    @NotBlank(message = "Tên không được để trống")
    @Size(min = 0, max = 250)
    private String name;

    private Integer categoryStatus;

    private Integer transactionRights;

    private MultipartFile image;

    public Category dtoToEntity(Category category) throws IOException {
        Random random = new Random();
        int number = random.nextInt(10000);
        String code = String.format("CA%04d", number);

        category.setCode(code);
        category.setName(this.name);
        if (this.categoryStatus != null) {
            category.setCategoryStatus(CategoryStatus.values()[this.getCategoryStatus()]);
        }
        if (this.transactionRights != null) {
            category.setTransactionRights(this.getTransactionRights() == 0 ? CategoryTransaction.FREE : CategoryTransaction.LIMIT);
        }
        if (this.image != null) {
            byte[] imageBytes = this.image.getBytes();
            category.setImage(imageBytes);
        }
        return category;
    }
}
