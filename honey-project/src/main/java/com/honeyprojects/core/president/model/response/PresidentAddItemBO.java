package com.honeyprojects.core.president.model.response;

import com.honeyprojects.core.admin.model.response.AdminAddItemDTO;
import lombok.Data;

import java.util.List;

@Data
public class PresidentAddItemBO {
    private Long total;
    private Long totalSuccess;
    private Long totalError;
    private List<AdminAddItemDTO> lstAdminAddItemDTO;
}

