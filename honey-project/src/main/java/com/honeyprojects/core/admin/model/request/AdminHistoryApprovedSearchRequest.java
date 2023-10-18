package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;

@Getter
@Setter
public class AdminHistoryApprovedSearchRequest extends PageableRequest {
    private String idCategory;
    private String idStudent;
    private String status;
}
