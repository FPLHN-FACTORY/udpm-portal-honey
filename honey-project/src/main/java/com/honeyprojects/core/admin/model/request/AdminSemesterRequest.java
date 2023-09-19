package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import com.honeyprojects.entity.Semester;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Random;

@Getter
@Setter
public class AdminSemesterRequest extends PageableRequest {

    @NotBlank(message = "Name?")
    @Size(min = 0, max = 250, message = "Size name?")
    private String name;

    @NotNull(message = "To date?")
    private Long toDate;

    @NotNull(message = "From date?")
    private Long fromDate;

    public Semester map(Semester semester) {
        int number = new Random().nextInt(1000);
        String code = String.format("SE%04d", number);
        semester.setCode(code);
        semester.setName(this.getName());
        semester.setToDate(this.getToDate());
        semester.setFromDate(this.getFromDate());
        return semester;
    }

}
