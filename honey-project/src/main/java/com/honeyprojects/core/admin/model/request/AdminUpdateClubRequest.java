package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.infrastructure.contant.Status;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminUpdateClubRequest {

    @NotBlank(message = "Tên không được để trống")
    private String name;

    private Status status;
}
