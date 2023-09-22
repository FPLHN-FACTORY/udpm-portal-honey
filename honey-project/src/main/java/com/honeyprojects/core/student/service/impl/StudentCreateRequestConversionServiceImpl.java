package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.student.model.repuest.StudentCreateRequestConversionRequest;
import com.honeyprojects.core.student.model.repuest.StudentFilterHistoryRequest;
import com.honeyprojects.core.student.model.response.StudentCreateResquestConversionResponse;
import com.honeyprojects.core.student.repository.StudentCreateRequestConversionRepository;
import com.honeyprojects.core.student.repository.StudentHoneyRepository;
import com.honeyprojects.core.student.repository.StudentUserSemesterRepository;
import com.honeyprojects.core.student.service.StudentCreateResquestConversionService;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.util.ConvertRequestApiidentity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Calendar;

@Service
public class StudentCreateRequestConversionServiceImpl implements StudentCreateResquestConversionService {
    @Autowired
    private StudentCreateRequestConversionRepository studentCreateRequestConversionRepository;

    @Autowired
    private StudentHoneyRepository honeyRepository;

    @Autowired
    private StudentUserSemesterRepository userSemesterRepository;

    @Autowired
    private ConvertRequestApiidentity convertRequestApiidentity;
    @Override
    public History addRequestConversion(StudentCreateRequestConversionRequest createRequest) {
        // Lấy thông tin Honey hiện tại của sinh viên
        Honey honey = honeyRepository.findByStudentIdAndHoneyCategoryId(createRequest.getStudentId(), createRequest.getCategoryId());

        if (honey == null) {
            String idUs = userSemesterRepository.getSemesterByStudent(createRequest.getStudentId());
            if (idUs == null) return null;
            // Nếu Honey chưa tồn tại, tạo mới
            honey = new Honey();
            honey.setStudentId(createRequest.getStudentId());
            honey.setHoneyCategoryId(createRequest.getCategoryId());
            honey.setUserSemesterId(idUs);
            honey.setHoneyPoint(createRequest.getHoneyPoint());
            honey = honeyRepository.save(honey);
        } else {
            // Trừ điểm quy đổi từ Honey hiện tại
            int deductedPoints = createRequest.getHoneyPoint();
            honey.setHoneyPoint(honey.getHoneyPoint() - deductedPoints);
            honey = honeyRepository.save(honey);
        }

        // Tiếp tục với việc thêm yêu cầu vào bảng History
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        History history = new History();
        history.setCreatedAt(dateNow);
        history.setStatus(HoneyStatus.CHO_PHE_DUYET);
        history.setType(TypeHistory.DOI_QUA);
        history.setHoneyPoint(createRequest.getHoneyPoint());
        history.setStudentId(createRequest.getStudentId());
        history.setGiftId(createRequest.getGiftId());
        history.setHoneyId(honey.getId());
        history.setNameGift(createRequest.getNameGift());

        return studentCreateRequestConversionRepository.save(history);
    }

    @Override
    public PageableObject<StudentCreateResquestConversionResponse> getHistory(StudentFilterHistoryRequest filter){
        Pageable pageable1 = PageRequest.of(filter.getPage(), filter.getSize());
        return  new PageableObject<>( studentCreateRequestConversionRepository.getHistory(filter,pageable1));
    }

    @Override
    public void deleteRequestById(String id) {
        studentCreateRequestConversionRepository.deleteById(id);
    }

    @Override
    public SimpleResponse getUserById(String id) {
        return convertRequestApiidentity.handleCallApiGetUserById(id);
    }

}
