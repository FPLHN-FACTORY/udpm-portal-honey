package com.honeyprojects.core.admin.controller;


import com.honeyprojects.core.admin.model.request.AdminCategoryRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateCategoryRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateCategoryRequest;
import com.honeyprojects.core.admin.service.AdminCategoryService;
import com.honeyprojects.core.common.base.ResponseObject;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@RestController
@RequestMapping("/api/censor/category")

public class AdminCategoryRestController {

    @Autowired
    private AdminCategoryService adminCategoryService;

    @GetMapping("")
    public ResponseObject getAllCategoryByAdmin(final AdminCategoryRequest request) {
        return new ResponseObject(adminCategoryService.getAllCategoryByAdmin(request));
    }

    @GetMapping("/list-category")
    public ResponseObject getAllListCategory() {
        return new ResponseObject(adminCategoryService.getAllListCategory());
    }

    @PostMapping("")
    public ResponseObject addCategory(@Valid @ModelAttribute AdminCreateCategoryRequest request) throws IOException {
        return new ResponseObject(adminCategoryService.addCategory(request));
    }

    @PutMapping("/{id}")
    public ResponseObject updateCategory(@Valid @ModelAttribute AdminUpdateCategoryRequest request, @PathVariable("id") String id) throws IOException {
        return new ResponseObject(adminCategoryService.updateCategory(request, id));
    }

    @PutMapping("/delete/{id}")
    public ResponseObject delete(@Valid @PathVariable("id") String id) {
        return new ResponseObject(adminCategoryService.updateCategoryByCategory(id));
    }

    @GetMapping("/get-one/{id}")
    public ResponseObject getOne(@PathVariable("id") String id) {
        return new ResponseObject(adminCategoryService.getOne(id));
    }

    @DeleteMapping("/delete-category/{id}")
    public void updateCategory(@PathVariable("id") String id) {
        adminCategoryService.deleteCategory(id);
    }

}
