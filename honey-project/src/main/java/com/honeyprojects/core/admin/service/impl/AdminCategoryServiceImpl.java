package com.honeyprojects.core.admin.service.impl;


import com.honeyprojects.core.admin.model.request.AdminCategoryRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateCategoryRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateCategoryRequest;
import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.repository.AdGiftDetailRepository;
import com.honeyprojects.core.admin.repository.AdminCategoryRepository;
import com.honeyprojects.core.admin.service.AdminCategoryService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.entity.Category;
import com.honeyprojects.infrastructure.configution.CloudinaryUploadImages;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.CategoryTransaction;
import com.honeyprojects.infrastructure.contant.Message;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunction;
import com.honeyprojects.infrastructure.rabbit.RabbitProducer;
import com.honeyprojects.util.CloudinaryUtils;
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
    private UdpmHoney udpmHoney;

    @Autowired
    private LoggerUtil loggerUtil;

    @Autowired
    private CloudinaryUploadImages cloudinaryUploadImages;

    @Autowired
    private AdGiftDetailRepository adGiftDetailRepository;

    @Override
    public PageableObject<AdminCategoryResponse> getAllCategoryByAdmin(AdminCategoryRequest request) {
        StringBuilder contentLogger = new StringBuilder();
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<AdminCategoryResponse> res = adminCategoryRepository.getAllCategoryByAdmin(pageable, request);
        Optional<AdminCategoryRequest> optionalAdminCategoryRequest = Optional.of(request);
        optionalAdminCategoryRequest.orElse(null);
        if (optionalAdminCategoryRequest.isPresent()) {
            contentLogger.append("Lấy tất cả thể loại bới role admin, censor được search theo tên là: " + request.getSearch() + ", có trạng thái là: " + request.getStatus() + ", có transactionRights là: " + request.getTransactionRights() + " và được kết quả là: " + res.getContent() + " . ");
        } else {
            contentLogger.append("Lấy tất cả thể loại bới role admin, censor có kết quả là: '" + res.getContent() + "' . ");
        }
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        loggerObject.setContent(contentLogger.toString());
        try {
            rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return new PageableObject<>(res);
    }

    @Override
    public List<AdminCategoryResponse> getAllCategory() {
        StringBuilder contentLogger = new StringBuilder();
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        loggerObject.setContent(contentLogger.toString());
        contentLogger.append("Lấy tất cả thể loại có kết quả là: '" + adminCategoryRepository.getAllCategory() + "' . ");
        try {
            rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return adminCategoryRepository.getAllCategory();
    }

    @Override
    public List<AdminCategoryResponse> getAllListCategory() {
        return adminCategoryRepository.getAllCategory();
    }

    @Override
    @Transactional
    public Category addCategory(AdminCreateCategoryRequest request) throws IOException {
        List<Category> getAllCate = adminCategoryRepository.findAll();
        StringBuilder contentLogger = new StringBuilder();
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        loggerObject.setContent(contentLogger.toString());
        Optional<AdminCreateCategoryRequest> optionalAdminCreateCategoryRequest = Optional.of(request);
        if (optionalAdminCreateCategoryRequest.isPresent()) {
            if (optionalAdminCreateCategoryRequest.isEmpty()) {
                contentLogger.append("Thêm thể loại có request là: '" + request.toString() + "' . ");
            } else {
                contentLogger.append("Thêm thể loại không có request truyền vào.");
            }
        } else {
            contentLogger.append("Thêm thể loại không có request truyền vào.");
        }
        Random random = new Random();
        int number = random.nextInt(10000);
        String code = String.format("CA%04d", number);

        Category ca = new Category();
        ca.setCode(code);
        ca.setName(request.getName());
        ca.setImage(cloudinaryUploadImages.uploadImage(request.getImage()));
        ca.setCategoryStatus(CategoryStatus.values()[request.getCategoryStatus()]);
        ca.setTransactionRights(request.getTransactionRights() == 0 ? CategoryTransaction.FREE : CategoryTransaction.LIMIT);
        adminCategoryRepository.save(ca);
        for(Category cate : getAllCate  ){
            if(request.getTransactionRights() == 0 ){
                cate.setTransactionRights(CategoryTransaction.LIMIT);
                adminCategoryRepository.save(cate);
            }
        }
        contentLogger.append("Đã lưu thể loại có id là: " + ca.getId() + ".");
        try {
            rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return ca;
    }

    @Override
    @Transactional
    public Category updateCategory(AdminUpdateCategoryRequest request, String id) throws IOException {
        List<Category> getAllCate = adminCategoryRepository.findAll();
        StringBuilder contentLogger = new StringBuilder();
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        loggerObject.setContent(contentLogger.toString());
        Optional<AdminUpdateCategoryRequest> optionalAdminCreateCategoryRequest = Optional.of(request);
        if (optionalAdminCreateCategoryRequest.isPresent()) {
            if (optionalAdminCreateCategoryRequest.isEmpty()) {
                contentLogger.append("Cập nhật thể loại có request là: '" + request.toString() + "' . ");
            } else {
                contentLogger.append("Cập nhật thể loại không có request truyền vào.");
            }
        } else {
            contentLogger.append("Cập nhật thể loại không có req model truyền vào.");
        }
        Optional<String> optionalId = Optional.of(id);
        if (optionalId.isPresent()) {
            if (optionalId.isEmpty()) {
                contentLogger.append("Cập nhật thể loại có id là: '" + id.toString() + "' . ");
            } else {
                contentLogger.append("Cập nhật thể loại không có id truyền vào.");
            }
        } else {
            contentLogger.append("Cập nhật thể loại không có id truyền vào.");
        }
        Optional<Category> categoryOptional = adminCategoryRepository.findById(id);
        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();
            category.setName(request.getName());
            if(request.getImage() != null){
                category.setImage(setImageToCloud(request, category.getImage()));
            }
            category.setCategoryStatus(CategoryStatus.values()[request.getCategoryStatus()]);
            category.setTransactionRights(request.getTransactionRights() == 0 ? CategoryTransaction.FREE : CategoryTransaction.LIMIT);
            contentLogger.append("Đã Cập nhật thể loại có id truyền vào là: " + id + ".");
            try {
                rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            for(Category cate : getAllCate  ){
                if(request.getTransactionRights() == 0 && !cate.getId().equals(id) ){
                    cate.setTransactionRights(CategoryTransaction.LIMIT);
                }
                adminCategoryRepository.save(cate);
            }

            return adminCategoryRepository.save(category);

        } else {
            contentLogger.append("Cập nhật không tồn tại category có id là: " + id + ".");
            try {
                rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            throw new RestApiException("Cập nhật không tồn tại category có id là: " + id + ".");
        }

    }

    public String setImageToCloud(AdminUpdateCategoryRequest request, String image){
        cloudinaryUploadImages.deleteImage(CloudinaryUtils.extractPublicId(image));
        return cloudinaryUploadImages.uploadImage(request.getImage());
    }

    @Override
    @Transactional
    public void deleteCategory(String id) {
        StringBuilder contentLogger = new StringBuilder();
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        loggerObject.setContent(contentLogger.toString());
        Optional<String> optionalId = Optional.of(id);
        if (optionalId.isPresent()) {
            if (optionalId.isEmpty()) {
                contentLogger.append("Xóa thể loại có id là: '" + id.toString() + "' .");
            } else {
                contentLogger.append("Xóa thể loại không có id truyền vào.");
            }
        } else {
            contentLogger.append("Xóa thể loại không có id truyền vào.");
        }
        Optional<Category> categoryOptional = adminCategoryRepository.findById(id);
        if (categoryOptional.isPresent()) {
            try {
                rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            contentLogger.append("Xóa thành công category có id là: " + id + ".");
            adminCategoryRepository.delete(categoryOptional.get());
        } else {
            contentLogger.append("Xóa không tồn tại category có id là: " + id + ".");
            try {
                rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            throw new RestApiException("Không tồn tại category có id là: " + id + ".");
        }
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
        if (adGiftDetailRepository.findAllByCategoryId(id).size() != 0) {
            throw new RestApiException("Thể loại đang được sử dụng không thể xóa.");
        }




        StringBuilder contentLogger = new StringBuilder();
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        loggerObject.setContent(contentLogger.toString());
        Optional<String> optionalId = Optional.of(id);
        if (optionalId.isPresent()) {
            if (optionalId.isEmpty()) {
                contentLogger.append("Cập nhật trạng thái thể loại có id là: '" + id.toString() + "' . ");
            } else {
                contentLogger.append("Cập nhật trạng thái thể loại không có id truyền vào.");
            }
        } else {
            contentLogger.append("Cập nhật trạng thái thể loại không có id truyền vào.");
        }
        Optional<Category> categoryOptional = adminCategoryRepository.findById(id);
        if (categoryOptional.isPresent()) {
            categoryOptional.get().setCategoryStatus(CategoryStatus.INACTIVE);
            adminCategoryRepository.save(categoryOptional.get());
            contentLogger.append("Cập nhật trạng thái thể loại thành công có id là: " + id + ".");
            try {
                rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            return categoryOptional.get();
        } else {
            contentLogger.append("Cập nhật trạng thái thể loại thất bại có id là: " + id + ".");
            try {
                rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            throw new RestApiException("Không tồn tại category có id là: " + id + ".");
        }
    }

}
