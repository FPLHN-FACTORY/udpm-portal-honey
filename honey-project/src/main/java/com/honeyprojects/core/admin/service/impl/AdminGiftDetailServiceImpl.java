package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminAddGiftDetailRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateGiftDetailRequest;
import com.honeyprojects.core.admin.model.response.AdminGiftDetailResponse;
import com.honeyprojects.core.admin.repository.AdGiftDetailRepository;
import com.honeyprojects.core.admin.service.AdminGiftDetailService;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.entity.GiftDetail;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunction;
import com.honeyprojects.infrastructure.rabbit.RabbitProducer;
import com.honeyprojects.util.LoggerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminGiftDetailServiceImpl implements AdminGiftDetailService {
    @Autowired
    private RabbitProducer rabbitProducer;

    @Autowired
    private LoggerUtil loggerUtil;

    @Autowired
    private AdGiftDetailRepository repository;
    @Override
    public GiftDetail add(AdminAddGiftDetailRequest request) {
        GiftDetail giftDetail = request.dtoToEntity(new GiftDetail());
        return repository.save(giftDetail);
    }

    @Override
    public GiftDetail update(AdminUpdateGiftDetailRequest request, String id) {
        Optional<GiftDetail> optional = repository.findById(id);
        GiftDetail giftDetail = optional.get();
        request.dtoToEntity(giftDetail);
        return repository.save(giftDetail);
    }

    @Override
    public void deleteById(String id) {
        StringBuilder contentLogger = new StringBuilder();
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        contentLogger.append("xóa quà có id là '" + id + "' . ");
        loggerObject.setContent(contentLogger.toString());
        try {
            rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        repository.deleteById(id);
    }

    @Override
    public List<AdminGiftDetailResponse> listGiftDetailByGiftId(String idGift) {
        StringBuilder contentLogger = new StringBuilder();
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        contentLogger.append("Lấy chi tiết quà có id là '" + idGift + "' . ");
        loggerObject.setContent(contentLogger.toString());
        try {
            rabbitProducer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return repository.listGiftDetailByGiftId(idGift);
    }
}
