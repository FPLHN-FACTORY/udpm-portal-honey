package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminCreateGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateGiftRequest;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.core.admin.model.response.CensorGiftSelectResponse;
import com.honeyprojects.core.admin.repository.AdGiftRepository;
import com.honeyprojects.core.admin.service.AdminGiftService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.infrastructure.configution.CloudinaryUploadImages;
import com.honeyprojects.infrastructure.contant.ExpiryGift;
import com.honeyprojects.infrastructure.contant.StatusGift;
import com.honeyprojects.infrastructure.contant.TransactionGift;
import com.honeyprojects.infrastructure.contant.TypeGift;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunction;
import com.honeyprojects.infrastructure.rabbit.RabbitProducer;
import com.honeyprojects.util.CloudinaryUtils;
import com.honeyprojects.util.LoggerUtil;
import lombok.Synchronized;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AdminGiftServiceImpl implements AdminGiftService {

    @Autowired
    private AdGiftRepository adGiftRepository;

    @Autowired
    private RabbitProducer rabbitProducer;

    @Autowired
    private LoggerUtil loggerUtil;

    @Autowired
    private CloudinaryUploadImages cloudinaryUploadImages;

    @Override
    public PageableObject<AdminGiftResponse> getAllCategoryByAdmin(AdminGiftRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<AdminGiftResponse> pageRes = adGiftRepository.getAllGiftByAdmin(pageable, request);
//        StringBuilder contentLogger = new StringBuilder();
//        LoggerFunction loggerObject = new LoggerFunction();
//        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
//        contentLogger.append("Lấy tất cả quà đang hoạt động tại trang quà.");
//        loggerObject.setContent(contentLogger.toString());
//        try {
//            rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
        return new PageableObject<>(pageRes);
    }

    @Override
    public List<AdminGiftResponse> getAllListGift() {
        StringBuilder contentLogger = new StringBuilder();
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        contentLogger.append("Lấy tất cả quà đang hoạt động 2.");
        loggerObject.setContent(contentLogger.toString());
        try {
            rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return adGiftRepository.getAllListResponse();
    }

    @Override
    public List<AdminGiftResponse> getAllListGiftUpgrade() {
        return adGiftRepository.getAllListGiftUpgrade();
    }

    @Override
    @Transactional
    @Synchronized
    public Gift addGift(AdminCreateGiftRequest request) throws IOException {
        StringBuilder contentLogger = new StringBuilder();
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        Random random = new Random();
        int number = random.nextInt(10000);
        String code = String.format("G%05d", number);
        Gift gift = new Gift();
        gift.setCode(code);
        gift.setName(request.getName());
        gift.setStatus(StatusGift.values()[request.getStatus()]);
        gift.setQuantity(request.getQuantity());
        gift.setLimitQuantity(request.getLimitQuantity());
        gift.setType(TypeGift.values()[request.getType()]);
        gift.setTransactionGift(TransactionGift.values()[request.getTransactionGift()]);
        gift.setNote(request.getNote());

        Long fromDate = null;
        Long toDate = null;
        if (request.getNumberDateEnd() != null) {
            gift.setExpiry(ExpiryGift.DANG_HOAT_DONG);
        } else if (request.getFromDate() != null && request.getToDate() != null) {
            fromDate = DateUtils.truncate(new Date(request.getFromDate()), Calendar.DATE).getTime();
            toDate = DateUtils.truncate(new Date(request.getToDate()), Calendar.DATE).getTime();
            gift.setToDate(toDate);
            gift.setFromDate(fromDate);
            Long currentTime = DateUtils.truncate(new Date(), Calendar.DATE).getTime();
            if (gift.getFromDate() <= currentTime && currentTime <= gift.getToDate()) {
                gift.setExpiry(ExpiryGift.DANG_HOAT_DONG);
            } else if (gift.getFromDate() > currentTime && currentTime < gift.getToDate()) {
                gift.setExpiry(ExpiryGift.CHUA_HOAT_DONG);
            } else if (currentTime > gift.getToDate()) {
                gift.setExpiry(ExpiryGift.HET_HAN);
            }
        } else {
            gift.setExpiry(ExpiryGift.VINH_VIEN);
        }

        gift.setImage(cloudinaryUploadImages.uploadImage(request.getImage()));
        contentLogger.append("Gift có tên '" + gift.getName() + "' đã được thêm vào hệ thống. ");
        loggerObject.setContent(contentLogger.toString());
        try {
            rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return adGiftRepository.save(gift);
    }

    public Gift updateGift(AdminUpdateGiftRequest request, String id) throws IOException {
        StringBuilder contentLogger = new StringBuilder();
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        Optional<Gift> optional = adGiftRepository.findById(id);
        Gift existingGift = optional.get();

        existingGift.setName(request.getName());
        existingGift.setStatus(StatusGift.values()[request.getStatus()]);
        existingGift.setQuantity(request.getQuantity());
        existingGift.setLimitQuantity(request.getLimitQuantity());
        existingGift.setType(TypeGift.values()[request.getType()]);
        existingGift.setTransactionGift(TransactionGift.values()[request.getTransactionGift()]);
        existingGift.setNote(request.getNote());

        if (request.getImage() != null) {
            existingGift.setImage(setImageToCloud(request, existingGift.getImage()));
        }

        Long fromDate = null;
        Long toDate = null;
        if (request.getNumberEndDate() != null) {
            existingGift.setExpiry(ExpiryGift.DANG_HOAT_DONG);
            existingGift.setToDate(null);
            existingGift.setFromDate(null);
        } else if (request.getFromDate() != null && request.getToDate() != null) {
            fromDate = DateUtils.truncate(new Date(request.getFromDate()), Calendar.DATE).getTime();
            toDate = DateUtils.truncate(new Date(request.getToDate()), Calendar.DATE).getTime();
            existingGift.setToDate(toDate);
            existingGift.setFromDate(fromDate);
            existingGift.setNumberEndDate(null);
            Long currentTime = DateUtils.truncate(new Date(), Calendar.DATE).getTime();
            if (existingGift.getFromDate() <= currentTime && currentTime <= existingGift.getToDate()) {
                existingGift.setExpiry(ExpiryGift.DANG_HOAT_DONG);
            } else if (existingGift.getFromDate() > currentTime && currentTime < existingGift.getToDate()) {
                existingGift.setExpiry(ExpiryGift.CHUA_HOAT_DONG);
            } else if (currentTime > existingGift.getToDate()) {
                existingGift.setExpiry(ExpiryGift.HET_HAN);
            }
        } else {
            existingGift.setExpiry(ExpiryGift.VINH_VIEN);
            existingGift.setToDate(null);
            existingGift.setFromDate(null);
            existingGift.setNumberEndDate(null);
        }

        contentLogger.append("Cập nhật Gift: '" + existingGift.getName() + "'. ");
        if (!request.getName().isEmpty()) {
            contentLogger.append("Cập nhật tên từ: '" + existingGift.getName() + "' sang '" + request.getName() + "'.");
        }
        if (request.getQuantity() != null) {
            contentLogger.append("Cập nhật số lượng từ: " + existingGift.getQuantity() + " sang " + request.getQuantity() + ".");
        }
        loggerObject.setContent(contentLogger.toString());
        try {
            rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return adGiftRepository.save(existingGift);
    }

    public String setImageToCloud(AdminUpdateGiftRequest request, String image) {
        cloudinaryUploadImages.deleteImage(CloudinaryUtils.extractPublicId(image));
        return cloudinaryUploadImages.uploadImage(request.getImage());
    }

    @Override
    public Gift getOne(String id) {
        return adGiftRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public void deleteById(String id) {
        adGiftRepository.deleteById(id);
        StringBuilder contentLogger = new StringBuilder();
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        Optional<Gift> optional = adGiftRepository.findById(id);
        contentLogger.append("Gift có tên '" + optional.get().getName() + "' đã xóa khỏi hệ thống. ");
        loggerObject.setContent(contentLogger.toString());
        try {
            rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public Gift updateStatusGift(String id) {
        StringBuilder contentLogger = new StringBuilder();
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        Optional<Gift> optional = adGiftRepository.findById(id);
        contentLogger.append("Vật phẩm '" + optional.get().getName() + " - " + optional.get().getCode()
                + "' đã cập nhật trạng thái thành không hoạt động. ");
        loggerObject.setContent(contentLogger.toString());
        try {
            rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        optional.get().setStatus(StatusGift.KHONG_HOAT_DONG);
        return adGiftRepository.save(optional.get());
    }

    @Override
    public Optional<Gift> findById(String s) {
        return adGiftRepository.findById(s);
    }

    @Override
    public List<CensorGiftSelectResponse> getAllGiftExist() {
        return adGiftRepository.getAllGiftExist();
    }
}
