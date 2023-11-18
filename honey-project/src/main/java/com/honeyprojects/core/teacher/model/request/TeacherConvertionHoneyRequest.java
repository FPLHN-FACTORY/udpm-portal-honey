package com.honeyprojects.core.teacher.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherConvertionHoneyRequest {

    private String honeyId;

    @NotBlank(message = "Mã sinh viên?")
    private String studentId;

    @NotBlank(message = "Mã quà?")
    private String giftId;

    @NotBlank(message = "Loại mật?")
    private String categoryId;

    @NotNull
    private Integer honeyPoint;

}
