package com.honeyprojects.core.teacher.service;

import com.honeyprojects.core.admin.model.response.AdminConversionResponse;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.teacher.model.request.TeacherConvertionHoneyRequest;
import com.honeyprojects.entity.History;
import jakarta.validation.Valid;

public interface TeacherConvertionHoneyService {

    History addConvertion(@Valid TeacherConvertionHoneyRequest convertionHoneyRequest);

    PageableObject<AdminConversionResponse> listConvertion(String categoryId);

}
