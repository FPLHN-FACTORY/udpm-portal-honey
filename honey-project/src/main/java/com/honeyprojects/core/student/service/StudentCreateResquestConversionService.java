package com.honeyprojects.core.student.service;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.student.model.repuest.StudentCreateRequestConversionRequest;
import com.honeyprojects.core.student.model.repuest.StudentFilterHistoryRequest;
import com.honeyprojects.core.student.model.response.StudentCreateResquestConversionResponse;
import com.honeyprojects.entity.History;

public interface StudentCreateResquestConversionService {

    History addRequestConversion(StudentCreateRequestConversionRequest createRequestConversionRequest);

    PageableObject<StudentCreateResquestConversionResponse> getHistory(StudentFilterHistoryRequest filter);

    void deleteRequestById(String id);




}
