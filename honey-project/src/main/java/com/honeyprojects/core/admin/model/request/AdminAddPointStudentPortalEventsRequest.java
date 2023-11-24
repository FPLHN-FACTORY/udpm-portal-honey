package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import com.honeyprojects.infrastructure.contant.ImportStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminAddPointStudentPortalEventsRequest extends PageableRequest {

    private String id;

    private String email;

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
