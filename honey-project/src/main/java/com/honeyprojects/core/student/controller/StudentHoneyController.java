package com.honeyprojects.core.student.controller;

import com.honeyprojects.core.common.base.ResponseObject;
import com.honeyprojects.core.student.service.StudentHoneyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student/honey")
@RequiredArgsConstructor
public class StudentHoneyController {

    private final StudentHoneyService studentHoneyService;

    @GetMapping("/get-one-user-category")
    public ResponseObject getOneByIdUserAndIdCategory(@RequestParam("idUser") String idUser,
                                                      @RequestParam("idCategory") String idCategory){
        return new ResponseObject(studentHoneyService.getOneByUserAndCategory(idUser,idCategory));
    }
}
