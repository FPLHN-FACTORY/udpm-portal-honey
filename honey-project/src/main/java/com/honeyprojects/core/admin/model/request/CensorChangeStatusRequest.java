package com.honeyprojects.core.admin.model.request;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class CensorChangeStatusRequest {

    String idHistory;

    int status;
}
