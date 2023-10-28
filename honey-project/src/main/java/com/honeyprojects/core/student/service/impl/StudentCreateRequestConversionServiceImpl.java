package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.student.model.request.StudentCreateRequestConversionRequest;
import com.honeyprojects.core.student.model.request.StudentFilterHistoryRequest;
import com.honeyprojects.core.student.model.response.StudentCreateResquestConversionResponse;
import com.honeyprojects.core.student.model.response.StudentGiftResponse;
import com.honeyprojects.core.student.repository.StudentArchiveGiftRepository;
import com.honeyprojects.core.student.repository.StudentArchiveRepository;
import com.honeyprojects.core.student.repository.StudentCategoryRepository;
import com.honeyprojects.core.student.repository.StudentCreateRequestConversionRepository;
import com.honeyprojects.core.student.repository.StudentGiftRepository;
import com.honeyprojects.core.student.repository.StudentHoneyRepository;
import com.honeyprojects.core.student.repository.StudentUserSemesterRepository;
import com.honeyprojects.core.student.service.StudentCreateResquestConversionService;
import com.honeyprojects.entity.Archive;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.entity.Category;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.StatusGift;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.util.ConvertRequestApiidentity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

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

    @Autowired
    private StudentCategoryRepository categoryRepository;

    @Autowired
    private StudentGiftRepository giftRepository;

    @Autowired
    private StudentArchiveGiftRepository giftArchiveRepository;

    @Autowired
    private StudentArchiveRepository archiveRepository;


    @Override
    public History addRequestConversion(StudentCreateRequestConversionRequest createRequest) {
        Category category = categoryRepository.findById(createRequest.getHoneyCategoryId()).orElse(null);
        Gift gift = giftRepository.findById(createRequest.getGiftId()).orElse(null);


        Honey honey = honeyRepository.findByStudentIdAndHoneyCategoryId(createRequest.getStudentId(), createRequest.getHoneyCategoryId());
        History history = new History();
        ArchiveGift archiveGift = new ArchiveGift();
        Archive archive = new Archive();
        archive.setStudentId(createRequest.getStudentId());
        int defaultHoneyPoint = 0;
        if (honey == null) {
            String idUs = userSemesterRepository.getSemesterByStudent(createRequest.getStudentId());
            if (idUs == null) {
                return null;
            }
            // Nếu Honey chưa tồn tại, tạo mới
            honey = new Honey();
            honey.setStudentId(createRequest.getStudentId());
            honey.setHoneyCategoryId(createRequest.getHoneyCategoryId());
            honey.setUserSemesterId(idUs);
            honey.setHoneyPoint(createRequest.getHoneyPoint() != null ? createRequest.getHoneyPoint() : defaultHoneyPoint);
            honey = honeyRepository.save(honey);
        } else {
            if (gift.getStatus().equals(StatusGift.ACCEPT)) {
                history.setStatus(HoneyStatus.CHO_PHE_DUYET);
                history.setType(TypeHistory.DOI_QUA);
            } else {
                history.setStatus(HoneyStatus.DA_PHE_DUYET);
                history.setType(TypeHistory.DOI_QUA);

                int deductedPoints = createRequest.getHoneyPoint();
                int quantity = createRequest.getQuantity();
                honey.setHoneyPoint(honey.getHoneyPoint() - (deductedPoints * quantity));
                honey = honeyRepository.save(honey);
                if(gift.getQuantity() != null){
                    gift.setQuantity(gift.getQuantity() - createRequest.getQuantity());
                    giftRepository.save(gift);
                }

            }
        }



        if (history.getStatus().equals(HoneyStatus.DA_PHE_DUYET) && createRequest.getGiftId() != null) {

            Archive getArchive = archiveRepository.findByStudentId(createRequest.getStudentId()).orElse(archive);
            archiveRepository.save(getArchive);
            ArchiveGift archiveGift1 = giftArchiveRepository.findByGiftId(createRequest.getGiftId()).orElse(null);
            if(archiveGift1 != null){
                int currentQuantity = archiveGift1.getQuantity();
                int additionalQuantity = createRequest.getQuantity();
                archiveGift1.setQuantity(currentQuantity + additionalQuantity);
                giftArchiveRepository.save(archiveGift1);
            }else if (history.getStatus().equals(HoneyStatus.DA_PHE_DUYET) && createRequest.getGiftId() != null) {
                archiveGift.setGiftId(createRequest.getGiftId());
                archiveGift.setNote(createRequest.getNote());
                archiveGift.setArchiveId(getArchive.getId());
                archiveGift.setQuantity(createRequest.getQuantity());
                giftArchiveRepository.save(archiveGift);
            }
        }

        // Tiếp tục với việc thêm yêu cầu vào bảng History
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        history.setCreatedAt(dateNow);
        history.setHoneyPoint(createRequest.getHoneyPoint());
        history.setStudentId(createRequest.getStudentId());
        history.setGiftId(createRequest.getGiftId());
        history.setHoneyId(honey.getId());
        history.setNameGift(createRequest.getNameGift());
        history.setNote(createRequest.getNote());
        history.setQuantity(createRequest.getQuantity());




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

    @Override
    public List<StudentGiftResponse> getListGift() {
        return giftRepository.getAllListGift();
    }

}
