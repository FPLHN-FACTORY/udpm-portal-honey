package com.honeyprojects.core.teacher.model.response;

import com.honeyprojects.infrastructure.contant.ImportStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TeacherAddPoinExcelResponse {
    public String studentName;

    public String email;

    public Integer honeyPoint;

    private String honeyId;

    private String categoryId;

    private String studentId;

    private String note;

    private String categoryName;

    private String importMessageStudent;

    private String importMessageCategory;

    private String importMessagePoint;

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
