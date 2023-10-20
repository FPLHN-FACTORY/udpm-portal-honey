package com.honeyprojects.core.student.service;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.student.model.request.StudentArchiveFilterRequest;
import com.honeyprojects.core.student.model.request.StudentArchiveOpenChestRequest;
import com.honeyprojects.core.student.model.request.StudentGetArchiveChestRequest;
import com.honeyprojects.core.student.model.request.StudentGetArchiveGiftRequest;
import com.honeyprojects.core.student.model.response.StudentArchiveGetChestResponse;
import com.honeyprojects.core.student.model.response.StudentArchiveResponse;
import com.honeyprojects.core.student.model.response.StudentGetListGiftResponse;
import com.honeyprojects.core.student.model.response.archive.StudentArchiveByUserResponse;
import com.honeyprojects.entity.ArchiveGift;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentArchiveService {

    PageableObject<StudentArchiveResponse> getAllGiftArchive(StudentArchiveFilterRequest filterRequest);

    PageableObject<StudentGetListGiftResponse> getListGift(StudentArchiveFilterRequest filterRequest);

    ArchiveGift studentUsingGift(String id);

    List<ArchiveGift> openChest(StudentArchiveOpenChestRequest request);

    PageableObject<StudentArchiveGetChestResponse> getChestToArchive(StudentArchiveFilterRequest filterRequest);

    ArchiveGift updateArchiveGift(String id);

    ArchiveGift getArchiveGift(String id);

    StudentArchiveResponse detailArchiveGift(StudentGetArchiveGiftRequest request);

    StudentArchiveGetChestResponse detailArchiveChest(StudentGetArchiveChestRequest request);

    List<StudentArchiveByUserResponse> findArchiveByUser(String idUser , String idCategory);

}
