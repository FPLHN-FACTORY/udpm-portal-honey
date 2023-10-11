package com.honeyprojects.core.admin.service;


import com.honeyprojects.core.admin.model.request.AdminCategoryRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateCategoryRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateCategoryRequest;
import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Category;

import java.io.IOException;
import java.util.List;

public interface AdminCategoryService {
    PageableObject<AdminCategoryResponse> getAllCategoryByAdmin(AdminCategoryRequest request);

    List<AdminCategoryResponse> getAllCategory();

    List<AdminCategoryResponse> getAllListCategory();

    Category addCategory(AdminCreateCategoryRequest request) throws IOException;

    Category updateCategory(AdminUpdateCategoryRequest request, String id) throws IOException;

    void deleteCategory(String id);

    Category getOne(String id);

    Category updateCategoryByCategory( String id);
}
