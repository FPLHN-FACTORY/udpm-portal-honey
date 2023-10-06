package com.honeyprojects.core.admin.model.request;


import com.honeyprojects.infrastructure.contant.Status;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class AdminCreateAuctionRequest {


    private String name;

    @NotNull
    private Long fromDate;

    @NotNull
    private Long toDate;

    @NotNull
    private BigDecimal startingPrice;

    @NotNull
    private BigDecimal jump;

    @NotNull
    private Long honey;

    @NotNull
    private Integer status;

    @NotNull
    private String honeyCategoryId;
}
