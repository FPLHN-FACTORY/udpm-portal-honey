package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.admin.model.request.AdminCreateArchiveGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateHoneyRequest;
import com.honeyprojects.core.admin.repository.*;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.student.model.response.StudentNotificationDetaiRespone;
import com.honeyprojects.core.student.repository.*;
import com.honeyprojects.core.student.service.StudentNotificationDetailService;
import com.honeyprojects.entity.*;
import com.honeyprojects.infrastructure.contant.NotificationDetailType;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunction;
import com.honeyprojects.infrastructure.rabbit.RabbitProducer;
import com.honeyprojects.util.ConvertRequestApiidentity;
import com.honeyprojects.util.LoggerUtil;
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

    @Autowired
    private StudentCategoryRepository studentCategoryRepository;

    @Autowired
    private StudentChestRepository chestRepository;

    @Autowired
    private LoggerUtil loggerUtil;

    @Autowired
    private RabbitProducer producer;

    @Autowired
    private StudentGiftRepository studentGiftRepository;

    @Autowired
    private ConvertRequestApiidentity convertRequestApiidentity;

    @Override
    public List<StudentNotificationDetaiRespone> getAllNotificationDetailByIdNotification(String idStudent, String idNotification) {
        return studentNotificationDetailRepository.getAllNotificationDetialByIdNotification(idStudent, idNotification);
    }

    @Override
    public Boolean receivingGiftsFromNotifications(List<String> lstIdNotificationDetail, String idStudent, String id) {
        StringBuilder stringBuilder = new StringBuilder();
        if (lstIdNotificationDetail.isEmpty()) {
            return false;
        } else {
            List<NotificationDetail> lstHoney = new ArrayList<>();
            List<NotificationDetail> lstGift = new ArrayList<>();
            List<NotificationDetail> lstChest = new ArrayList<>();
            for (String s : lstIdNotificationDetail) {
                Optional<NotificationDetail> notificationDetailOptional = studentNotificationDetailRepository.findById(s);
                if (notificationDetailOptional.isPresent()) {
                    NotificationDetail notificationDetail = notificationDetailOptional.get();
                    if (notificationDetail.getType().equals(NotificationDetailType.NOTIFICATION_DETAIL_GIFT)) {
                        lstGift.add(notificationDetail);
                    } else if (notificationDetail.getType().equals(NotificationDetailType.NOTIFICATION_DETAIL_HONEY)) {
                        lstHoney.add(notificationDetail);
                    } else if (notificationDetail.getType().equals(NotificationDetailType.NOTIFICATION_DETAIL_CHEST)) {
                        lstChest.add(notificationDetail);
                    }
                } else {
                    continue;
                }
            }

            for (NotificationDetail detail : lstGift) {
                Gift gift = studentGiftRepository.findById(detail.getIdObject()).orElse(null);
                String archiveId = adArchiveRepository.getIdArchiveByIdStudent(idStudent);
                SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserById(idStudent);
                if (archiveId == null) {
                    //tại archive mới của sinh viên
                    Archive archive = createArchive(idStudent);
                    // Tạo một bản ghi ArchiveGift mới và lưu vào cơ sở dữ liệu
                    AdminCreateArchiveGiftRequest adminCreateArchiveGiftRequest = new AdminCreateArchiveGiftRequest(archive.getId(), null, gift.getId(), detail.getQuantity());
                    ArchiveGift archiveGift = adminCreateArchiveGiftRequest.createArchivegift(new ArchiveGift());
                    stringBuilder.append(detail.getQuantity() + " vật phẩm: " + gift.getName() + " được thêm vào túi đồ của sinh viên: " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + ", ");
                    adArchiveGiftRepository.save(archiveGift);
                } else {
                    // Tạo một bản ghi ArchiveGift mới và lưu vào cơ sở dữ liệu
                    AdminCreateArchiveGiftRequest adminCreateArchiveGiftRequest = new AdminCreateArchiveGiftRequest(archiveId, null, gift.getId(), detail.getQuantity());
                    ArchiveGift archiveGift = adminCreateArchiveGiftRequest.createArchivegift(new ArchiveGift());
                    stringBuilder.append(detail.getQuantity() + " vật phẩm: " + gift.getName() + " được thêm vào túi đồ của sinh viên: " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + ", ");
                    adArchiveGiftRepository.save(archiveGift);
                }
            }

            for (NotificationDetail detail : lstHoney) {
                Optional<Honey> optionalHoney = adRandomAddPointRepository.getHoneyByIdStudent(idStudent, detail.getIdObject());
                SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserById(idStudent);
                if (optionalHoney.isPresent()) {
                    Honey honey = optionalHoney.get();
                    Category category = studentCategoryRepository.findById(honey.getHoneyCategoryId()).orElse(null);
                    honey.setHoneyPoint(honey.getHoneyPoint() + detail.getQuantity());
                    stringBuilder.append(detail.getQuantity() + " mật ong: " + category.getName() + " được thêm vào túi đồ của sinh viên: " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + ", ");
                    adminHoneyRepository.save(honey);
                } else {
                    AdminCreateHoneyRequest adminCreateHoneyRequest = new AdminCreateHoneyRequest(detail.getIdObject(), idStudent, null, detail.getQuantity());
                    Honey honey = adminCreateHoneyRequest.createHoney(new Honey());
                    Category category = studentCategoryRepository.findById(honey.getHoneyCategoryId()).orElse(null);
                    stringBuilder.append(detail.getQuantity() + " mật ong: " + category.getName() + " được thêm vào túi đồ của sinh viên: " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + ", ");
                    adminHoneyRepository.save(honey);
                }
            }

            for (NotificationDetail detail : lstChest) {
                Optional<Chest> optionalChest = chestRepository.findById(detail.getIdObject());
                SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserById(idStudent);
                if (optionalChest.isPresent()) {
                    Chest chest = optionalChest.get();
                    String archiveId = adArchiveRepository.getIdArchiveByIdStudent(idStudent);
                    if (archiveId == null) {
                        Archive archive = createArchive(idStudent);
                        AdminCreateArchiveGiftRequest adminCreateArchiveGiftRequest = new AdminCreateArchiveGiftRequest(archive.getId(), chest.getId(), null, detail.getQuantity());
                        ArchiveGift archiveGift = adminCreateArchiveGiftRequest.createArchivegift(new ArchiveGift());
                        stringBuilder.append(detail.getQuantity() + " rương: " + chest.getName() + " được thêm vào túi đồ của sinh viên: " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + ", ");
                        adArchiveGiftRepository.save(archiveGift);
                    } else {
                        AdminCreateArchiveGiftRequest adminCreateArchiveGiftRequest = new AdminCreateArchiveGiftRequest(archiveId, chest.getId(), null, detail.getQuantity());
                        ArchiveGift archiveGift = adminCreateArchiveGiftRequest.createArchivegift(new ArchiveGift());
                        stringBuilder.append(detail.getQuantity() + " rương: " + chest.getName() + " được thêm vào túi đồ của sinh viên: " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + ", ");
                        adArchiveGiftRepository.save(archiveGift);
                    }
                }
            }
            createLogBug(stringBuilder);
            return true;
        }
    }

    public Archive createArchive(String idStudent) {
        Archive archive = new Archive();
        archive.setStudentId(idStudent);
        archive.setStatus(Status.HOAT_DONG);
        return adArchiveRepository.save(archive);
    }

    private LoggerFunction createLogBug(StringBuilder stringBuilder) {
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        loggerObject.setContent(stringBuilder.toString());
        try {
            producer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return loggerObject;
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
