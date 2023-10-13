package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.entity.Notification;
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
    private Integer type;

    // Xác định độ dài tối đa cho content
    private static final int MAX_CONTENT_LENGTH = 255; // Điều chỉnh độ dài theo nhu cầu

    public Notification createNotification(Notification notification) {
        // Cắt bớt nội dung nếu nó vượt quá độ dài tối đa
        if (content.length() > MAX_CONTENT_LENGTH) {
            content = content.substring(0, MAX_CONTENT_LENGTH);
        }

        notification.setTitle(this.title);
        notification.setContent(this.content);
        notification.setStudentId(this.studentId);
        notification.setType(NotificationType.values()[type]);
        return notification;
    }
}
