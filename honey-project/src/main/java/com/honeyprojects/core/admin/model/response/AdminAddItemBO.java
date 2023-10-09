package com.honeyprojects.core.admin.model.response;

import lombok.Data;

import java.util.List;

@Data
public class AdminAddItemBO {
    private Long total;
    private Long totalSuccess;
    private Long totalError;
    private List<AdminAddItemDTO> lstAdminAddItemDTO;
}
