package com.honeyprojects.core.admin.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AdminUpgradeRateGiftRequest {
    private String upgradeRateId;
    private String destinationHoneyId;
    private String originalHoneyId;
    private Long quantityOriginalHoney;
    private Long quantityDestinationHoney;
    private List<String> idGifts;
    private Double ratio;
    private Long status;
}
