package com.honeyprojects.core.teacher.model.request;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class TeacherChangeStatusRequest {

    String idHistory;

    int status;

}
