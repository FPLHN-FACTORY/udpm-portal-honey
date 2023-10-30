package com.honeyprojects.core.admin.model.response;

import lombok.Data;

import java.util.List;

@Data
public class AdminAddPointBO {
    private Long total;
    private Long totalSuccess;
    private Long totalError;
    private List<AdminAddPointDTO> lstAdminAddPointDTO;
}
