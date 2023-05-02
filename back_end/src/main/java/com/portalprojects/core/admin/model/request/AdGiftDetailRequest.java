package com.portalprojects.core.admin.model.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class AdGiftDetailRequest {

    private String studentId;

    private String giftId;

    private Date changeDate;
}
