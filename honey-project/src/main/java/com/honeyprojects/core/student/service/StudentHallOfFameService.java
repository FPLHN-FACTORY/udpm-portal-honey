package com.honeyprojects.core.student.service;

import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.student.model.request.StudentSearchHallOfFameRequest;
import com.honeyprojects.core.student.model.response.StudentHallOfFameBO;
import com.honeyprojects.core.student.model.response.StudentMyHoneyResponse;
import com.honeyprojects.core.student.model.response.Top3StudentDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface StudentHallOfFameService {

    Page<StudentHallOfFameBO> getPageHallOfFame(StudentSearchHallOfFameRequest request);

    List<Top3StudentDTO> getTop3Student();

    List<StudentMyHoneyResponse> getHoneyByUser(String userId);

    SimpleResponse getStudent(String userId);
}
