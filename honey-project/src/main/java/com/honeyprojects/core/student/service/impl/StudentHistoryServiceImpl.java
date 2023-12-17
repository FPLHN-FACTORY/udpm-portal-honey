package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.student.model.response.StudentHistoryDetailResponse;
import com.honeyprojects.core.student.model.response.StudentHistoryGiftResponse;
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
//        Sort sort = Sort.by(Sort.Direction.DESC, "lastModifiedDate");
        Pageable pageable = PageRequest.of(page, 5);
        try {
            list = historyRepository.getListHistory(udpmHoney.getIdUser(), type, pageable);
        } catch (Exception e) {
            list = historyRepository.getListHistory(udpmHoney.getIdUser(), null, pageable);
        }
        List<StudentHistoryResponse> listResponse = list.getContent().stream().map(
                history -> {
                    StudentHistoryResponse response = new StudentHistoryResponse();
                    if (history.getType() == TypeHistory.CONG_DIEM) {
                        StudentHistoryDetailResponse historyDetail = historyDetailRepository
                                .getHistoryDetail(history.getStudentId(), history.getId());
                        response.setChangeDate(historyDetail.getChangeDate());
                       String preId = null;
                        if (history.getTeacherId() == null && history.getPresidentId() == null) {
                            response.setContent("Bạn được cộng mật ong từ hệ thống");
                        } else if (history.getTeacherId() == null) {
                            preId = history.getPresidentId();
                        } else {
                            preId = history.getTeacherId();
                        }
                        if (preId != null) {
                            response.setContent("Bạn nhận được mật ong từ " + apiidentity.handleCallApiGetUserById(preId).getUserName());
                        }                        response.setPointGet("+" + historyDetail.getHoney());
                    }
                    else if(history.getType() == TypeHistory.CONG_VAT_PHAM ){
                        StudentHistoryGiftResponse historyGift = historyDetailRepository
                                .getHistoryGift(history.getStudentId(), history.getId());
                        response.setChangeDate(historyGift.getChangeDate());
                        String preId = null;
                        if (history.getTeacherId() == null && history.getPresidentId() == null) {
                            response.setContent("Bạn nhận được vật phẩm từ hệ thống");
                        } else if (history.getTeacherId() == null) {
                            preId = history.getPresidentId();
                            response.setContent("Bạn nhận được vật phẩm từ  " + apiidentity.handleCallApiGetUserById(preId).getUserName());
                        } else {
                            preId = history.getTeacherId();
                            response.setContent("Bạn nhận được vật phẩm từ giảng viên " + apiidentity.handleCallApiGetUserById(preId).getUserName());

                        }
                        response.setPointGet("+" + historyGift.getGift());
                    }
                    else if (history.getType() == TypeHistory.DOI_QUA && history.getStatus() == HistoryStatus.DA_PHE_DUYET) {
                        HistoryDetail historyDetail = historyDetailRepository
                                .findByHistoryId(history.getId());
                        History historyStudent = historyRepository.findById(historyDetail.getHistoryId()).orElse(null);
                        Gift gift = giftRepository.findById(historyDetail.getGiftId()).orElse(null);
                        if (gift != null) {
                            response.setChangeDate(historyStudent.getChangeDate());
                            response.setContent("Bạn đã mua x" + historyDetail.getQuantityGift() + " phần quà " + " " + gift.getName());
                            Honey honey = honeyRepository.findById(historyDetail.getHoneyId()).orElse(null);
                            if (honey != null) {
//                                response.setPointGet("+" + historyDetail.getQuantityGift() + " " + gift.getName());
                                categoryRepository.findById(honey.getHoneyCategoryId()).ifPresent(category ->
                                        response.setPoint("-" + historyDetail.getHoneyPoint() * historyDetail.getQuantityGift() + " mật ong " + category.getName()));
                            }
                        }
                    }
                    else if(history.getType() == TypeHistory.MUA_VAT_PHAM && history.getStatus() == HistoryStatus.DA_PHE_DUYET){
                        HistoryDetail historyDetail = historyDetailRepository
                                .findByHistoryId(history.getId());
                        History historyStudent = historyRepository.findById(historyDetail.getHistoryId()).orElse(null);
                        Gift gift = giftRepository.findById(historyDetail.getGiftId()).orElse(null);
                        if (gift != null) {
                            response.setChangeDate(historyStudent.getChangeDate());
                            response.setContent("Bạn đã mua x" + historyDetail.getQuantityGift() + " vật phẩm " + " " + gift.getName());
                            Honey honey = honeyRepository.findById(historyDetail.getHoneyId()).orElse(null);
                            if (honey != null) {
//                                response.setPointGet("+" + historyDetail.getQuantityGift() + " " + gift.getName());
                                categoryRepository.findById(honey.getHoneyCategoryId()).ifPresent(category ->
                                        response.setPoint("-" + historyDetail.getHoneyPoint() * historyDetail.getQuantityGift() + " mật ong " + category.getName()));
                            }
                        }
                    }
                    else if (history.getType() == TypeHistory.PHE_DUYET_QUA) {
                        HistoryDetail historyDetail = historyDetailRepository
                                .findByStudentIdAndHistoryId(history.getStudentId(), history.getId());
                        History historyStudent = historyRepository.findById(historyDetail.getHistoryId()).orElse(null);
                        Gift gift = giftRepository.findById(historyDetail.getGiftId()).orElse(null);
                        if (history.getStatus() == HistoryStatus.DA_HUY) {
                            if (gift != null) {
                                response.setChangeDate(historyStudent.getChangeDate());
                                response.setContent("Mở x" + historyDetail.getQuantityGift() + " gói quà " + " " + gift.getName() + " "
                                        + "bị giảng viên từ chối");
                                response.setPointGet("+" + historyDetail.getQuantityGift() + " " + gift.getName() + "[Quà]");
                            }
                        } else {
                            if (gift != null) {
                                response.setChangeDate(historyStudent.getChangeDate());
                                response.setContent("Mở x" + historyDetail.getQuantityGift() + " gói quà " + " " + gift.getName());
                                response.setPoint("-" + historyDetail.getQuantityGift() + " " + gift.getName() + "[Quà]");
                            }
                        }
                    } else if (history.getType() == TypeHistory.CONG_RUONG) {
                        HistoryDetail historyDetail = historyDetailRepository
                                .findByStudentIdAndHistoryId(history.getStudentId(), history.getId());
                        History historyStudent = historyRepository.findById(historyDetail.getHistoryId()).orElse(null);
                        Chest chest = chestRepository.findById(historyDetail.getChestId()).orElse(null);
                        if (history.getStatus() == HistoryStatus.ADMIN_DA_THEM) {
                            if (chest != null) {
                                response.setChangeDate(historyStudent.getChangeDate());
                                response.setContent("Bạn nhận được " + 1 + " rương " + " " + chest.getName() + " "
                                        + "từ hệ thống");
                                response.setPointGet("+" + 1 + " Rương " + chest.getName());
                            }
                        }
                    }
                    else if(history.getType() == TypeHistory.MUA_VAT_PHAM && history.getStatus() == HistoryStatus.DA_HUY){
                        HistoryDetail historyDetail = historyDetailRepository
                                .findByHistoryId(history.getId());
                        History historyStudent = historyRepository.findById(historyDetail.getHistoryId()).orElse(null);
                        Gift gift = giftRepository.findById(historyDetail.getGiftId()).orElse(null);
                        if (gift != null) {
                            response.setChangeDate(historyStudent.getChangeDate());
                            response.setContent("Bạn bị từ chối mua x" + historyDetail.getQuantityGift() + " vật phẩm " + " " + gift.getName());
                        }
                    }
                    else if(history.getType() == TypeHistory.DOI_QUA && history.getStatus() == HistoryStatus.DA_HUY){
                        HistoryDetail historyDetail = historyDetailRepository
                                .findByHistoryId(history.getId());
                        History historyStudent = historyRepository.findById(historyDetail.getHistoryId()).orElse(null);
                        Gift gift = giftRepository.findById(historyDetail.getGiftId()).orElse(null);
                        if (gift != null) {
                            response.setChangeDate(historyStudent.getChangeDate());
                            response.setContent("Bạn bị từ chối mua x" + historyDetail.getQuantityGift() + " phần quà " + " " + gift.getName());
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
