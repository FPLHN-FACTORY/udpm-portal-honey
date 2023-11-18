package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminUpgradeRateGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminUpgradeRateRequest;
import com.honeyprojects.core.admin.model.response.AdminUpgradeRateGiftResponse;
import com.honeyprojects.core.admin.repository.AdGiftRepository;
import com.honeyprojects.core.admin.repository.AdUpgradeRateGiftRepository;
import com.honeyprojects.core.admin.repository.AdUpgradeRateRepository;
import com.honeyprojects.core.admin.repository.AdminCategoryRepository;
import com.honeyprojects.core.admin.service.AdUpgradeRateGiftService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Category;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.entity.UpgradeRate;
import com.honeyprojects.entity.UpgrateRateGift;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunction;
import com.honeyprojects.infrastructure.rabbit.RabbitProducer;
import com.honeyprojects.util.LoggerUtil;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AdUpgradeRateGiftServiceImpl implements AdUpgradeRateGiftService {

    @Autowired
    private AdUpgradeRateGiftRepository adUpgradeRateGiftRepository;

    @Autowired
    private AdUpgradeRateRepository adUpgradeRateRepository;

    @Autowired
    private AdminCategoryRepository categoryRepository;

    @Autowired
    private AdGiftRepository giftRepository;

    @Autowired
    private RabbitProducer producer;

    @Autowired
    private LoggerUtil loggerUtil;

    @Override
    public PageableObject getAllUpgradeRateGift(AdminUpgradeRateRequest searchParams) {
        Pageable pageable = PageRequest.of(searchParams.getPage(), searchParams.getSize());
        Page<AdminUpgradeRateGiftResponse> pageRes = adUpgradeRateGiftRepository.getAllUpgradeRateGift(pageable, searchParams);
        return new PageableObject(pageRes);
    }

    @Override
    public Boolean addOrUpdateUpgradeRateGift(AdminUpgradeRateGiftRequest request) {
        try {
            UpgradeRate upgradeRate;
            StringBuilder contentLogger = new StringBuilder();
            Optional<Category> destinationHoney = categoryRepository.findById(request.getDestinationHoneyId());
            Optional<Category> originalHoney = categoryRepository.findById(request.getDestinationHoneyId());
            if (destinationHoney.isEmpty()) {
                throw new RestApiException("Không tìm thấy loại mật nâng cấp");
            }
            if (originalHoney.isEmpty()) {
                throw new RestApiException("Không tìm thấy loại mật truyền vào");
            }

            if (request.getUpgradeRateId() != null) {
                upgradeRate = adUpgradeRateRepository.findById(request.getUpgradeRateId()).orElseGet(UpgradeRate::new);
                contentLogger.append("Tỉ lệ nâng cấp có mã '" + upgradeRate.getCode() + "' được cập nhật. ");
            } else {
                upgradeRate = new UpgradeRate();
                long entityCount = adUpgradeRateRepository.count();
                upgradeRate.setCode("UR" + (entityCount + 1));
                contentLogger.append("Tỉ lệ nâng cấp có mã '" + upgradeRate.getCode() + "' được thêm vào hệ thống. ");
            }
            upgradeRate.setStatus(request.getStatus() == 0 ? Status.HOAT_DONG : Status.KHONG_HOAT_DONG);
            upgradeRate.setDestinationHoney(request.getDestinationHoneyId());
            upgradeRate.setQuantityDestinationHoney(request.getQuantityDestinationHoney().intValue());
            upgradeRate.setOriginalHoney(request.getOriginalHoneyId());
            upgradeRate.setQuantityOriginalHoney(request.getQuantityOriginalHoney().intValue());
            upgradeRate.setRatio(request.getRatio());
            upgradeRate.setId(adUpgradeRateRepository.save(upgradeRate).getId());

            Iterable<UpgrateRateGift> iterable = adUpgradeRateGiftRepository.findAllByIdUpgradeRate(upgradeRate.getId());
            contentLogger.append("Có trạng thái " + (request.getStatus() == 0 ? "Hoạt động. " : "Không hoạt động. "));
            contentLogger.append("Có loại mật truyền vào '" + originalHoney.get().getCode() + "'. Có số lượng mật truyền vào được là: " + request.getQuantityOriginalHoney().intValue() + ". ");

            if (request.getIdGifts() != null && request.getIdGifts().size() != 0) {
                List<UpgrateRateGift> upgrateRateGifts = new ArrayList<>();
                contentLogger.append("Có vật phẩm đi kèm là: ");
                for (Gift el : giftRepository.findAllByIdIn(request.getIdGifts())) {
                    UpgrateRateGift data = new UpgrateRateGift();
                    data.setIdUpgradeRate(upgradeRate.getId());
                    data.setIdGift(el.getId());
                    upgrateRateGifts.add(data);
                    contentLogger.append(el.getName() + ", ");
                }
                if (contentLogger.length() > 0) {
                    contentLogger.setLength(contentLogger.length() - 2);
                    contentLogger.append(".");
                }
                adUpgradeRateGiftRepository.deleteAll(iterable);
                adUpgradeRateGiftRepository.saveAll(upgrateRateGifts);
            }
            contentLogger.append("Có loại mật nâng cấp '" + destinationHoney.get().getCode() + "'. Có số lượng mật nhận được là: " +
                    request.getQuantityDestinationHoney().intValue() + ". Có tỉ lệ thành công " + request.getRatio() + "%. ");
            LoggerFunction loggerObject = new LoggerFunction();
            loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
            loggerObject.setContent(contentLogger.toString());
            try {
                producer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        } catch (Exception exception) {
            exception.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Boolean updateStatusUpgradeRateGift(String id, Long status) {
        UpgradeRate upgradeRate = adUpgradeRateRepository.findById(id).get();
        if (status.equals(1L)) {
            upgradeRate.setStatus(Status.HOAT_DONG);
        } else {
            upgradeRate.setStatus(Status.KHONG_HOAT_DONG);
        }
        adUpgradeRateRepository.save(upgradeRate);
        return true;
    }
}
