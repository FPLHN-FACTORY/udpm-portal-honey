package com.honeyprojects.core.student.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;


@Getter
@Setter
@ToString
public class StudentGetPointRequest {

    @NotBlank
    @Length(max = 36)
    String categoryId;
}
