package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminChestRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateChestRequest;
import com.honeyprojects.core.admin.model.response.AdminChestReponse;
import com.honeyprojects.core.admin.repository.AdArchiveGiftRepository;
import com.honeyprojects.core.admin.repository.AdChestGiftRepository;
import com.honeyprojects.core.admin.repository.AdChestRepository;
import com.honeyprojects.core.admin.repository.AdHistoryDetailRepository;
import com.honeyprojects.core.admin.service.AdminChestService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Chest;
import com.honeyprojects.infrastructure.contant.Message;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunction;
import com.honeyprojects.infrastructure.rabbit.RabbitProducer;
import com.honeyprojects.util.DataUtils;
import com.honeyprojects.util.LoggerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AdminChestServiceImpl implements AdminChestService {

    @Autowired
    private AdChestRepository chestRepository;

    @Autowired
    private LoggerUtil loggerUtil;

    @Autowired
    private RabbitProducer producer;

    @Autowired
    private AdHistoryDetailRepository adHistoryDetailRepository;

    @Autowired
    private AdChestGiftRepository adChestGiftRepository;

    @Autowired
    private AdArchiveGiftRepository adArchiveGiftRepository;

    @Override
    public PageableObject<AdminChestReponse> getAllChestByAdmin(AdminChestRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<AdminChestReponse> res = chestRepository.getAllChestByAdmin(pageable, request);
        return new PageableObject<>(res);
    }

    @Override
    @Transactional
    public Chest addChest(AdminCreateChestRequest request) {
        checkNameExist(request.getName(), "");
        Chest chest = new Chest();
        chest.setName(request.getName());
        chest.setStatus(Status.HOAT_DONG);
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("Admin tạo thêm rương: " + request.getName());
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        loggerObject.setContent(stringBuilder.toString());
        try {
            producer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return chestRepository.save(chest);
    }

    private void checkNameExist(String name, String id){
        List<Chest> lstChest = chestRepository.checkNameExist(name, id);
        if(!DataUtils.isNullObject(lstChest)){
            throw new RestApiException(Message.CHEST_EXIST);
        }
    }

    @Override
    @Transactional
    public void deleteChest(String id) {
        Optional<Chest> chestOptional = chestRepository.findById(id);
        if (adHistoryDetailRepository.findAllByChestId(id).size() != 0 ||
                adArchiveGiftRepository.findAllByChestId(id).size() != 0
        ) {
            throw new RestApiException("Rương đã được sử dụng. Không thể xóa");
        }
        chestOptional.get().setStatus(Status.KHONG_HOAT_DONG);
        chestRepository.save(chestOptional.get());
    }

    @Override
    @Transactional
    public Chest updateChest(AdminCreateChestRequest request, String id) {
        checkNameExist(request.getName(), id);
        Chest chest = chestRepository.findById(id).get();
        if (chest != null) {
            chest.setName(request.getName());
            return chestRepository.save(chest);
        } else {
            return null;
        }
    }

}
