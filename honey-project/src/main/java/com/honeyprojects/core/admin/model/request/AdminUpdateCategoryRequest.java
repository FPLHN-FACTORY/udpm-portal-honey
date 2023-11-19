package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.entity.Category;
import com.honeyprojects.infrastructure.configution.CloudinaryUploadImages;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.CategoryTransaction;
import com.honeyprojects.infrastructure.contant.TypeCategory;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Random;

@Getter
@Setter
public class AdminUpdateCategoryRequest {

    @Autowired
    private CloudinaryUploadImages cloudinaryUploadImages;

    @NotBlank
    private String name;

    private Integer categoryStatus;

    private Integer transactionRights;

    private MultipartFile image;

//    public Category dtoToEntity(Category category) throws IOException {
//        category.setName(this.name);
//        if (this.categoryStatus != null) {
//            category.setCategoryStatus(CategoryStatus.values()[this.getCategoryStatus()]);
//        }
//        if (this.transactionRights != null) {
//            category.setTransactionRights(this.getTransactionRights() == 0 ? CategoryTransaction.FREE : CategoryTransaction.LIMIT);
//        }
//        if (this.image != null) {
//            cloudinaryUploadImages.deleteImage(category.getImage());
//            category.setImage(cloudinaryUploadImages.uploadImage(image));
//        }
//        return category;
//    }
}
