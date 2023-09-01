package com.honeyprojects.core.censor.service;


import com.honeyprojects.core.censor.model.request.AdminCategoryRequest;
import com.honeyprojects.core.censor.model.request.AdminCreateCategoryRequest;
import com.honeyprojects.core.censor.model.request.AdminUpdateCategoryRequest;
import com.honeyprojects.core.censor.model.response.AdminCategoryResponse;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Category;

import java.util.List;

public interface AdminCategoryService {
    PageableObject<AdminCategoryResponse> getAllCategoryByAdmin(AdminCategoryRequest request);

    List<AdminCategoryResponse> getAllCategory();

    List<AdminCategoryResponse> getAllListCategory();

    Category addCategory(AdminCreateCategoryRequest request);

    Category updateCategory(AdminUpdateCategoryRequest request, String id);

    void deleteCategory(String id);

    Category getOne(String id);

    Category updateCategoryByCategory(AdminUpdateCategoryRequest request, String id);
}
