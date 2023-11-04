package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.student.model.response.StudentHistoryResponse;
import com.honeyprojects.core.student.repository.StudentCategoryRepository;
import com.honeyprojects.core.student.repository.StudentGiftRepository;
import com.honeyprojects.core.student.repository.StudentHistoryRepository;
import com.honeyprojects.core.student.repository.StudentHoneyRepository;
import com.honeyprojects.core.student.service.StudentHistoryService;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.util.ConvertRequestApiidentity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StudentHistoryServiceImpl implements StudentHistoryService {

    @Autowired
    private StudentHistoryRepository historyRepository;
    @Autowired
    private UdpmHoney udpmHoney;
    @Autowired
    private StudentGiftRepository giftRepository;
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
                        Honey honey = honeyRepository.findById(history.getHoneyId()).orElse(null);
                        if (honey != null) {
                            categoryRepository.findById(honey.getHoneyCategoryId()).ifPresent(category -> response.setImage(Arrays.toString(category.getImage())));
                        }
                        response.setContent("Được cộng mật ong từ " + apiidentity.handleCallApiGetUserById(history.getTeacherId()).getUserName());
                        if (honey != null) {
                            categoryRepository.findById(honey.getHoneyCategoryId()).ifPresent(category ->
                                    response.setPointGet("+" + history.getHoneyPoint() + " " + category.getName() + "[Mật]"));
                        }
                    } else if (history.getType() == TypeHistory.DOI_QUA) {
                        Gift gift = giftRepository.findById(history.getGiftId()).orElse(null);
                        if (gift != null) {
                            response.setImage(Arrays.toString(gift.getImage()));
                            response.setContent("Mua x" + history.getQuantity() + " gói quà " + " " + gift.getName());
                            Honey honey = honeyRepository.findById(history.getHoneyId()).orElse(null);
                            if (honey != null) {
                                response.setPointGet("+" + history.getQuantity() + " " + gift.getName() + "[Quà]");
                                categoryRepository.findById(honey.getHoneyCategoryId()).ifPresent(category ->
                                        response.setPoint("-" + history.getHoneyPoint() * history.getQuantity() + " " + category.getName() + "[Mật]"));

                            }
                        }
                    } else if (history.getType() == TypeHistory.PHE_DUYET_QUA) {
                        Gift gift = giftRepository.findById(history.getGiftId()).orElse(null);
                        if (history.getStatus() == HoneyStatus.DA_HUY) {
                            if (gift != null) {
                                response.setImage(Arrays.toString(gift.getImage()));
                                response.setContent("Mở x" + history.getQuantity() + " gói quà " + " " + gift.getName() + " "
                                                    + "bị giảng viên từ chối");
                                response.setPointGet("+" + history.getQuantity() + " " + gift.getName() + "[Quà]");
                            }
                        } else {
                            if (gift != null) {
                                response.setImage(Arrays.toString(gift.getImage()));
                                response.setContent("Mở x" + history.getQuantity() + " gói quà " + " " + gift.getName());
                                response.setPoint("-" + history.getQuantity() + " " + gift.getName() + "[Quà]");
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
                        Gift gift = giftRepository.findById(history.getGiftId()).orElse(null);
                        if (gift != null) {
                            response.setImage(Arrays.toString(gift.getImage()));
                            Honey honey = honeyRepository.findById(history.getHoneyId()).orElse(null);
                            if (honey != null) {
                                categoryRepository.findById(honey.getHoneyCategoryId()).ifPresent(category ->
                                        response.setContent("Đổi " + history.getHoneyPoint() * history.getQuantity() + " mật " + category.getName() +
                                                            " lấy x" + history.getQuantity() + " gói quà " + " " + gift.getName()));
                            }
                            if (history.getStatus() == HoneyStatus.CHO_PHE_DUYET) {
                                response.setPointGet("[Chờ phê duyệt]");
                            } else {
                                response.setPoint("[Bị từ chối]");
                            }
                        }
                    } else if (history.getType() == TypeHistory.PHE_DUYET_QUA) {
                        Gift gift = giftRepository.findById(history.getGiftId()).orElse(null);

                        if (gift != null) {
                            response.setImage(Arrays.toString(gift.getImage()));
                            response.setContent("Mở x" + history.getQuantity() + " gói quà " + " " + gift.getName() +
                                                "[ " + history.getSubject() + " - " + history.getClassName() + " - " +
                                                apiidentity.handleCallApiGetUserById(history.getTeacherId()).getUserName() + " ]");
                            if (history.getStatus() == HoneyStatus.CHO_PHE_DUYET) {
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
