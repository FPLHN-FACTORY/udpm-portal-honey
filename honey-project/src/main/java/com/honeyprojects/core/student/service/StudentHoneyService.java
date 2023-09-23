package com.honeyprojects.core.student.service;

import com.honeyprojects.core.student.model.request.StudentHoneyRequest;
import com.honeyprojects.core.student.model.response.StudentHoneyResponse;

public interface StudentHoneyService {

    StudentHoneyResponse getPoint(StudentHoneyRequest honeyRequest);


}
