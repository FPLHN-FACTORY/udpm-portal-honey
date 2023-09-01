package com.honeyprojects.core.censor.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Getter
@Setter
public class AdminCreateCategoryRequest extends PageableRequest {

    @NotEmpty
    @Size(min = 0, max = 250)
    private String name;
}
