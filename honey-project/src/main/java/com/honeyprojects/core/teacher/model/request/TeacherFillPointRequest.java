package com.honeyprojects.core.teacher.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@ToString
public class TeacherFillPointRequest {

    @NotBlank
    @Length(max = 36)
    String code;

    @NotBlank
    @Length(max = 36)
    String categoryId;

}
