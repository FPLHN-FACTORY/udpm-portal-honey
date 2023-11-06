package com.honeyprojects.util.callApiPoint;

import com.honeyprojects.util.callApiPoint.model.request.FilterClassSubject;
import com.honeyprojects.util.callApiPoint.model.request.FilterScoreTemplate;
import com.honeyprojects.util.callApiPoint.model.request.FilterScoreTemplateVM;
import com.honeyprojects.util.callApiPoint.model.response.ClassSubjectVM;
import com.honeyprojects.util.callApiPoint.model.response.ScoreTemplate;
import com.honeyprojects.util.callApiPoint.model.response.ScoreTemplateVM;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
public class CallApiCommon {

    // Call api lấy ra danh sách lớp học và môn
    public List<ClassSubjectVM> callApiClassSubjectVM(FilterClassSubject request) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        // Kiểm tra xem request có đủ dữ liệu truyền vào không
        Set<ConstraintViolation<FilterClassSubject>> violations = validator.validate(request);

        if (!violations.isEmpty()) {
            // Nếu có lỗi, bạn có thể xử lý tùy theo yêu cầu, ví dụ: ném một ngoại lệ hoặc trả về kết quả khác.
            throw new IllegalArgumentException("Request không hợp lệ: " + violations.toString());
        }

        List<ClassSubjectVM> classSubjectList = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            ClassSubjectVM classSubject = new ClassSubjectVM();
            classSubject.setClassName("Tên lớp " + i);
            classSubject.setClassId("ID lớp " + i);
            classSubject.setSubjectName("Tên môn học " + i);
            classSubject.setSubjectId("ID môn học " + i);
            classSubject.setTeacherEmail("Email giáo viên " + i);

            classSubjectList.add(classSubject);
        }
        return classSubjectList;
    }

    // Call api lấy ra danh sách đầu điểm của lớp
    public List<ScoreTemplate> callApiScoreTemplate(FilterScoreTemplate request) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        // Kiểm tra xem request có đủ dữ liệu truyền vào không
        Set<ConstraintViolation<FilterScoreTemplate>> violations = validator.validate(request);

        if (!violations.isEmpty()) {
            // Nếu có lỗi, bạn có thể xử lý tùy theo yêu cầu, ví dụ: ném một ngoại lệ hoặc trả về kết quả khác.
            throw new IllegalArgumentException("Request không hợp lệ: " + violations.toString());
        }

        List<ScoreTemplate> scoreTemplateList = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            ScoreTemplate scoreTemplate = new ScoreTemplate();
            scoreTemplate.setScoreTemplateEmail("Email bảng điểm " + i);
            scoreTemplate.setScoreTemplateId("ID bảng điểm " + i);

            scoreTemplateList.add(scoreTemplate);
        }

        return scoreTemplateList;
    }

    // Call api lấy ra thông tin 1 đầu điểm của một sinh viên
    public ScoreTemplateVM callApiScoreTemplateVM(FilterScoreTemplateVM request) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        // Kiểm tra xem request có đủ dữ liệu truyền vào không
        Set<ConstraintViolation<FilterScoreTemplateVM>> violations = validator.validate(request);

        if (!violations.isEmpty()) {
            // Nếu có lỗi, bạn có thể xử lý tùy theo yêu cầu, ví dụ: ném một ngoại lệ hoặc trả về kết quả khác.
            throw new IllegalArgumentException("Request không hợp lệ: " + violations.toString());
        }

        ScoreTemplateVM scoreTemplateVM = new ScoreTemplateVM();
        scoreTemplateVM.setScoreTemplateName("Tên bảng điểm " + request.getScoreTemplateId());
        scoreTemplateVM.setScoreTemplatePoint(9.5);

        return scoreTemplateVM;
    }

}
