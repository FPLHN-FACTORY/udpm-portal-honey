package com.honeyprojects.core.teacher.model.response;

import com.honeyprojects.infrastructure.contant.ImportStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TeacherAddPoinExcelResponse {
    private String id;

    private String userName;

    private String lstGift;

    private String lstHoney;

    private String note;

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
