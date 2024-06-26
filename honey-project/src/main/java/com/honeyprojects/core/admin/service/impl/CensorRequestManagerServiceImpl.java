package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminChangeStatusGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminHistoryApprovedSearchRequest;
import com.honeyprojects.core.admin.model.request.CensorChangeStatusRequest;
import com.honeyprojects.core.admin.model.request.CensorSearchHistoryRequest;
import com.honeyprojects.core.admin.model.response.CensorAddHoneyRequestResponse;
import com.honeyprojects.core.admin.model.response.CensorDetailRequestResponse;
import com.honeyprojects.core.admin.model.response.CensorTransactionRequestResponse;
import com.honeyprojects.core.admin.repository.AdHoneyRepository;
import com.honeyprojects.core.admin.repository.CensorHistoryRepository;
import com.honeyprojects.core.admin.service.CensorRequestManagerService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.student.repository.StudentArchiveGiftRepository;
import com.honeyprojects.core.student.repository.StudentArchiveRepository;
import com.honeyprojects.core.student.repository.StudentGiftRepository;
import com.honeyprojects.entity.Archive;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.HistoryDetail;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.Message;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import com.honeyprojects.repository.HistoryDetailRepository;
import com.honeyprojects.util.ConvertRequestApiidentity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;

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

    @Override
    @Transactional
    public History changeStatus(CensorChangeStatusRequest changeReq) {
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        History history = historyRepository.findById(changeReq.getIdHistory()).orElseThrow(() -> new RestApiException(Message.HISTORY_NOT_EXIST));
        history.setStatus(HoneyStatus.values()[changeReq.getStatus()]);
        HistoryDetail historyDetail = historyDetailRepository.findById(changeReq.getIdHistoryDetail()).orElse(null);
        if (changeReq.getStatus() == 1 && history.getType().equals(TypeHistory.CONG_DIEM)) {
            Honey honey = honeyRepository.findById(historyDetail.getHoneyId()).orElseThrow(() -> new RestApiException(Message.HISTORY_NOT_EXIST));
            honey.setHoneyPoint(honey.getHoneyPoint() + historyDetail.getHoneyPoint());
            honey.setStatus(Status.HOAT_DONG);
            honeyRepository.save(honey);
            history.setChangeDate(dateNow);
        } else if (changeReq.getStatus() == 1 && history.getType().equals(TypeHistory.GIAO_DICH)) {
            //lay ra honey cua nguoi gui
            Honey honey = honeyRepository.findById(historyDetail.getHoneyId())
                    .orElseThrow(() -> new RestApiException(Message.HONEY_NOT_EXIST));
            //tru honey cua nguoi gui
            honey.setHoneyPoint(honey.getHoneyPoint() - historyDetail.getHoneyPoint());

            //lay ra honey cua nguoi nhan
            Honey honeyNhan = honeyRepository.getPoint(history.getStudentId(),
                    honey.getHoneyCategoryId());
            honeyRepository.save(honey);
            //kiem tra neu honey nguoi nhan khong ton tai se tao moi
            if (honeyNhan == null) {
                honeyNhan = new Honey();
                honeyNhan.setHoneyPoint(0);
                honeyNhan.setHoneyCategoryId(honey.getHoneyCategoryId());
                honeyNhan.setStudentId(history.getStudentId());
            }
            //cong them honey cho nguoi nhan
            honeyNhan.setHoneyPoint(honeyNhan.getHoneyPoint() + historyDetail.getHoneyPoint());
            honeyRepository.save(honeyNhan);

            history.setChangeDate(dateNow);
        }
        return historyRepository.save(history);
    }

    @Override
    public History changeStatusConversion(AdminChangeStatusGiftRequest request) {
        Long dateNow = Calendar.getInstance().getTimeInMillis();

        History history = historyRepository.findById(request.getIdHistory()).orElseThrow(() -> new RestApiException(Message.HISTORY_NOT_EXIST));
        history.setStatus(HoneyStatus.values()[request.getStatus()]);
        HistoryDetail historyDetail = historyDetailRepository.findById(request.getIdHistoryDetail()).orElse(null);
        ArchiveGift archiveGift = new ArchiveGift();
        Gift gift = giftRepository.findById(request.getIdGift()).orElse(null);

        Archive archive = new Archive();
        archive.setStudentId(request.getIdStudent());
        archive.setStatus(Status.HOAT_DONG);
        if (history.getStatus().equals(HoneyStatus.DA_PHE_DUYET) && history.getType().equals(TypeHistory.DOI_QUA)) {
            Honey honey = honeyRepository.findById(historyDetail.getHoneyId()).orElseThrow(() -> new RestApiException(Message.HISTORY_NOT_EXIST));
            honey.setHoneyPoint(honey.getHoneyPoint() - (historyDetail.getHoneyPoint() * request.getQuantityGift()));
            honeyRepository.save(honey);
            if(gift.getQuantity() != null) {
                gift.setQuantity(gift.getQuantity() - request.getQuantityGift());
                giftRepository.save(gift);
                history.setChangeDate(dateNow);
            }

                Archive getArchive = archiveRepository.findByStudentId(request.getIdStudent()).orElse(archive);
                archiveRepository.save(getArchive);
            ArchiveGift archiveGift1 = giftArchiveRepository.findByGiftIdAndArchiveId(request.getIdGift(),getArchive.getId());
            if(archiveGift1 != null){
                int currentQuantity = archiveGift1.getQuantity();
                int additionalQuantity = request.getQuantityGift();
                archiveGift1.setQuantity(currentQuantity + additionalQuantity);
                giftArchiveRepository.save(archiveGift1);
            }else{
                archiveGift.setGiftId(request.getIdGift());
                archiveGift.setNote(request.getNote());
                archiveGift.setArchiveId(getArchive.getId());
                archiveGift.setQuantity(request.getQuantityGift());
                giftArchiveRepository.save(archiveGift);
            }
        }
        return historyRepository.save(history);
    }

    @Override
    public History approvalAddGiftToStudent(AdminChangeStatusGiftRequest changeStatusRequest) {
        return null;
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
        History history = historyRepository.findById(idRequest).orElseThrow(() -> new RestApiException(Message.HISTORY_NOT_EXIST));
        if (history.getType().equals(TypeHistory.CONG_DIEM)) {
            return historyRepository.getAddPointRequest(idRequest);
        } else if (history.getType().equals(TypeHistory.GIAO_DICH)) {
            return historyRepository.getTransactionRequest(idRequest);
        }
        return null;
    }

    @Override
    public Integer countRequest(Integer type) {
        TypeHistory honeyStatus = null;
        if (type != null) honeyStatus = TypeHistory.values()[type];
        return historyRepository.getCountRequest(honeyStatus);
    }


    @Override
    public SimpleResponse searchUser(String username) {
        String email = username + "@fpt.edu.vn";
        return requestApiidentity.handleCallApiGetUserByEmail(email);
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
        return honeyRepository.getPointByIdStudentAndIdCategory(studentId,honeyCategoryId);
    }
}

