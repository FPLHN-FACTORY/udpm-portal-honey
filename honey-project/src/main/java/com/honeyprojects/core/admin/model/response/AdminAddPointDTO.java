package com.honeyprojects.core.admin.model.response;

import com.honeyprojects.infrastructure.contant.ImportStatus;
import lombok.Data;

@Data
public class AdminAddPointDTO {
    private String id;
    private String userName;
    private String email;
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
