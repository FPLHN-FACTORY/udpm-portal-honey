package com.honeyprojects.core.student.model.request;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class StudentChangeStatusRequest {

    String idHistory;

    int status;
}
