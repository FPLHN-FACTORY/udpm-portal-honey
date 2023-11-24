package com.honeyprojects.core.student.model.request.auction;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class StudentAuctionCreateRequest {

    private String idUser;

    private String idGift;

    private String jump;

    private String startingPrice;

    private String time;

    private String name;

    private String idCategory;

    private byte[] image;

    private Integer quantity;

}
