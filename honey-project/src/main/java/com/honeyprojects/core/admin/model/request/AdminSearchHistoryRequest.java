package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminSearchHistoryRequest extends PageableRequest {

    private String idStudent;

    private String status;

    private String idCategory;

    private String idAdmin;
}
