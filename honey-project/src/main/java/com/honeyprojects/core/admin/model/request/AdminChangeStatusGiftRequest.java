package com.honeyprojects.core.admin.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminChangeStatusGiftRequest {

    String idHistory;

    String idHistoryDetail;

    Integer status;

    String idGift;

    String idStudent;

    String note;

    Integer quantityGift;

}
