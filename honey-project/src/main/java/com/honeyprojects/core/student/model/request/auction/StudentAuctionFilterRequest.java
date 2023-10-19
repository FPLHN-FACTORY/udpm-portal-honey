package com.honeyprojects.core.student.model.request.auction;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
public class StudentAuctionFilterRequest {

    private String id;

    private String name;

    private String nameGift;

    private BigDecimal startingPrice;

    private BigDecimal lastPrice;

    private BigDecimal jump;

}
