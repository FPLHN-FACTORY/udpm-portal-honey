package com.honeyprojects.core.admin.service.impl;


import com.honeyprojects.core.admin.model.request.AdminCategoryRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateCategoryRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateCategoryRequest;
import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.repository.AdminCategoryRepository;
import com.honeyprojects.core.admin.service.AdminCategoryService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.entity.Category;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.CategoryTransaction;
import com.honeyprojects.infrastructure.contant.Message;
import com.honeyprojects.infrastructure.contant.TypeCategory;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunction;
import com.honeyprojects.infrastructure.rabbit.RabbitProducer;
import com.honeyprojects.util.LoggerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AdminCategoryServiceImpl implements AdminCategoryService {

    @Autowired
    private AdminCategoryRepository adminCategoryRepository;

    @Autowired
    private RabbitProducer rabbitProducer;

    @Autowired
    private LoggerUtil loggerUtil;

    @Autowired
    private UdpmHoney udpmHoney;

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
    public Category addCategory(AdminCreateCategoryRequest request) throws IOException {
        Category ca = request.dtoToEntity(new Category());
        adminCategoryRepository.save(ca);
        try {
            LoggerFunction loggerFunction = new LoggerFunction();
            loggerFunction.setContent("Thể loại '" + ca.getName() + " - " + ca.getCode() + "' được thêm vào hệ thống.");
            loggerFunction.setPathFile("file.csv");
            loggerFunction.setUserName(udpmHoney.getEmail());
            rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerFunction));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return ca;
    }

    @Override
    @Transactional
    public Category updateCategory(AdminUpdateCategoryRequest request, String id) throws IOException {
        Optional<Category> categoryOptional = adminCategoryRepository.findById(id);
        Category category = categoryOptional.get();
        request.dtoToEntity(category);
        return adminCategoryRepository.save(category);
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
        if (!categoryOptional.isPresent()) {
            throw new RestApiException(Message.SUCCESS);
        }
        return categoryOptional.get();
    }

    @Override
    @Transactional
    public Category updateCategoryByCategory(String id) {
        Optional<Category> categoryOptional = adminCategoryRepository.findById(id);
        categoryOptional.get().setCategoryStatus(CategoryStatus.INACTIVE);
        adminCategoryRepository.save(categoryOptional.get());
        return categoryOptional.get();
    }

}
