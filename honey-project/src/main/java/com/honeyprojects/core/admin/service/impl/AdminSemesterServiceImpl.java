package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminSearchSemesterRequest;
import com.honeyprojects.core.admin.model.request.AdminSemesterRequest;
import com.honeyprojects.core.admin.model.response.AdminSemesterResponse;
import com.honeyprojects.core.admin.model.response.SemesterJobResponse;
import com.honeyprojects.core.admin.repository.AdSemesterRepository;
import com.honeyprojects.core.admin.service.AdminSemesterService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Semester;
import com.honeyprojects.infrastructure.contant.SemesterStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AdminSemesterServiceImpl implements AdminSemesterService {

    @Autowired
    private AdSemesterRepository adSemesterRepository;

    public List<AdminSemesterResponse> getAllListSemester() {
        return adSemesterRepository.getAllListSemester();
    }

    @Override
    public PageableObject<AdminSemesterResponse> getAllSemesterByAdmin(AdminSearchSemesterRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<AdminSemesterResponse> res = adSemesterRepository.getAllSemesterByAdmin(pageable, request);
        return new PageableObject<>(res);
    }

    @Override
    public Semester getOne(String id) {
        Optional<Semester> optionalSemester = adSemesterRepository.findById(id);
        return optionalSemester.get();
    }

    @Override
    public Semester deleteSemester(String id) {
        Optional<Semester> optionalSemester = adSemesterRepository.findById(id);
        return optionalSemester.map(semester -> {
            semester.setStatus(SemesterStatus.KHONG_HOAT_DONG);
            adSemesterRepository.save(semester);
            return semester;
        }).orElse(null);
    }

    @Override
    public Semester addSemester(AdminSemesterRequest request) {
        Semester semester = new Semester();
        int number = new Random().nextInt(1000);
        String code = String.format("SE%04d", number);
        semester.setCode(code);
        semester.setName(request.getName());
        semester.setToDate(request.getToDate());
        semester.setFromDate(request.getFromDate());
        semester.setStatus(request.getStatus());
        return adSemesterRepository.save(semester);
    }

    @Override
    public Semester updateSemester(AdminSemesterRequest request, String id) {
        Semester semester = adSemesterRepository.findById(id).get();
        semester.setCode(request.getCode());
        semester.setName(request.getName());
        semester.setToDate(request.getToDate());
        semester.setFromDate(request.getFromDate());
        semester.setStatus(request.getStatus());
        return adSemesterRepository.save(semester);
    }

    @Override
    public SemesterJobResponse findSemesterByStatus() {
        return adSemesterRepository.getSemesterJobByStatus();
    }

    @Override
    public void openNewSemester(Long newDate) {
        SemesterJobResponse semesterJobResponse = adSemesterRepository.openNewSemester();
        if (semesterJobResponse.getToDate() == newDate) {
            Optional<Semester> optionalSemester = adSemesterRepository.findById(semesterJobResponse.getId());
            optionalSemester.get().setStatus(SemesterStatus.DANG_HOAT_DONG);
        }
    }

}
