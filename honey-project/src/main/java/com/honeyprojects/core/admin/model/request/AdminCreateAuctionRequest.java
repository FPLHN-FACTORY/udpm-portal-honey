package com.honeyprojects.core.admin.model.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AdminCreateAuctionRequest {

    @NotBlank(message = "Tên phòng đấu giá không được để trống")
    @Size(min = 0, max = 100)
    private String name;

    @NotNull
    private Long honey;

    @NotNull
    private Integer status;

    @NotNull
    private String honeyCategoryId;
}
