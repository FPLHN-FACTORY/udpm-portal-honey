package com.honeyprojects.core.student.model.request.auction;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class StudentAuctionRoomFilterRequest extends PageableRequest {

    private String nameGift;

    private String category;

    private String type;

    private String startingPrice;

}
