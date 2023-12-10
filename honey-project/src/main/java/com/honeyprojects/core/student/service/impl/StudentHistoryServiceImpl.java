package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.student.model.response.StudentHistoryResponse;
import com.honeyprojects.core.student.repository.StudentCategoryRepository;
import com.honeyprojects.core.student.repository.StudentChestRepository;
import com.honeyprojects.core.student.repository.StudentGiftRepository;
import com.honeyprojects.core.student.repository.StudentHistoryDetailRepository;
import com.honeyprojects.core.student.repository.StudentHistoryRepository;
import com.honeyprojects.core.student.repository.StudentHoneyRepository;
import com.honeyprojects.core.student.service.StudentHistoryService;
import com.honeyprojects.entity.Chest;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.HistoryDetail;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.contant.HistoryStatus;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.util.ConvertRequestApiidentity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StudentHistoryServiceImpl implements StudentHistoryService {

    @Autowired
    private StudentHistoryRepository historyRepository;
    @Autowired
    private StudentHistoryDetailRepository historyDetailRepository;
    @Autowired
    private UdpmHoney udpmHoney;
    @Autowired
    private StudentGiftRepository giftRepository;
    @Autowired
    private StudentChestRepository chestRepository;
    @Autowired
    private StudentCategoryRepository categoryRepository;
    @Autowired
    private ConvertRequestApiidentity apiidentity;
    @Autowired
    private StudentHoneyRepository honeyRepository;

    @Override
    public Map<String, Object> getListHistory(Integer type, Integer page) {
        Page<History> list;
        Sort sort = Sort.by(Sort.Direction.DESC, "lastModifiedDate");
        Pageable pageable = PageRequest.of(page, 5, sort);
        try {
            list = historyRepository.getListHistory(udpmHoney.getIdUser(), TypeHistory.values()[type], pageable);
        } catch (Exception e) {
            list = historyRepository.getListHistory(udpmHoney.getIdUser(), null, pageable);
        }
        List<StudentHistoryResponse> listResponse = list.getContent().stream().map(
                history -> {
                    StudentHistoryResponse response = new StudentHistoryResponse();
                    if (history.getType() == TypeHistory.CONG_DIEM) {
                        HistoryDetail historyDetail = historyDetailRepository
                                .findByStudentIdAndHistoryId(history.getStudentId(), history.getId());
                        Honey honey = honeyRepository.findById(historyDetail.getHoneyId()).orElse(null);
                        if (honey != null) {
                            categoryRepository.findById(honey.getHoneyCategoryId()).ifPresent(category -> response.setImage(category.getImage()));
                        }
                        response.setContent("Được cộng mật ong từ " + apiidentity.handleCallApiGetUserById(history.getTeacherId()).getUserName());
                        if (honey != null) {
                            categoryRepository.findById(honey.getHoneyCategoryId()).ifPresent(category ->
                                    response.setPointGet("+" + historyDetail.getHoneyPoint() + " " + category.getName() + "[Mật]"));
                        }
                    } else if (history.getType() == TypeHistory.DOI_QUA) {
                        HistoryDetail historyDetail = historyDetailRepository
                                .findByHistoryId(history.getId());
                        Gift gift = giftRepository.findById(historyDetail.getGiftId()).orElse(null);
                        if (gift != null) {
                            response.setImage(gift.getImage());
                            response.setContent("Mua x" + historyDetail.getQuantityGift() + " gói quà " + " " + gift.getName());
                            Honey honey = honeyRepository.findById(historyDetail.getHoneyId()).orElse(null);
                            if (honey != null) {
                                response.setPointGet("+" + historyDetail.getQuantityGift() + " " + gift.getName() + "[Quà]");
                                categoryRepository.findById(honey.getHoneyCategoryId()).ifPresent(category ->
                                        response.setPoint("-" + historyDetail.getHoneyPoint() * historyDetail.getQuantityGift() + " " + category.getName() + "[Mật]"));
                            }
                        }
                    } else if (history.getType() == TypeHistory.PHE_DUYET_QUA) {
                        HistoryDetail historyDetail = historyDetailRepository
                                .findByStudentIdAndHistoryId(history.getStudentId(), history.getId());
                        Gift gift = giftRepository.findById(historyDetail.getGiftId()).orElse(null);
                        if (history.getStatus() == HistoryStatus.DA_HUY) {
                            if (gift != null) {
                                response.setImage(gift.getImage());
                                response.setContent("Mở x" + historyDetail.getQuantityGift() + " gói quà " + " " + gift.getName() + " "
                                                    + "bị giảng viên từ chối");
                                response.setPointGet("+" + historyDetail.getQuantityGift() + " " + gift.getName() + "[Quà]");
                            }
                        } else {
                            if (gift != null) {
                                response.setImage(gift.getImage());
                                response.setContent("Mở x" + historyDetail.getQuantityGift() + " gói quà " + " " + gift.getName());
                                response.setPoint("-" + historyDetail.getQuantityGift() + " " + gift.getName() + "[Quà]");
                            }
                        }
                    } else if (history.getType() == TypeHistory.CONG_RUONG) {
                        HistoryDetail historyDetail = historyDetailRepository
                                .findByStudentIdAndHistoryId(history.getStudentId(), history.getId());
                        Chest chest = chestRepository.findById(historyDetail.getChestId()).orElse(null);
                        if (history.getStatus() == HistoryStatus.DA_PHE_DUYET) {
                            if (chest != null) {
                                response.setContent("Bạn nhận được " + 1 + " rương " + " " + chest.getName() + " "
                                                    + "từ hệ thống");
                                response.setPointGet("+" + 1 + " " + chest.getName() + "[Rương]");
                            }
                        }
                    }
                    return response;
                }
        ).toList();
        Map<String, Object> result = new HashMap<>();
        result.put("data", listResponse);
        result.put("totalPages", list.getTotalPages());
        result.put("currentPage", list.getNumber());
        return result;
    }

    @Override
    public Map<String, Object> getListRequest(Integer type, Integer page) {
        Page<History> list;
        Sort sort = Sort.by(Sort.Direction.DESC, "lastModifiedDate");
        Pageable pageable = PageRequest.of(page, 5, sort);
        try {
            list = historyRepository.getListRequest(udpmHoney.getIdUser(), TypeHistory.values()[type], pageable);
        } catch (Exception e) {
            list = historyRepository.getListRequest(udpmHoney.getIdUser(), null, pageable);
        }
        List<StudentHistoryResponse> listResponse = list.getContent().stream().map(
                history -> {
                    StudentHistoryResponse response = new StudentHistoryResponse();
                    if (history.getType() == TypeHistory.DOI_QUA) {
                        HistoryDetail historyDetail = historyDetailRepository
                                .findByHistoryId(history.getId());
                        Gift gift = giftRepository.findById(historyDetail.getGiftId()).orElse(null);
                        if (gift != null) {
                            response.setImage(gift.getImage());
                            Honey honey = honeyRepository.findById(historyDetail.getHoneyId()).orElse(null);
                            if (honey != null) {
                                categoryRepository.findById(honey.getHoneyCategoryId()).ifPresent(category ->
                                        response.setContent("Đổi " + historyDetail.getHoneyPoint() * historyDetail.getQuantityGift() + " mật " + category.getName() +
                                                            " lấy x" + historyDetail.getQuantityGift() + " gói quà " + " " + gift.getName()));
                            }
                            if (history.getStatus() == HistoryStatus.CHO_PHE_DUYET) {
                                response.setPointGet("[Chờ phê duyệt]");
                            } else {
                                response.setPoint("[Bị từ chối]");
                            }
                        }
                    } else if (history.getType() == TypeHistory.PHE_DUYET_QUA) {
                        HistoryDetail historyDetail = historyDetailRepository
                                .findByHistoryId(history.getId());
                        Gift gift = giftRepository.findById(historyDetail.getGiftId()).orElse(null);

                        if (gift != null) {
                            response.setImage(gift.getImage());
                            response.setContent("Mở x" + historyDetail.getQuantityGift() + " gói quà " + " " + gift.getName() +
                                                "[ " + history.getSubject() + " - " + history.getClassName() + " - " +
                                                apiidentity.handleCallApiGetUserById(history.getTeacherId()).getUserName() + " ]");
                            if (history.getStatus() == HistoryStatus.CHO_PHE_DUYET) {
                                response.setPointGet("[Chờ phê duyệt]");
                            } else {
                                response.setPoint("[Bị từ chối]");
                            }
                        }
                    }
                    return response;
                }
        ).toList();
        Map<String, Object> result = new HashMap<>();
        result.put("data", listResponse);
        result.put("totalPages", list.getTotalPages());
        result.put("currentPage", list.getNumber());
        return result;
    }
}
