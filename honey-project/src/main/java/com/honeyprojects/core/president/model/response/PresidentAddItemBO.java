package com.honeyprojects.core.president.model.response;

import lombok.Data;

import java.util.List;

@Data
public class PresidentAddItemBO {
    private Long total;
    private Long totalSuccess;
    private Long totalError;
    private List<PresidentAddItemDTO> lstPresidentAddItemDTO;
}

