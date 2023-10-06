package com.honeyprojects.core.admin.model.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AdminCreateClubGiftRequest {

    private List<String> giftId;

    private String clubId;

}
