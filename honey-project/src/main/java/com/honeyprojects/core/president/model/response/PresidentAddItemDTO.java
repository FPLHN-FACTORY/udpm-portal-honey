package com.honeyprojects.core.president.model.response;

import com.honeyprojects.infrastructure.contant.ImportStatus;
import lombok.Data;

@Data
public class PresidentAddItemDTO {
    private String id;
    private String userName;
    private String lstGift;
    private String lstHoney;
    private String importMessage;
    private boolean isError;
    private ImportStatus importStatus;

    public ImportStatus getImportStatus() {
        if (isError) {
            importStatus = ImportStatus.FAIL;
        } else {
            importStatus = ImportStatus.SUCCESS;
        }
        return importStatus;
    }
}
