package com.honeyprojects.core.student.service;

import com.honeyprojects.core.student.model.response.StudentUserApiResponse;

import java.util.List;

public interface StudentUserApiService {

    List<StudentUserApiResponse> getUserApi();
}
