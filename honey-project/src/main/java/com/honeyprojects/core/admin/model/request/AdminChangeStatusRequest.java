package com.honeyprojects.core.admin.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminChangeStatusRequest {
    String idHistory;

    int status;
}
