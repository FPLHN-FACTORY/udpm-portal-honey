package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminCreateChestRequest extends PageableRequest {

    @NotBlank
    private String name;

    @NotNull
    private Double percent;

    @NotBlank
    private String giftId;

}
