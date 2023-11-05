package com.honeyprojects.core.student.service;

import com.honeyprojects.core.student.model.response.StudentHistoryResponse;

import java.util.List;
import java.util.Map;

public interface StudentHistoryService {

    Map<String, Object> getListHistory(Integer type, Integer page);

    Map<String, Object> getListRequest(Integer type, Integer page);
}
