package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.entity.NotificationDetail;
import com.honeyprojects.infrastructure.contant.Constants;
import com.honeyprojects.infrastructure.contant.NotificationDetailType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminCreateNotificationDetailRandomRequest {
    private String content;
    private String idObject;
    private String idNotification;
    private NotificationDetailType type;
    private Integer quantity;

    public NotificationDetail createNotificationDetail(NotificationDetail notificationDetail) {
        // Cắt bớt nội dung nếu nó vượt quá độ dài tối đa
        if (content.length() > Constants.MAX_CONTENT_LENGTH) {
            content = content.substring(0, Constants.MAX_CONTENT_LENGTH);
        }
        notificationDetail.setContent(this.content);
        notificationDetail.setIdObject(this.idObject);
        notificationDetail.setIdNotification(this.idNotification);
        notificationDetail.setType(this.type);
        notificationDetail.setQuantity(this.quantity);
        return notificationDetail;
    }
}
