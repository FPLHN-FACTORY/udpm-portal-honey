package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.entity.Notification;
import com.honeyprojects.infrastructure.contant.Constants;
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
public class AdminNotificationRandomRequest {
    private String title;
    private String content;
    private String studentId;
    private NotificationType type;
    private NotificationStatus status;
    public Notification createNotification(Notification notification) {
        // Cắt bớt nội dung nếu nó vượt quá độ dài tối đa
        if (content.length() > Constants.MAX_CONTENT_LENGTH) {
            content = content.substring(0, Constants.MAX_CONTENT_LENGTH);
        }
        notification.setTitle(this.title);
        notification.setContent(this.content);
        notification.setStudentId(this.studentId);
        notification.setType(this.type);
        notification.setStatus(this.status);
        return notification;
    }
}
