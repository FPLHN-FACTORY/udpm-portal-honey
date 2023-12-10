package com.honeyprojects.core.student.model.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Top3StudentDTO {
    private Integer stt;
    private Integer totalHoney;
    private String name;
    private String picture;

}
