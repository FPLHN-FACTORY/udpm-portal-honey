package com.portalprojects.core.admin.model.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AdCreateGiftRequest {

    private String id;

    private String code;

    private String name;

    private int pointGift;

    private String note;

}
