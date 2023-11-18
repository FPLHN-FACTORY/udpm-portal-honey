package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminCreateGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateGiftRequest;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.core.admin.model.response.CensorGiftSelectResponse;
import com.honeyprojects.core.admin.repository.AdGiftRepository;
import com.honeyprojects.core.admin.service.AdminGiftService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.infrastructure.contant.StatusGift;
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

@Service
public class AdminGiftServiceImpl implements AdminGiftService {

    @Autowired
    private AdGiftRepository adGiftRepository;


    @Override
    public PageableObject<AdminGiftResponse> getAllCategoryByAdmin(AdminGiftRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<AdminGiftResponse> pageRes = adGiftRepository.getAllGiftByAdmin(pageable, request);
        StringBuilder contentLogger = new StringBuilder();
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        contentLogger.append("Lấy tất cả quà đang hoạt động tại trang quà.");
        loggerObject.setContent(contentLogger.toString());
        try {
            rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
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

    @Autowired
    private RabbitProducer rabbitProducer;

    @Autowired
    private LoggerUtil loggerUtil;
    @Override
    @Transactional
    public Gift addGift(AdminCreateGiftRequest request) throws IOException {
        StringBuilder contentLogger = new StringBuilder();
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        Gift gift = request.dtoToEntity(new Gift());
        contentLogger.append("Lưu quà có id là '" + gift.getId() + "' . ");
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
        contentLogger.append("Cập nhật quà có id là '" + existingGift.getId() + "' . ");
        loggerObject.setContent(contentLogger.toString());
        try {
            rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        request.dtoToEntity(existingGift);
        return adGiftRepository.save(existingGift);
    }

    @Override
    public Gift getOne(String id) {
        return adGiftRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public void deleteById(String id) {
        adGiftRepository.deleteById(id);
    }

    public Gift updateStatusGift(String id) {
        StringBuilder contentLogger = new StringBuilder();
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        Optional<Gift> optional = adGiftRepository.findById(id);
        contentLogger.append("Cập nhật trạng thái về không hoạt động của quà có id là '" + optional.get().getId() + "' . ");
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
        StringBuilder contentLogger = new StringBuilder();
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        contentLogger.append("Lấy tất cả quà đang hoạt động.");
        loggerObject.setContent(contentLogger.toString());
        try {
            rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return adGiftRepository.getAllGiftExist();
    }
}
