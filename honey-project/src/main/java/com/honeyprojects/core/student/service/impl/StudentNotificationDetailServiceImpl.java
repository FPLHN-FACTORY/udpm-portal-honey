package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.admin.model.request.AdminCreateArchiveGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateHoneyRequest;
import com.honeyprojects.core.admin.model.request.AdminHistoryRandomDetailRequest;
import com.honeyprojects.core.admin.model.request.AdminHistoryRandomRequest;
import com.honeyprojects.core.admin.repository.AdArchiveGiftRepository;
import com.honeyprojects.core.admin.repository.AdArchiveRepository;
import com.honeyprojects.core.admin.repository.AdRandomAddPointRepository;
import com.honeyprojects.core.admin.repository.AdminHoneyRepository;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.student.model.response.StudentNotificationDetaiRespone;
import com.honeyprojects.core.student.repository.StudentCategoryRepository;
import com.honeyprojects.core.student.repository.StudentChestRepository;
import com.honeyprojects.core.student.repository.StudentGiftRepository;
import com.honeyprojects.core.student.repository.StudentHistoryRepository;
import com.honeyprojects.core.student.repository.StudentNotificationDetailRepository;
import com.honeyprojects.core.student.repository.StudentNotificationRepository;
import com.honeyprojects.core.student.service.StudentNotificationDetailService;
import com.honeyprojects.entity.Archive;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.entity.Category;
import com.honeyprojects.entity.Chest;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.HistoryDetail;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.entity.Notification;
import com.honeyprojects.entity.NotificationDetail;
import com.honeyprojects.infrastructure.contant.HistoryStatus;
import com.honeyprojects.infrastructure.contant.NotificationDetailType;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunction;
import com.honeyprojects.infrastructure.rabbit.RabbitProducer;
import com.honeyprojects.repository.HistoryDetailRepository;
import com.honeyprojects.util.AddPointUtils;
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
    private StudentHistoryRepository studentHistoryRepository;

    @Autowired
    private HistoryDetailRepository historyDetailRepository;

    @Autowired
    private ConvertRequestApiidentity convertRequestApiidentity;

    @Autowired
    private AddPointUtils addPointUtils;

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
            History history = createHistory(idStudent, TypeHistory.MAT_ONG_VA_VAT_PHAM, HistoryStatus.DA_PHE_DUYET);
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
//                String archiveId = adArchiveRepository.getIdArchiveByIdStudent(idStudent);
                SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserById(idStudent);

                if (gift != null) {
                    ArchiveGift archiveGift = addPointUtils.addGiftUtils(idStudent, detail.getIdObject(), detail.getQuantity());
                    stringBuilder.append(detail.getQuantity() + " vật phẩm: " + gift.getName() + " được thêm vào túi đồ của sinh viên: " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + ", ");
                    createHistoryDetail(simpleResponse.getId(), null, gift.getId(), null, history.getId(), detail.getQuantity(), null, gift.getName());
                }
//                if (archiveId == null) {
//                    //tại archive mới của sinh viên
//                    Archive archive = createArchive(idStudent);
//                    // Tạo một bản ghi ArchiveGift mới và lưu vào cơ sở dữ liệu
//
//                } else {
//                    // Tạo một bản ghi ArchiveGift mới và lưu vào cơ sở dữ liệu
//                    creaateArchiveGiftAndHistoryDetail(simpleResponse, archiveId, gift, history, detail.getQuantity(), stringBuilder);
//                }
            }

            for (NotificationDetail detail : lstHoney) {
                Honey honey = addPointUtils.addHoneyUtils(idStudent, detail.getIdObject(), detail.getQuantity());
                SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserById(idStudent);

                if (honey != null) {
                    Category category = studentCategoryRepository.findById(honey.getHoneyCategoryId()).orElse(null);

                    stringBuilder.append(detail.getQuantity() + " mật ong: " + category.getName() + " được thêm vào túi đồ của sinh viên: " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + ", ");
                    createHistoryDetail(simpleResponse.getId(), honey.getId(), null, null, history.getId(), null, detail.getQuantity(), null);
                }
            }

            for (NotificationDetail detail : lstChest) {
                Optional<Chest> optionalChest = chestRepository.findById(detail.getIdObject());
                SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserById(idStudent);
                if (optionalChest.isPresent()) {
                    ArchiveGift archiveGift = addPointUtils.addChestUtils(idStudent, detail.getIdObject(), detail.getQuantity());
                    Chest chest = optionalChest.get();
                    stringBuilder.append(detail.getQuantity() + " rương: " + chest.getName() + " được thêm vào túi đồ của sinh viên: " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + ", ");
                    createHistoryDetail(simpleResponse.getId(), null, null, chest.getId(), history.getId(), null, null, null);

//                    String archiveId = adArchiveRepository.getIdArchiveByIdStudent(idStudent);
//                    if (archiveId == null) {
//                        Archive archive = createArchive(idStudent);
//                        creaateArchiveChestAndHistoryDetail(simpleResponse, archive.getId(), chest, history, detail.getQuantity(), stringBuilder);
//                    } else {
//                        creaateArchiveChestAndHistoryDetail(simpleResponse, archiveId, chest, history, detail.getQuantity(), stringBuilder);
//                    }
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

    private ArchiveGift creaateArchiveGiftAndHistoryDetail(SimpleResponse simpleResponse, String archive, Gift gift, History history, Integer quantity, StringBuilder stringBuilder) {
        AdminCreateArchiveGiftRequest adminCreateArchiveGiftRequest = new AdminCreateArchiveGiftRequest(archive, null, gift.getId(), quantity);
        ArchiveGift archiveGift = adminCreateArchiveGiftRequest.createArchivegift(new ArchiveGift());
        stringBuilder.append(quantity + " vật phẩm: " + gift.getName() + " được thêm vào túi đồ của sinh viên: " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + ", ");
        createHistoryDetail(simpleResponse.getId(), null, gift.getId(), null, history.getId(), quantity, null, gift.getName());
        return adArchiveGiftRepository.save(archiveGift);
    }

    private ArchiveGift creaateArchiveChestAndHistoryDetail(SimpleResponse simpleResponse, String archive, Chest chest, History history, Integer quantity, StringBuilder stringBuilder) {
        AdminCreateArchiveGiftRequest adminCreateArchiveGiftRequest = new AdminCreateArchiveGiftRequest(archive, chest.getId(), null, quantity);
        ArchiveGift archiveGift = adminCreateArchiveGiftRequest.createArchivegift(new ArchiveGift());
        stringBuilder.append(quantity + " rương: " + chest.getName() + " được thêm vào túi đồ của sinh viên: " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + ", ");
        createHistoryDetail(simpleResponse.getId(), null, null, chest.getId(), history.getId(), null, null, null);
        return adArchiveGiftRepository.save(archiveGift);
    }

    private History createHistory(String idStudent, TypeHistory typeHistory, HistoryStatus status) {
        AdminHistoryRandomRequest request = new AdminHistoryRandomRequest(idStudent, typeHistory, status);
        History history = request.createHistory(new History());
        return studentHistoryRepository.save(history);
    }

    private HistoryDetail createHistoryDetail(String idStudent, String idHoney, String idGift, String idChest, String idHistory, Integer giftQuantity, Integer quantityHoney, String nameGift) {
        AdminHistoryRandomDetailRequest request = new AdminHistoryRandomDetailRequest(idStudent, idHoney, idGift, idChest, idHistory, giftQuantity, quantityHoney, nameGift);
        HistoryDetail historyDetail = request.createHistoryDetail(new HistoryDetail());
        return historyDetailRepository.save(historyDetail);
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
