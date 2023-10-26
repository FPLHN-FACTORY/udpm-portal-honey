package com.honeyprojects.core.admin.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminChangeStatusGiftRequest {

    String idHistory;

    int status;

    String idGift;

    String idStudent;

    String note;


}
