package com.honeyprojects.core.student.model.request;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class StudentChangeStatusHistoryRequest {

    String idHistory;

    int status;
}
