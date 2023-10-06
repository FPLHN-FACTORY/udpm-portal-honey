package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import com.honeyprojects.infrastructure.contant.Status;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AdminFindAuctionRequest extends PageableRequest {

    private String name;

    private String status;

    private String honeyCategoryId;


}
