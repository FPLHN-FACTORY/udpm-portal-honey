package com.honeyprojects.core.admin.model.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CensorAddUpgradeRateRequest {
    private String originalHoneyId;
    private String destinationHoneyId;
    private Integer quantityOriginalHoney;
    private Integer quantityDestinationHoney;
    private List<String> idGifts;
    private String status;
    private String ratio;
}
