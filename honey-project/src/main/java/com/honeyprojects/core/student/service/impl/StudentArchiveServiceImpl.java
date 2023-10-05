package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.student.model.request.StudentArchiveFilterRequest;
import com.honeyprojects.core.student.model.response.StudentArchiveResponse;
import com.honeyprojects.core.student.repository.StudentArchiveGiftRepository;
import com.honeyprojects.core.student.repository.StudentGiftArchiveRepository;
import com.honeyprojects.core.student.service.StudentArchiveService;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.repository.ArchiveGiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentArchiveServiceImpl implements StudentArchiveService {

    @Autowired
    private StudentGiftArchiveRepository studentGiftArchiveRepository;
    @Autowired
    private UdpmHoney udpmHoney;
    @Autowired
    private StudentArchiveGiftRepository archiveGiftRepository;

    @Override
    public PageableObject<StudentArchiveResponse> getAllGiftArchive(StudentArchiveFilterRequest filterRequest) {
        Pageable pageable = PageRequest.of(filterRequest.getPage(), filterRequest.getSize());
        filterRequest.setIdStudent(udpmHoney.getIdUser());
        System.out.println("--------------------");
        System.out.println(udpmHoney.getIdUser());
        return new PageableObject<>(studentGiftArchiveRepository.getAllGiftArchive(filterRequest, pageable));
    }

    @Override
    public ArchiveGift studentUsingGift(String id) {
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("Id không hợp lệ. Không thể là null hoặc rỗng.");
        }
        Optional<ArchiveGift> archiveGiftOptional = archiveGiftRepository.findById(id);
        if (archiveGiftOptional.isPresent()) {
            ArchiveGift archiveGift = archiveGiftOptional.get();
            archiveGiftRepository.delete(archiveGift);
            return archiveGift;
        } else {
            return null;
        }
    }

}
