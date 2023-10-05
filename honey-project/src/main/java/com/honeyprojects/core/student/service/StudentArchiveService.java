package com.honeyprojects.core.student.service;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.student.model.request.StudentArchiveFilterRequest;
import com.honeyprojects.core.student.model.response.StudentArchiveResponse;
import com.honeyprojects.entity.ArchiveGift;

public interface StudentArchiveService {

    PageableObject<StudentArchiveResponse> getAllGiftArchive(StudentArchiveFilterRequest filterRequest);

    ArchiveGift studentUsingGift(String id);

}
