package com.portalprojects.core.admin.service.impl;

import com.portalprojects.core.admin.repository.AdStudentRepository;
import com.portalprojects.core.admin.service.StudentService;
import com.portalprojects.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private AdStudentRepository studentRepository;

    @Override
    public ArrayList<Student> getAll() {
        System.out.println(studentRepository.getAll());
        return (ArrayList<Student>) studentRepository.getAll();
    }

}
