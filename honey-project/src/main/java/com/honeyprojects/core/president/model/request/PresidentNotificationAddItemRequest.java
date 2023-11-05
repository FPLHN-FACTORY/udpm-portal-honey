package com.honeyprojects.core.president.model.request;

import com.honeyprojects.entity.Notification;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PresidentNotificationAddItemRequest {
    private String title;
    private String studentId;
    private NotificationType type;
    private NotificationStatus status;

    public Notification createNotification(Notification notification) {
        notification.setTitle(this.title);
        notification.setStudentId(this.studentId);
        notification.setType(this.type);
        notification.setStatus(this.status);
        return notification;
    }
}
