package com.honeyprojects.core.admin.model.dto;

import com.honeyprojects.core.admin.model.dto.CensorUpgradeRateGiftDTO;
import com.honeyprojects.core.admin.model.response.AdminUpgradeRateResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
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
