package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminAddPointStudentLabReportBO;
import com.honeyprojects.core.admin.model.request.AdminAddPointStudentLabReportRequest;
import com.honeyprojects.core.admin.model.request.AdminAddPointStudentPortalEventsBO;
import com.honeyprojects.core.admin.model.request.AdminCreateNotificationDetailRandomRequest;
import com.honeyprojects.core.admin.model.request.AdminNotificationRandomRequest;
import com.honeyprojects.core.admin.repository.AdNotificationRespository;
import com.honeyprojects.core.admin.repository.AdminCategoryRepository;
import com.honeyprojects.core.admin.service.AdminAddPointStudentService;
import com.honeyprojects.core.student.repository.StudentNotificationDetailRepository;
import com.honeyprojects.core.teacher.model.request.TeacherGetPointRequest;
import com.honeyprojects.core.teacher.model.response.TeacherPointResponse;
import com.honeyprojects.core.teacher.repository.TeacherHistoryRepository;
import com.honeyprojects.core.teacher.repository.TeacherHoneyRepository;
import com.honeyprojects.entity.Category;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.entity.Notification;
import com.honeyprojects.entity.NotificationDetail;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.Constants;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.NotificationDetailType;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.NotificationType;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.util.DataUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;

@Service
public class AdminAddPointStudentServiceImpl implements AdminAddPointStudentService {

    @Autowired
    private AdminCategoryRepository adminCategoryRepository;

    @Autowired
    private StudentNotificationDetailRepository studentNotificationDetailRepository;

    @Autowired
    private AdNotificationRespository adNotificationRespository;

    @Autowired
    private TeacherHistoryRepository historyRepository;

    @Autowired
    private TeacherHoneyRepository honeyRepository;

    @Override
    public Boolean addPointToStudentLabReport(AdminAddPointStudentLabReportBO requestAddPointStudentBO) {

        Category category = adminCategoryRepository.findById(requestAddPointStudentBO.getCategoryId()).orElse(null);

        String enumCategoryFREE = String.valueOf(CategoryStatus.FREE.ordinal());
        String enumCategoryACCEPT = String.valueOf(CategoryStatus.ACCEPT.ordinal());

        for (AdminAddPointStudentLabReportRequest adminAddPointStudentLabReportRequest :
                requestAddPointStudentBO.getListStudent()) {
            if (category.getCategoryStatus().equals(enumCategoryFREE)) {
                Notification notification = createNotification(adminAddPointStudentLabReportRequest.getId());
                if (!DataUtils.isNullObject(requestAddPointStudentBO.getListStudent())) {
                    try {
                        Integer honeyPoint = adminAddPointStudentLabReportRequest.getNumberHoney();
                        createNotificationDetailHoney(category, notification.getId(), honeyPoint);
                    } catch (NumberFormatException e) {
                        e.printStackTrace();
                    }
                }
            }
            if (category.getCategoryStatus().equals(enumCategoryACCEPT)){
                TeacherGetPointRequest getPointRequest = new TeacherGetPointRequest();
                getPointRequest.setStudentId(adminAddPointStudentLabReportRequest.getId());
                getPointRequest.setCategoryId(requestAddPointStudentBO.getCategoryId());
                TeacherPointResponse teacherPointResponse = honeyRepository.getPoint(getPointRequest);

                History history = new History();
                history.setStatus(HoneyStatus.CHO_PHE_DUYET);
//                history.setHoneyPoint(adminAddPointStudentLabReportRequest.getNumberHoney());
                history.setType(TypeHistory.CONG_DIEM);
                history.setCreatedAt(new Date().getTime());
                if (teacherPointResponse == null) {
                    Honey honey = new Honey();
                    honey.setStatus(Status.HOAT_DONG);
                    honey.setHoneyPoint(0);
                    honey.setStudentId(adminAddPointStudentLabReportRequest.getId());
                    honey.setHoneyCategoryId(requestAddPointStudentBO.getCategoryId());
//                    history.setHoneyId(honeyRepository.save(honey).getId());
                } else {
                    Honey honey = honeyRepository.findById(teacherPointResponse.getId()).orElseThrow();
//                    history.setHoneyId(honey.getId());
                }
                history.setStudentId(adminAddPointStudentLabReportRequest.getId());
                historyRepository.save(history);
            }
        }
        return true;
    }

    @Override
    public Boolean createPointToStudentPortalEvents(AdminAddPointStudentPortalEventsBO requestAddPointStudentBO) {
        Category category = adminCategoryRepository.findById(requestAddPointStudentBO.getCategoryId()).orElse(null);
        Integer honeyPoint = requestAddPointStudentBO.getNumberHoney();
        String enumCategoryFREE = String.valueOf(CategoryStatus.FREE.ordinal());
        String enumCategoryACCEPT = String.valueOf(CategoryStatus.ACCEPT.ordinal());

        for (String studentId :
                requestAddPointStudentBO.getLstStudentId()) {
            if (category.getCategoryStatus().equals(enumCategoryFREE)) {
                Notification notification = createNotification(studentId);
                if (!DataUtils.isNullObject(requestAddPointStudentBO.getLstStudentId())) {
                    try {
                        createNotificationDetailHoney(category, notification.getId(), honeyPoint);
                    } catch (NumberFormatException e) {
                        e.printStackTrace();
                    }
                }
            }
            if (category.getCategoryStatus().equals(enumCategoryACCEPT)){
                TeacherGetPointRequest getPointRequest = new TeacherGetPointRequest();
                getPointRequest.setStudentId(studentId);
                getPointRequest.setCategoryId(requestAddPointStudentBO.getCategoryId());
                TeacherPointResponse teacherPointResponse = honeyRepository.getPoint(getPointRequest);

                History history = new History();
                history.setStatus(HoneyStatus.CHO_PHE_DUYET);
//                history.setHoneyPoint(honeyPoint);
                history.setType(TypeHistory.CONG_DIEM);
                history.setCreatedAt(new Date().getTime());
                if (teacherPointResponse == null) {
                    Honey honey = new Honey();
                    honey.setStatus(Status.HOAT_DONG);
                    honey.setHoneyPoint(0);
                    honey.setStudentId(studentId);
                    honey.setHoneyCategoryId(requestAddPointStudentBO.getCategoryId());
//                    history.setHoneyId(honeyRepository.save(honey).getId());
                } else {
                    Honey honey = honeyRepository.findById(teacherPointResponse.getId()).orElseThrow();
//                    history.setHoneyId(honey.getId());
                }
                history.setStudentId(studentId);
                historyRepository.save(history);
            }
        }
        return true;
    }

    private Notification createNotification(String idStudent) {
        String title = Constants.TITLE_NOTIFICATION_SYSTEM;
        AdminNotificationRandomRequest request = new AdminNotificationRandomRequest(title, idStudent, NotificationType.HE_THONG, NotificationStatus.CHUA_DOC);
        Notification notification = request.createNotification(new Notification());
        return adNotificationRespository.save(notification);
    }

    private NotificationDetail createNotificationDetailHoney(Category category, String idNotification, Integer quantity) {
        Integer roundedQuantity = (int) Math.round(quantity);
        String content = Constants.CONTENT_NOTIFICATION_MODULE_LAB_REPORT + " Mật ong - " + category.getName() + " - Số lượng: " + roundedQuantity;
        AdminCreateNotificationDetailRandomRequest detailRandomRequest = new AdminCreateNotificationDetailRandomRequest(content, category.getId(), idNotification,
                NotificationDetailType.NOTIFICATION_DETAIL_HONEY, Integer.parseInt(String.valueOf(roundedQuantity)));
        NotificationDetail notificationDetail = detailRandomRequest.createNotificationDetail(new NotificationDetail());
        return studentNotificationDetailRepository.save(notificationDetail);
    }
}
