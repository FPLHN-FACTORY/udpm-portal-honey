package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminChangeStatusGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminHistoryApprovedSearchRequest;
import com.honeyprojects.core.admin.model.request.CensorChangeStatusRequest;
import com.honeyprojects.core.admin.model.request.CensorSearchHistoryRequest;
import com.honeyprojects.core.admin.model.response.CensorAddHoneyRequestResponse;
import com.honeyprojects.core.admin.model.response.CensorDetailItemRequestResponse;
import com.honeyprojects.core.admin.model.response.CensorDetailRequestResponse;
import com.honeyprojects.core.admin.model.response.CensorTransactionRequestResponse;
import com.honeyprojects.core.admin.repository.AdHoneyRepository;
import com.honeyprojects.core.admin.repository.AdRequestConversionHistoryRepository;
import com.honeyprojects.core.admin.repository.AdminCategoryRepository;
import com.honeyprojects.core.admin.repository.CensorHistoryRepository;
import com.honeyprojects.core.admin.service.AdNotificationDetailService;
import com.honeyprojects.core.admin.service.AdNotificationService;
import com.honeyprojects.core.admin.service.CensorRequestManagerService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.student.repository.StudentArchiveGiftRepository;
import com.honeyprojects.core.student.repository.StudentArchiveRepository;
import com.honeyprojects.core.student.repository.StudentGiftRepository;
import com.honeyprojects.entity.Archive;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.entity.Category;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.HistoryDetail;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.entity.Notification;
import com.honeyprojects.infrastructure.contant.HistoryStatus;
import com.honeyprojects.infrastructure.contant.Message;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import com.honeyprojects.repository.HistoryDetailRepository;
import com.honeyprojects.util.ConvertRequestApiidentity;
import com.honeyprojects.util.DataUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
public class CensorRequestManagerServiceImpl implements CensorRequestManagerService {

    @Autowired
    private CensorHistoryRepository historyRepository;

    @Autowired
    private HistoryDetailRepository historyDetailRepository;

    @Autowired
    private AdHoneyRepository honeyRepository;

    @Autowired
    private ConvertRequestApiidentity requestApiidentity;

    @Autowired
    private StudentArchiveGiftRepository giftArchiveRepository;

    @Autowired
    private StudentArchiveRepository archiveRepository;

    @Autowired
    private StudentGiftRepository giftRepository;

    @Autowired
    private AdRequestConversionHistoryRepository itemHistoryRepository;

    @Autowired
    private AdNotificationService adNotificationService;

    @Autowired
    private AdNotificationDetailService adNotificationDetailService;

    @Autowired
    private AdminCategoryRepository adminCategoryRepository;

    @Override
    @Transactional
    public History changeStatus(CensorChangeStatusRequest changeReq) {
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        History history = historyRepository.findById(changeReq.getIdHistory()).orElseThrow(() -> new RestApiException(Message.HISTORY_NOT_EXIST));

        Notification notification = null;
        // gửi thông báo
        if (!DataUtils.isNullObject(history.getStudentId())
                && !DataUtils.isNullObject(history.getTeacherId())) {
            if (history.getStatus().equals(HistoryStatus.DA_PHE_DUYET)) {
                adNotificationService.sendNotificationApprovalToTeacher(history.getTeacherId(), history.getStudentName(), history.getId());
                notification = adNotificationService.teacherSendNotificationToStudent(history.getStudentId(), history.getTeacherIdName());
            } else {
                adNotificationService.sendNotificationRefuseToTeacher(history.getTeacherId(), history.getStudentName(), history.getId());
            }
        }
        if (!DataUtils.isNullObject(history.getStudentId())
                && !DataUtils.isNullObject(history.getPresidentId())) {
            if (history.getStatus().equals(HistoryStatus.DA_PHE_DUYET)) {
                adNotificationService.sendNotificationApprovalToPresident(history.getPresidentId(), history.getStudentName(), history.getId());
                notification = adNotificationService.presidentSendNotificationToStudent(history.getStudentId(), history.getPresidentName());
            } else {
                adNotificationService.sendNotificationRefuseToPresident(history.getPresidentId(), history.getStudentName(), history.getId());
            }
        }
//        if (!DataUtils.isNullObject(history.getStudentId())
//                && DataUtils.isNullObject(history.getPresidentId())
//                && DataUtils.isNullObject(history.getTeacherId())) {
//            if (history.getStatus().equals(HistoryStatus.DA_PHE_DUYET)) {
//                notification = adNotificationService.sendNotificationApprovalToStudent(history.getStudentId());
//            } else {
//                notification = adNotificationService.sendNotificationRefuseToStudent(history.getStudentId());
//            }
//        }

        history.setStatus(HistoryStatus.values()[changeReq.getStatus()]);
        List<HistoryDetail> listHistoryDetail = historyDetailRepository.findHistoryDetailByHistoryId(changeReq.getIdHistory());
        for (HistoryDetail historyDetail : listHistoryDetail) {
            if (changeReq.getStatus() == 1 && history.getType().equals(TypeHistory.CONG_DIEM)) {
                Honey honey = honeyRepository.findById(historyDetail.getHoneyId()).orElseThrow(() -> new RestApiException(Message.HISTORY_NOT_EXIST));
                honey.setHoneyPoint(honey.getHoneyPoint() + historyDetail.getHoneyPoint());
                honey.setStatus(Status.HOAT_DONG);
                honeyRepository.save(honey);
                history.setChangeDate(dateNow);
                Category category = adminCategoryRepository.findById(honey.getHoneyCategoryId()).orElse(null);
                adNotificationDetailService.createNotificationDetailHoney(notification.getId(), historyDetail.getHoneyPoint()
                        , category.getName(), historyDetail.getHoneyId());
            }
        }
        return historyRepository.save(history);
    }

    @Override
    public List<History> changeStatusAll(List<CensorChangeStatusRequest> changeStatusRequest) {
        List<History> list = new ArrayList<>();
        for (CensorChangeStatusRequest el : changeStatusRequest) {
            list.add(changeStatus(el));
        }
        return list;
    }

    @Override
    public History changeStatusConversion(AdminChangeStatusGiftRequest request) {
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        History history = historyRepository.findById(request.getIdHistory()).orElseThrow(() -> new RestApiException(Message.HISTORY_NOT_EXIST));
        history.setStatus(HistoryStatus.values()[request.getStatus()]);
        List<CensorDetailItemRequestResponse> listHistoryItem = itemHistoryRepository.getHistoryItemDetail(request.getIdHistory());
        Notification notification = null;
        // gửi thông báo
        if (!DataUtils.isNullObject(history.getStudentId())
                && !DataUtils.isNullObject(history.getTeacherId())) {
            if (history.getStatus().equals(HistoryStatus.DA_PHE_DUYET)) {
                adNotificationService.sendNotificationApprovalToTeacher(history.getTeacherId(), history.getStudentName(), history.getId());
                notification = adNotificationService.teacherSendNotificationToStudent(history.getStudentId(), history.getTeacherIdName());
            } else {
                adNotificationService.sendNotificationRefuseToTeacher(history.getTeacherId(), history.getStudentName(), history.getId());
            }
        }
        if (!DataUtils.isNullObject(history.getStudentId())
                && !DataUtils.isNullObject(history.getPresidentId())) {
            if (history.getStatus().equals(HistoryStatus.DA_PHE_DUYET)) {
                adNotificationService.sendNotificationApprovalToPresident(history.getPresidentId(), history.getStudentName(), history.getId());
                notification = adNotificationService.presidentSendNotificationToStudent(history.getStudentId(), history.getPresidentName());
            } else {
                adNotificationService.sendNotificationRefuseToPresident(history.getPresidentId(), history.getStudentName(), history.getId());
            }
        }
        if (!DataUtils.isNullObject(history.getStudentId())
                && DataUtils.isNullObject(history.getPresidentId())
                && DataUtils.isNullObject(history.getTeacherId())) {
            if (history.getStatus().equals(HistoryStatus.DA_PHE_DUYET)) {
                notification = adNotificationService.sendNotificationApprovalToStudent(history.getStudentId());
            } else {
                notification = adNotificationService.sendNotificationRefuseToStudent(history.getStudentId());
            }
        }


        for (CensorDetailItemRequestResponse item : listHistoryItem) {
            HistoryDetail historyDetail = historyDetailRepository.findById(item.getHistoryDetailId()).orElse(null);
            ArchiveGift archiveGift = new ArchiveGift();
            Gift gift = giftRepository.findById(item.getGiftId()).orElse(null);
            Archive archive = new Archive();
            archive.setStudentId(item.getStudentId());
            archive.setStatus(Status.HOAT_DONG);
            if (history.getStatus().equals(HistoryStatus.DA_PHE_DUYET) &&
                    history.getType().equals(TypeHistory.DOI_QUA) ||
                    history.getType().equals(TypeHistory.MAT_ONG_VA_VAT_PHAM) ||
                    history.getType().equals(TypeHistory.CONG_VAT_PHAM) ||
                    history.getType().equals(TypeHistory.MUA_VAT_PHAM)
            ) {
                if (historyDetail.getHoneyId() != null) {
                    Honey honey = honeyRepository.findById(historyDetail.getHoneyId()).orElseThrow(() -> new RestApiException(Message.HISTORY_NOT_EXIST));
                    honey.setHoneyPoint(honey.getHoneyPoint() - (historyDetail.getHoneyPoint() * item.getQuantityGift()));
                    honeyRepository.save(honey);
                }
                if (gift.getQuantity() != null) {
                    gift.setQuantity(gift.getQuantity() - item.getQuantityGift());
                    giftRepository.save(gift);
                    history.setChangeDate(dateNow);
                }
                Archive getArchive = archiveRepository.findByStudentId(item.getStudentId()).orElse(archive);
                archiveRepository.save(getArchive);
                ArchiveGift archiveGift1 = giftArchiveRepository.findByGiftIdAndArchiveId(item.getGiftId(), getArchive.getId());
                if (archiveGift1 != null) {
                    int currentQuantity = archiveGift1.getQuantity();
                    int additionalQuantity = item.getQuantityGift();
                    archiveGift1.setQuantity(currentQuantity + additionalQuantity);
                    giftArchiveRepository.save(archiveGift1);
                } else {
                    archiveGift.setGiftId(item.getGiftId());
                    archiveGift.setNote(item.getNote());
                    archiveGift.setArchiveId(getArchive.getId());
                    archiveGift.setQuantity(item.getQuantityGift());
                    giftArchiveRepository.save(archiveGift);
                }
                adNotificationDetailService.createNotificationDetailGift(notification.getId(), item.getQuantityGift(), item.getNameGift(), item.getGiftId());
            }
            if (!DataUtils.isNullObject(history.getStudentId())
                    && DataUtils.isNullObject(history.getPresidentId())
                    && DataUtils.isNullObject(history.getTeacherId())
                    && history.getStatus().equals(HistoryStatus.DA_HUY)
            ) {
                adNotificationDetailService.createNotificationDetailGift(notification.getId(), item.getQuantityGift(), item.getNameGift(), item.getGiftId());
            }

        }

        return historyRepository.save(history);
    }

    @Override
    public List<History> changeStatusConversionAll(List<AdminChangeStatusGiftRequest> changeStatusRequest) {
        List<History> list = new ArrayList<>();
        for (AdminChangeStatusGiftRequest el : changeStatusRequest) {
            list.add(changeStatusConversion(el));
        }
        return list;
    }

    @Override
    public PageableObject<CensorAddHoneyRequestResponse> getHistoryAddPoint(CensorSearchHistoryRequest historyRequest) {
        Pageable pageable = PageRequest.of(historyRequest.getPage(), historyRequest.getSize());
        return new PageableObject<>(historyRepository.getHistoryAddPoint(historyRequest, pageable));
    }

    @Override
    public PageableObject<CensorTransactionRequestResponse> getHistoryTransaction(CensorSearchHistoryRequest historyRequest) {
        Pageable pageable = PageRequest.of(historyRequest.getPage(), historyRequest.getSize());
        return new PageableObject<>(historyRepository.getHistoryTransaction(historyRequest, pageable));
    }

    @Override
    public CensorDetailRequestResponse getRequest(String idRequest) {
        return historyRepository.getHistoryDetail(idRequest);
    }

    @Override
    public Integer countRequest(Integer type) {
        TypeHistory honeyStatus = null;
        if (type != null) honeyStatus = TypeHistory.values()[type];
        return historyRepository.getCountRequest(honeyStatus);
    }


    @Override
    public SimpleResponse searchUser(String username) {
        String email = username;
        return requestApiidentity.handleCallApiGetUserByEmailOrUsername(email);
    }

    @Override
    public SimpleResponse getUserById(String id) {
        return requestApiidentity.handleCallApiGetUserById(id);
    }

    @Override
    public PageableObject<CensorTransactionRequestResponse> getHistoryApprovedByStatus(AdminHistoryApprovedSearchRequest searchParams) {
        Pageable pageable = PageRequest.of(searchParams.getPage(), searchParams.getSize());
        return new PageableObject<>(historyRepository.getHistoryApprovedByStatus(searchParams, pageable));
    }

    @Override
    public PageableObject<CensorTransactionRequestResponse> getHistoryApprovedAllStatus(AdminHistoryApprovedSearchRequest searchParams) {
        Pageable pageable = PageRequest.of(searchParams.getPage(), searchParams.getSize());
        return new PageableObject<>(historyRepository.getHistoryApprovedAllStatus(searchParams, pageable));
    }

    @Override
    public PageableObject<CensorTransactionRequestResponse> getExchangeGiftAllStatus(AdminHistoryApprovedSearchRequest searchParams) {
        Pageable pageable = PageRequest.of(searchParams.getPage(), searchParams.getSize());
        return new PageableObject<>(historyRepository.getExchangeGiftAllStatus(searchParams, pageable));
    }

    @Override
    public PageableObject<CensorTransactionRequestResponse> getExchangeGiftByStatus(AdminHistoryApprovedSearchRequest searchParams) {
        Pageable pageable = PageRequest.of(searchParams.getPage(), searchParams.getSize());
        return new PageableObject<>(historyRepository.getExchangeGiftByStatus(searchParams, pageable));
    }

    @Override
    public PageableObject<CensorTransactionRequestResponse> getListRequests(AdminHistoryApprovedSearchRequest searchParams) {
        Pageable pageable = PageRequest.of(searchParams.getPage(), searchParams.getSize());
        return new PageableObject<>(historyRepository.getListRequests(searchParams, pageable));
    }

    @Override
    public PageableObject<CensorTransactionRequestResponse> getListRequestsByStatus(AdminHistoryApprovedSearchRequest searchParams) {
        Pageable pageable = PageRequest.of(searchParams.getPage(), searchParams.getSize());
        return new PageableObject<>(historyRepository.getListRequestsByStatus(searchParams, pageable));
    }

    @Override
    public Integer getPointByIdStudentAndIdCategory(String studentId, String honeyCategoryId) {
        return honeyRepository.getPointByIdStudentAndIdCategory(studentId, honeyCategoryId);
    }
}

