package com.honeyprojects.core.student.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class StudentArchiveFilterRequest extends PageableRequest {
    private String status;

    private String idStudent;

    private String type;

}
