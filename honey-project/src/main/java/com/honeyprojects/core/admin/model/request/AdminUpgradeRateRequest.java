package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminUpgradeRateRequest extends PageableRequest {
    private String originalHoneyId;
    private String destinationHoneyId;
    private String status;
}
