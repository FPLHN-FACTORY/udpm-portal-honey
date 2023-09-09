package com.honeyprojects.core.teacher.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;


@Getter
@Setter
public class TeacherGetPointRequest {

    @NotBlank
    @Length(max = 36)
    String studentId;


    @NotBlank
    @Length(max = 36)
    String categoryId;
}
