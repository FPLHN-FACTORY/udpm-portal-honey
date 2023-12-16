package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminNotificationRequest;
import com.honeyprojects.core.admin.repository.AdNotificationRespository;
import com.honeyprojects.core.admin.service.AdNotificationService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Notification;
import com.honeyprojects.infrastructure.contant.Constants;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.NotificationType;
import com.honeyprojects.util.DataUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdNotificationServiceImpl implements AdNotificationService {

    @Autowired
    private AdNotificationRespository adNotificationRespository;

    @Override
    public PageableObject<Notification> getAllNotification(AdminNotificationRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<Notification> res = adNotificationRespository.getAllNotification(pageable);
        return new PageableObject<>(res);
    }

    @Override
    public Integer getNumberNotifications() {
        return adNotificationRespository.getNumberNotifications();
    }

    @Override
    @Transactional
    public void updateAllStatus() {
        List<Notification> notifications = adNotificationRespository.findByTypeAndStatus(NotificationType.ADMIN_CHO_PHE_DUYET,
                NotificationStatus.CHUA_DOC);
        if (!DataUtils.isNullObject(notifications)) {
            for (Notification notification : notifications) {
                notification.setStatus(NotificationStatus.DA_DOC);
            }
            adNotificationRespository.saveAll(notifications);
        }
    }

    @Override
    @Transactional
    public Notification updateStatus(String id) {
        Notification optionalNotification = adNotificationRespository.findByIdAndStatus(id, NotificationStatus.CHUA_DOC);
        if (!DataUtils.isNullObject(optionalNotification)) {
            optionalNotification.setStatus(NotificationStatus.DA_DOC);
            adNotificationRespository.save(optionalNotification);
        }
        return optionalNotification;
    }

    @Override
    public Notification sendNotificationApprovalToStudent(String studentId) {
        String title = Constants.TITLE_NOTIFICATION_SYSTEM;
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setType(NotificationType.HE_THONG);
        notification.setStatus(NotificationStatus.CHUA_DOC);
        notification.setStudentId(studentId);
        return adNotificationRespository.save(notification);
    }

    @Override
    public Notification sendNotificationApprovalToTeacher(String teacherId, String userNameStudent, String historyId) {
        String title = "Yêu cầu phê duyệt cho sinh viên " + userNameStudent + " đã được phê duyệt";
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setType(NotificationType.DA_PHE_DUYET_TEACHER);
        notification.setStatus(NotificationStatus.CHUA_DOC);
        notification.setTeacherId(teacherId);
        notification.setIdHistoryDetail(historyId);
        return adNotificationRespository.save(notification);
    }

    @Override
    public Notification sendNotificationApprovalToPresident(String presidentId, String userNameStudent, String historyId) {
        String title = "Yêu cầu phê duyệt cho sinh viên " + userNameStudent + " đã được phê duyệt";
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setType(NotificationType.DA_PHE_DUYET_PRESIDENT);
        notification.setStatus(NotificationStatus.CHUA_DOC);
        notification.setPresidentId(presidentId);
        notification.setIdHistoryDetail(historyId);
        return adNotificationRespository.save(notification);
    }

    @Override
    public Notification teacherSendNotificationToStudent(String studentId, String teacherName) {
        String title = "THÔNG BÁO TỪ GIẢNG VIÊN - " + teacherName;
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setType(NotificationType.HE_THONG);
        notification.setStatus(NotificationStatus.CHUA_DOC);
        notification.setStudentId(studentId);
        return adNotificationRespository.save(notification);
    }

    @Override
    public Notification presidentSendNotificationToStudent(String studentId, String presidentName) {
        String title = "THÔNG BÁO TỪ CHỦ TỊCH XƯỞNG - " + presidentName;
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setType(NotificationType.HE_THONG);
        notification.setStatus(NotificationStatus.CHUA_DOC);
        notification.setStudentId(studentId);
        return adNotificationRespository.save(notification);
    }

    @Override
    public Notification sendNotificationRefuseToStudent(String studentId) {
        String title = Constants.TITLE_NOTIFICATION_SYSTEM;
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setType(NotificationType.HE_THONG);
        notification.setStatus(NotificationStatus.CHUA_DOC);
        notification.setStudentId(studentId);
        return adNotificationRespository.save(notification);
    }

    @Override
    public Notification sendNotificationRefuseToTeacher(String teacherId, String userNameStudent, String historyId) {
        String title = "Yêu cầu phê duyệt cho sinh viên " + userNameStudent + " đã bị từ chối";
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setType(NotificationType.TU_CHOI_TEACHER);
        notification.setStatus(NotificationStatus.CHUA_DOC);
        notification.setTeacherId(teacherId);
        notification.setIdHistoryDetail(historyId);
        return adNotificationRespository.save(notification);
    }

    @Override
    public Notification sendNotificationRefuseToPresident(String presidentId, String userNameStudent, String historyId) {
        String title = "Yêu cầu phê duyệt cho sinh viên " + userNameStudent + " đã bị từ chối";
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setType(NotificationType.TU_CHOI_PRESIDENT);
        notification.setStatus(NotificationStatus.CHUA_DOC);
        notification.setPresidentId(presidentId);
        notification.setIdHistoryDetail(historyId);
        return adNotificationRespository.save(notification);
    }
}
