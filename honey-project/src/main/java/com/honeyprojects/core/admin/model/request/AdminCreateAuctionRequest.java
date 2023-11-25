package com.honeyprojects.core.admin.model.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
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

    @NotNull
    private String giftId;

    @NotNull
    private Long fromDate;

    @NotNull(message = "Vui lòng chọn thời gian đấu giá")
    private Long toDate;

    @NotNull
    private Integer quantity;
}
