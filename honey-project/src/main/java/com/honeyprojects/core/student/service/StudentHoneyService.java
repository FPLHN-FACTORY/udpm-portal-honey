package com.honeyprojects.core.student.service;

import com.honeyprojects.core.student.model.request.StudentHoneyRequest;
import com.honeyprojects.core.student.model.response.StudentHoneyResponse;
import com.honeyprojects.entity.Honey;

public interface StudentHoneyService {

    StudentHoneyResponse getPoint(StudentHoneyRequest honeyRequest);

    Honey getOneByUserAndCategory(String idUser, String idCategory);

}
