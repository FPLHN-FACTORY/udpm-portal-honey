package com.honeyprojects.core.admin.service.impl;


import com.honeyprojects.core.admin.model.request.AdminCategoryRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateCategoryRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateCategoryRequest;
import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.repository.AdminCategoryRepository;
import com.honeyprojects.core.admin.service.AdminCategoryService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Category;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.Message;
import com.honeyprojects.infrastructure.contant.TypeCategory;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AdminCategoryServiceImpl implements AdminCategoryService {

    @Autowired
    private AdminCategoryRepository adminCategoryRepository;

    @Override
    public PageableObject<AdminCategoryResponse> getAllCategoryByAdmin(AdminCategoryRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<AdminCategoryResponse> res = adminCategoryRepository.getAllCategoryByAdmin(pageable, request);
        return new PageableObject<>(res);
    }

    @Override
    public List<AdminCategoryResponse> getAllCategory() {
        return adminCategoryRepository.getAllCategory();
    }

    @Override
    public List<AdminCategoryResponse> getAllListCategory() {
        return adminCategoryRepository.getAllListCategory();
    }

    @Override
    @Transactional
    public Category addCategory(AdminCreateCategoryRequest request) {
        Random random = new Random();
        int number = random.nextInt(10000);
        String code = String.format("CA%04d", number);
        Category ca = new Category();
        ca.setCode(code);
        ca.setName(request.getName());
//        ca.setCategoryStatus(CategoryStatus.ACTIVE);
        if(request.getStatus().equals(CategoryStatus.ACCEPT)){
            ca.setCategoryStatus(CategoryStatus.ACCEPT);
        }else {
            ca.setCategoryStatus(CategoryStatus.FREE);
        }
        adminCategoryRepository.save(ca);
        return ca;
    }

    @Override
    @Transactional
    public Category updateCategory(AdminUpdateCategoryRequest request, String id) {
        Optional<Category> categoryOptional = adminCategoryRepository.findById(id);
        categoryOptional.get().setName(request.getName());
        adminCategoryRepository.save(categoryOptional.get());
        return categoryOptional.get();
    }

    @Override
    @Transactional
    public void deleteCategory(String id) {
        Optional<Category> categoryOptional = adminCategoryRepository.findById(id);
        adminCategoryRepository.delete(categoryOptional.get());
    }

    @Override
    public Category getOne(String id) {
        Optional<Category> categoryOptional = adminCategoryRepository.findById(id);
        if(!categoryOptional.isPresent()){
            throw new RestApiException(Message.SUCCESS);
        }
        return categoryOptional.get();
    }

    @Override
    @Transactional
    public Category updateCategoryByCategory(AdminUpdateCategoryRequest request, String id) {
        Optional<Category> categoryOptional = adminCategoryRepository.findById(id);
//        categoryOptional.get().setCategoryStatus(CategoryStatus.INACTIVE);
        adminCategoryRepository.save(categoryOptional.get());
        return categoryOptional.get();
    }

}
