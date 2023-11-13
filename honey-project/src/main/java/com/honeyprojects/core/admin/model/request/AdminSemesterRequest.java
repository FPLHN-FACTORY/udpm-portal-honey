package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import com.honeyprojects.infrastructure.contant.SemesterStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminSemesterRequest extends PageableRequest {

    @NotBlank(message = "Name?")
    @Size(min = 0, max = 250, message = "Size name?")
    private String code;

    @NotBlank(message = "Name?")
    @Size(min = 0, max = 250, message = "Size name?")
    private String name;

    @NotNull(message = "To date?")
    private Long toDate;

    @NotNull(message = "From date?")
    private Long fromDate;

    private SemesterStatus status;

}
