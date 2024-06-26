package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminCategoryRequest extends PageableRequest {

    private String search;

    private Integer status;

    private Integer transactionRights;

}
