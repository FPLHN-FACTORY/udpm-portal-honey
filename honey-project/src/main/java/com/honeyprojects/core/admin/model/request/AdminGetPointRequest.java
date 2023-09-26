package com.honeyprojects.core.admin.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.validator.constraints.Length;


@Getter
@Setter
@ToString
public class AdminGetPointRequest {
    @NotBlank(message = "studentId không được dể trống")
    @Length(max = 36)
    String studentId;

    @NotBlank(message = "categoryId không được dể trống")
    @Length(max = 36)
    String categoryId;
}
