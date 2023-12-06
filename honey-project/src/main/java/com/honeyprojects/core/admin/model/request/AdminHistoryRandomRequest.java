package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.entity.History;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdminHistoryRandomRequest {
    private String studentId;
    private TypeHistory typeHistory;
    private HoneyStatus status;

    public History createHistory(History history) {
        history.setChangeDate(new Date().getTime());
        history.setStudentId(this.studentId);
        history.setNote(null);
        history.setStatus(this.status);
        history.setSubject(null);
        history.setType(this.typeHistory);
        history.setClassName(null);
        history.setTeacherId(null);
        history.setPresidentId(null);
        return history;
    }
}
