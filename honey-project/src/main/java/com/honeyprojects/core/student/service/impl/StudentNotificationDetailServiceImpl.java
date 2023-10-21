package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.admin.model.request.AdminCreateArchiveGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateHoneyRequest;
import com.honeyprojects.core.admin.repository.*;
import com.honeyprojects.core.student.model.response.StudentNotificationDetaiRespone;
import com.honeyprojects.core.student.repository.StudentNotificationDetailRepository;
import com.honeyprojects.core.student.repository.StudentNotificationRepository;
import com.honeyprojects.core.student.service.StudentNotificationDetailService;
import com.honeyprojects.entity.*;
import com.honeyprojects.infrastructure.contant.NotificationDetailType;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StudentNotificationDetailServiceImpl implements StudentNotificationDetailService {

    @Autowired
    private StudentNotificationDetailRepository studentNotificationDetailRepository;

    @Autowired
    private AdminCategoryRepository adminCategoryRepository;

    @Autowired
    private AdminHoneyRepository adminHoneyRepository;

    @Autowired
    private AdArchiveRepository adArchiveRepository;

    @Autowired
    private AdArchiveGiftRepository adArchiveGiftRepository;

    @Autowired
    private AdRandomAddPointRepository adRandomAddPointRepository;

    @Autowired
    private StudentNotificationRepository adNotificationRespository;

    @Override
    public List<StudentNotificationDetaiRespone> getAllNotificationDetailByIdNotification(String idStudent, String idNotification) {
        return studentNotificationDetailRepository.getAllNotificationDetialByIdNotification(idStudent, idNotification);
    }

    @Override
    public Boolean receivingGiftsFromNotifications(List<String> lstIdNotificationDetail, String idStudent, String id) {
        if (lstIdNotificationDetail.isEmpty()) {
            return false;
        } else {
            List<NotificationDetail> lstHoney = new ArrayList<>();
            List<NotificationDetail> lstGift = new ArrayList<>();
            for (String s : lstIdNotificationDetail) {
                Optional<NotificationDetail> notificationDetailOptional = studentNotificationDetailRepository.findById(s);
                if (notificationDetailOptional.isPresent()) {
                    NotificationDetail notificationDetail = notificationDetailOptional.get();
                    if (notificationDetail.getType().equals(NotificationDetailType.NOTIFICATION_DETAIL_GIFT)) {
                        lstGift.add(notificationDetail);
                    } else if (notificationDetail.getType().equals(NotificationDetailType.NOTIFICATION_DETAIL_HONEY)) {
                        lstHoney.add(notificationDetail);
                    }
                } else {
                    continue;
                }
            }

            for (NotificationDetail detail : lstGift) {
                String idGift = detail.getIdObject();
                String archiveId = adArchiveRepository.getIdArchiveByIdStudent(idStudent);
                if (archiveId == null) {
                    Archive archive = new Archive();
                    archive.setStudentId(idStudent);
                    archive.setClubId(null);
                    archive.setStatus(Status.HOAT_DONG);
                    adArchiveRepository.save(archive);
                    for (int i = 0; i < detail.getQuantity(); i++) {
                        // Tạo một bản ghi ArchiveGift mới và lưu vào cơ sở dữ liệu
                        AdminCreateArchiveGiftRequest adminCreateArchiveGiftRequest = new AdminCreateArchiveGiftRequest(archive.getId(), null, idGift);
                        ArchiveGift archiveGift = adminCreateArchiveGiftRequest.createArchivegift(new ArchiveGift());
                        adArchiveGiftRepository.save(archiveGift);
                    }
                } else {
                    for (int i = 0; i < detail.getQuantity(); i++) {
                        // Tạo một bản ghi ArchiveGift mới và lưu vào cơ sở dữ liệu
                        AdminCreateArchiveGiftRequest adminCreateArchiveGiftRequest = new AdminCreateArchiveGiftRequest(archiveId, null, idGift);
                        ArchiveGift archiveGift = adminCreateArchiveGiftRequest.createArchivegift(new ArchiveGift());
                        adArchiveGiftRepository.save(archiveGift);
                    }
                }
            }

            for (NotificationDetail detail : lstHoney) {
                Optional<Honey> optionalHoney = adRandomAddPointRepository.getHoneyByIdStudent(idStudent, detail.getIdObject());
                if (optionalHoney.isPresent()) {
                    Honey honey = optionalHoney.get();
                    honey.setHoneyPoint(honey.getHoneyPoint() + detail.getQuantity());
                    adminHoneyRepository.save(honey);
                } else {
                    AdminCreateHoneyRequest adminCreateHoneyRequest = new AdminCreateHoneyRequest(detail.getIdObject(), idStudent, null, detail.getQuantity());
                    Honey honey = adminCreateHoneyRequest.createHoney(new Honey());
                    adminHoneyRepository.save(honey);
                }
            }
            return true;
        }
    }

    @Override
    public Notification getNotificationById(String id) {
        return adNotificationRespository.findById(id).orElse(null);
    }

    @Override
    public Notification updateStatus(String id) {
        Optional<Notification> optionalNotification = adNotificationRespository.findById(id);
        optionalNotification.get().setStatus(NotificationStatus.DA_NHAN);
        return adNotificationRespository.save(optionalNotification.get());
    }

}
