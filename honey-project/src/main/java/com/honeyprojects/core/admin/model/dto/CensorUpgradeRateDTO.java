package com.honeyprojects.core.admin.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CensorUpgradeRateDTO {
    private String stt;

    private String id;

    private String code;

    private Integer quantityOriginalHoney;

    private Integer quantityDestinationHoney;

    private String originalHoneyName;

    private String destinationHoneyName;

    private String ratio;

    private Integer status;

    private List<CensorUpgradeRateGiftDTO> listUpgrateRateGiftDTO;
}
