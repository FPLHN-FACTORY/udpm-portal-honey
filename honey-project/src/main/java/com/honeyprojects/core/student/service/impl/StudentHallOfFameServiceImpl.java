package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.student.model.request.StudentSearchHallOfFameRequest;
import com.honeyprojects.core.student.model.response.StudentCategoryDTO;
import com.honeyprojects.core.student.model.response.StudentHallOfFameBO;
import com.honeyprojects.core.student.model.response.StudentMyHoneyResponse;
import com.honeyprojects.core.student.model.response.StudentPageStudentResponse;
import com.honeyprojects.core.student.model.response.Top3StudentDTO;
import com.honeyprojects.core.student.repository.StudentCategoryRepository;
import com.honeyprojects.core.student.repository.StudentUserRepository;
import com.honeyprojects.core.student.service.StudentHallOfFameService;
import com.honeyprojects.entity.Category;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.util.ConvertRequestApiidentity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StudentHallOfFameServiceImpl implements StudentHallOfFameService {

    @Autowired
    private StudentUserRepository studentUserRepository;

    @Autowired
    private StudentCategoryRepository studentCategoryRepository;

    @Autowired
    private ConvertRequestApiidentity requestApiIdentity;

    @Override
    public Page<StudentHallOfFameBO> getPageHallOfFame(StudentSearchHallOfFameRequest request) {

        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());

        Page<StudentPageStudentResponse> pageStudentResponses = studentUserRepository.getPageHallOfFame(pageable, request.getSearch());

        List<String> lstStudentId = pageStudentResponses.getContent().stream()
                .map(StudentPageStudentResponse::getStudentId).collect(Collectors.toList());

        List<StudentHallOfFameBO> lstStudentHallOfFame = new ArrayList<>();

        Map<String, List<StudentCategoryDTO>> mCategory = getMapCategory(lstStudentId);

        for (StudentPageStudentResponse student : pageStudentResponses.getContent()) {
            SimpleResponse simpleResponse = requestApiIdentity.handleCallApiGetUserById(student.getStudentId());
            StudentHallOfFameBO studentHallOfFame = new StudentHallOfFameBO();
            studentHallOfFame.setStt(student.getStt());
            studentHallOfFame.setName(simpleResponse.getName());
            studentHallOfFame.setUsername(simpleResponse.getUserName());
            studentHallOfFame.setRank(student.getStt());
            studentHallOfFame.setNumberTotalHoney(student.getTotalHoney());
            String studentId = student.getStudentId();
            studentHallOfFame.setId(studentId);
            studentHallOfFame.setPicture(simpleResponse.getPicture());
            if (mCategory.containsKey(studentId)) {
                List<StudentCategoryDTO> lstCategories = mCategory.get(studentId);
                studentHallOfFame.setLstCategories(lstCategories);
            }
            lstStudentHallOfFame.add(studentHallOfFame);
        }

        return new PageImpl<>(lstStudentHallOfFame, pageable, pageStudentResponses.getTotalElements());
    }

    @Override
    public List<Top3StudentDTO> getTop3Student() {
        List<Top3StudentDTO> lstTop3Student = new ArrayList<>();
        List<StudentPageStudentResponse> listStudentResponse = studentUserRepository.getTop3Student();
        for (StudentPageStudentResponse response : listStudentResponse) {
            SimpleResponse simpleResponse = requestApiIdentity.handleCallApiGetUserById(response.getStudentId());
            Top3StudentDTO studentDTO = Top3StudentDTO.builder()
                    .stt(response.getStt())
                    .totalHoney(response.getTotalHoney())
                    .name(simpleResponse.getName())
                    .picture(simpleResponse.getPicture())
                    .build();
            lstTop3Student.add(studentDTO);
        }

        return lstTop3Student;
    }

    private Map<String, List<StudentCategoryDTO>> getMapCategory(List<String> lstStudentId) {
        List<Honey> honeyList = studentUserRepository.findByStudentIdIn(lstStudentId);

        // Nhóm Honey theo studentId
        Map<String, List<Honey>> honeyMap = honeyList.stream()
                .collect(Collectors.groupingBy(Honey::getStudentId));

        // Lấy danh sách categoryId từ honeyList
        List<String> lstCategoryId = honeyList.stream()
                .map(Honey::getHoneyCategoryId)
                .collect(Collectors.toList());

        // Tìm tất cả các category theo danh sách categoryId
        List<Category> listCategory = studentCategoryRepository.findAllById(lstCategoryId);

        // Tạo Map chứa danh sách StudentCategoryDTO
        Map<String, List<StudentCategoryDTO>> result = new HashMap<>();

        // Lặp qua danh sách honeyMap
        honeyMap.forEach((studentId, honeyListPerStudent) -> {
            // Tạo danh sách StudentCategoryDTO cho mỗi studentId
            List<StudentCategoryDTO> studentCategoryDTOList = honeyListPerStudent.stream()
                    .map(honey -> {
                        // Tìm category tương ứng với honey
                        Category category = listCategory.stream()
                                .filter(cat -> cat.getId().equals(honey.getHoneyCategoryId()))
                                .findFirst()
                                .orElse(null);

                        // Tạo StudentCategoryDTO từ honey và category
                        return new StudentCategoryDTO(
                                honey.getHoneyPoint(),
                                category != null ? category.getName() : null
                        );
                    })
                    .collect(Collectors.toList());

            // Thêm vào Map kết quả
            result.put(studentId, studentCategoryDTOList);
        });

        return result;
    }

    @Override
    public List<StudentMyHoneyResponse> getHoneyByUser(String userId) {
        return studentUserRepository.getHoney(userId);
    }

    @Override
    public SimpleResponse getStudent(String userId) {
        return requestApiIdentity.handleCallApiGetUserById(userId);
    }

}
