package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CensorSearchHistoryRequest extends PageableRequest {
    private String idStudent;
    private String idCategory;
}
