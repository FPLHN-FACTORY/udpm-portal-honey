package com.honeyprojects.core.student.service;

import com.honeyprojects.core.student.model.response.StudentMyHoneyResponse;

import java.util.List;

public interface StudentProfileService {

    List<StudentMyHoneyResponse> getHoneyByUser();

    boolean checkCategory();

}
