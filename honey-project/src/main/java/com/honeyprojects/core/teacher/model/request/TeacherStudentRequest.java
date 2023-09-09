package com.honeyprojects.core.teacher.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;


@Getter
@Setter
public class TeacherStudentRequest {

    @NotBlank(message = "Mã sinh viên không được trống")
    @Length(max = 10, message = "Mã sinh viên dưới 20 ký tự")
    String codeStudent;
}
