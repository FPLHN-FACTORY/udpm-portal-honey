package com.honeyprojects.core.student.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class StudentNotificationRequest extends PageableRequest {

    private String title;
}
