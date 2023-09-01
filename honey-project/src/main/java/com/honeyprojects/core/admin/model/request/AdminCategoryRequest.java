package com.honeyprojects.core.admin.model.request;

import com.articlesproject.core.common.base.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminCategoryRequest extends PageableRequest {

    private String search;
}
