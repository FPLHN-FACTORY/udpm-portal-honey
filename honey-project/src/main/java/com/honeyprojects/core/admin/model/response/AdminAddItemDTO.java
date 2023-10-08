package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.entity.Gift;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.contant.ImportStatus;
import lombok.Data;

import java.util.List;

@Data
public class AdminAddItemDTO {
    private String id;
    private String userName;
    private String email;
    private String lstGift;
    private String lstHoney;
    private String importMessage;
    private boolean isError;
    private ImportStatus importStatus;
    public ImportStatus getImportStatus() {
        if(isError) {
            importStatus = ImportStatus.FAIL;
        }
        else {
            importStatus = ImportStatus.SUCCESS;
        }
        return importStatus;
    }
}
