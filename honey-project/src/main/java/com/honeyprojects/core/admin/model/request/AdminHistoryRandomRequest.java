package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.entity.History;
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

    public History createHistory(History history) {
        history.setCreatedAt(new Date().getTime());
        history.setChangeDate(new Date().getTime());
        history.setStudentId(this.studentId);
        history.setNote(null);
        history.setStatus(null);
        history.setSubject(null);
        history.setType(this.typeHistory);
        history.setClassName(null);
        history.setTeacherId(null);
        history.setPresidentId(null);
        return history;
    }
}
