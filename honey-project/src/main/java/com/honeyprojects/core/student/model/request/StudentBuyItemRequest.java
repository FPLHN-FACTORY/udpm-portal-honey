package com.honeyprojects.core.student.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.NumberFormat;

@Getter
@Setter
public class StudentBuyItemRequest {
    @NumberFormat
    private Integer honeyPoint;

    @NotBlank
    private String studentId;

    @NotBlank
    private String giftId;

    @NotBlank
    private String nameGift;

    @NotBlank
    private String honeyCategoryId;

    @NotBlank
    private String honeyId;

    @NotBlank
    private String note;

    private Integer quantity;
}
