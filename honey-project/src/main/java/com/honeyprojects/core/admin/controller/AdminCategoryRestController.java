package com.honeyprojects.core.admin.controller;


import com.honeyprojects.core.common.base.ResponseObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/admin/category")
public class AdminCategoryRestController {
    @Autowired
    private CensorCategoryService censorCategoryService;

    @GetMapping("/crud")
    public ResponseObject getAllCategoryByCensor(final CensorCategoryRequest request) {
        return new ResponseObject(censorCategoryService.getAllCategoryByCensor(request));
    }

    @GetMapping("")
    public ResponseObject getAllCategory() {
        return new ResponseObject(censorCategoryService.getAllCategory());
    }

    @GetMapping("/list-category")
    public ResponseObject getAllListCategory() {
        return new ResponseObject(censorCategoryService.getAllListCategory());
    }

    @PostMapping("/add-category")
    public ResponseObject addCategory(@Valid @RequestBody CensorCreateCategoryRequest request) {
        return new ResponseObject(censorCategoryService.addCategory(request));
    }

    @PutMapping("/update-category/{id}")
    public ResponseObject updateCategory(@Valid @RequestBody CensorUpdateCategoryRequest request, @PathVariable("id") String id) {
        return new ResponseObject(censorCategoryService.updateCategory(request, id));
    }

    @PutMapping("/delete-category/{id}")
    public ResponseObject updateCategoryByStatus(@Valid @RequestBody CensorUpdateCategoryRequest request, @PathVariable("id") String id) {
        return new ResponseObject(censorCategoryService.updateCategoryByCategory(request, id));
    }

    @GetMapping("/get-one/{id}")
    public ResponseObject getOne(@PathVariable("id") String id) {
        return new ResponseObject(censorCategoryService.getOne(id));
    }

    @DeleteMapping("/delete-category/{id}")
    public void updateCategory(@PathVariable("id") String id) {
        censorCategoryService.deleteCategory(id);
    }


}
