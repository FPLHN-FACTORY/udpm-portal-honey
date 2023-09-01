package com.honeyprojects.core.admin.service;


import com.articlesproject.core.censor.model.request.CensorCategoryRequest;
import com.articlesproject.core.censor.model.request.CensorCreateCategoryRequest;
import com.articlesproject.core.censor.model.request.CensorUpdateCategoryRequest;
import com.articlesproject.core.censor.model.response.CensorCategoryResponse;
import com.articlesproject.core.common.base.PageableObject;
import com.articlesproject.entity.Category;

import java.util.List;

public interface AdminCategoryService {
    PageableObject<CensorCategoryResponse> getAllCategoryByCensor(CensorCategoryRequest request);

    List<CensorCategoryResponse> getAllCategory();

    List<CensorCategoryResponse> getAllListCategory();

    Category addCategory(CensorCreateCategoryRequest request);

    Category updateCategory(CensorUpdateCategoryRequest request, String id);

    void deleteCategory(String id);

    Category getOne(String id);

    Category updateCategoryByCategory(CensorUpdateCategoryRequest request, String id);
}
