package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.infrastructure.contant.EntityProperties;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AdminCreateConversionRequest {

    @NotBlank(message = "Code không được để trống")
    @Size(min = 0, max = 250)
    private String code;

    @NotNull(message = "không được để trống ratio")
    private Double ratio;

    private String giftId;

}
