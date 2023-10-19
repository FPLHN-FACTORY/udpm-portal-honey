package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminSearchSemesterRequest;
import com.honeyprojects.core.admin.model.request.AdminSemesterRequest;
import com.honeyprojects.core.admin.model.response.AdminSemesterResponse;
import com.honeyprojects.core.admin.repository.AdSemesterRepository;
import com.honeyprojects.core.admin.service.AdminSemesterService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Semester;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
            semester.setDeleted(true);
            adSemesterRepository.save(semester);
            return semester;
        }).orElse(null);
    }

    @Override
    public Semester addSemester(AdminSemesterRequest request) {
        Semester se = request.map(new Semester());
        se.setDeleted(false);
        return adSemesterRepository.save(se);
    }

    @Override
    public Semester updateSemester(AdminSemesterRequest request, String id) {
        Optional<Semester> optionalSemester = adSemesterRepository.findById(id);
        return adSemesterRepository.save(request.map(optionalSemester.get()));
    }

}
