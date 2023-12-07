package com.honeyprojects.core.president.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PresidentFindHoneyHistoryRequest extends PageableRequest {
    private String status;
    private String idCategory;
    private String idStudent;
}
