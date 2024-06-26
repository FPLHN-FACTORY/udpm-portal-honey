package com.honeyprojects.core.teacher.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.NumberFormat;

@Getter
@Setter
@ToString
public class TeacherAddPointRequest {

    private String honeyId;

    @NotNull
    @NumberFormat
    private Integer honeyPoint;

    @NotBlank
    @Length(max = 100)
    private String note;

    @NotBlank
    @Length(max = 36)
    private String studentId;

    @NotBlank
    @Length(max = 36)
    private String categoryId;

}
