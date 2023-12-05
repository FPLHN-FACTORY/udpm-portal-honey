package com.honeyprojects.core.president.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PresidentFindGiftHistoryRequest extends PageableRequest {
    private String idCategory;
    private String idStudent;
    private String status;
}
