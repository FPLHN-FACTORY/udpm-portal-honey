package com.honeyprojects.core.student.model.repuest;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.NumberFormat;

@Getter
@Setter
public class StudentCreateRequestConversionRequest {

    @NumberFormat
    private Integer honeyPoint;

    @NotBlank
    private String studentId;

    @NotBlank
    private String giftId;

    @NotBlank
    private String nameGift;

    @NotBlank
    private String categoryId;

    @NotBlank
    private String honeyId;
}
