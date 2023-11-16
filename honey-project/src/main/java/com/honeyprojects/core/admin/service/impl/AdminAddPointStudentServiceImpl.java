package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminAddPointStudentBO;
import com.honeyprojects.core.admin.model.request.AdminAddPointStudentRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateNotificationDetailRandomRequest;
import com.honeyprojects.core.admin.model.request.AdminNotificationRandomRequest;
import com.honeyprojects.core.admin.repository.AdNotificationRespository;
import com.honeyprojects.core.admin.repository.AdminCategoryRepository;
import com.honeyprojects.core.admin.service.AdminAddPointStudentService;
import com.honeyprojects.core.student.repository.StudentNotificationDetailRepository;
import com.honeyprojects.entity.Category;
import com.honeyprojects.entity.Notification;
import com.honeyprojects.entity.NotificationDetail;
import com.honeyprojects.infrastructure.contant.Constants;
import com.honeyprojects.infrastructure.contant.NotificationDetailType;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.NotificationType;
import com.honeyprojects.util.DataUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminAddPointStudentServiceImpl implements AdminAddPointStudentService {

    @Autowired
    private AdminCategoryRepository adminCategoryRepository;

    @Autowired
    private StudentNotificationDetailRepository studentNotificationDetailRepository;

    @Autowired
    private AdNotificationRespository adNotificationRespository;


    @Override
    public Boolean addPointStudent(AdminAddPointStudentBO student) {
            for (AdminAddPointStudentRequest adminAddPointStudentRequest :
                    student.getRequests()) {
                Notification notification = createNotification(adminAddPointStudentRequest.getId());
                if (!DataUtils.isNullObject(student.getRequests())) {
                    try {
                        // Kiểm tra và chuyển đổi point thành số
                        Double point = Double.valueOf(adminAddPointStudentRequest.getPointStudent());
//                        Category category = adminCategoryRepository.findById(conversion.getCategoryId()).orElse(null);
//                        createNotificationDetailHoney(category, notification.getId(), point);
                    } catch (NumberFormatException e) {
                        // Xử lý nếu không thể chuyển đổi thành số
                        e.printStackTrace(); // hoặc log thông báo lỗi
                    }
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

    private NotificationDetail createNotificationDetailHoney(Category category, String idNotification, Double quantity) {
        Integer roundedQuantity = (int) Math.round(quantity);
        String content = Constants.CONTENT_NOTIFICATION_MODULE_LAB_REPORT + " Mật ong - " + category.getName() + " - Số lượng: " + roundedQuantity;
        AdminCreateNotificationDetailRandomRequest detailRandomRequest = new AdminCreateNotificationDetailRandomRequest(content, category.getId(), idNotification,
                NotificationDetailType.NOTIFICATION_DETAIL_HONEY, Integer.parseInt(String.valueOf(roundedQuantity)));
        NotificationDetail notificationDetail = detailRandomRequest.createNotificationDetail(new NotificationDetail());
        return studentNotificationDetailRepository.save(notificationDetail);
    }
}
