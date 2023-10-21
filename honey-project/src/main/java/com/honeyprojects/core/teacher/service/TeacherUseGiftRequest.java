package com.honeyprojects.core.teacher.service;

import com.honeyprojects.core.teacher.model.request.TeacherGetUseGiftRequest;
import com.honeyprojects.core.teacher.model.response.TeacherUseGiftRequestResponse;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.entity.History;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TeacherUseGiftRequest {

    Page<TeacherUseGiftRequestResponse> getTeacherUseGiftRequest(TeacherGetUseGiftRequest request);

    List<String> getFilterClass();
    List<Gift> getFilterGift();

    History acceptRequest(String id);

    History cancelRequest(String id, String note);
}
