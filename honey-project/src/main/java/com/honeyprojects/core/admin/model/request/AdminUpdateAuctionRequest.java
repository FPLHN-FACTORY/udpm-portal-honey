package com.honeyprojects.core.admin.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminUpdateAuctionRequest extends AdminCreateAuctionRequest{
    private String id;
}
