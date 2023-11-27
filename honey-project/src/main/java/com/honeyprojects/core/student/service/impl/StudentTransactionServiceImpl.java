package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.student.model.request.transaction.ItemTransfer;
import com.honeyprojects.core.student.model.request.transaction.StudentDoneRequest;
import com.honeyprojects.core.student.model.request.transaction.StudentTransactionRequest;
import com.honeyprojects.core.student.model.response.StudentCategoryResponse;
import com.honeyprojects.core.student.model.response.StudentHoneyResponse;
import com.honeyprojects.core.student.model.response.transaction.StudentGiftTransactionResponse;
import com.honeyprojects.core.student.model.response.transaction.TransactionResponse;
import com.honeyprojects.core.student.repository.*;
import com.honeyprojects.core.student.service.StudentTransactionService;
import com.honeyprojects.entity.Archive;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import com.honeyprojects.util.ConvertRequestApiidentity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Service
public class StudentTransactionServiceImpl implements StudentTransactionService {

    @Autowired
    private StudentCategoryRepository categoryRepository;
    @Autowired
    private StudentHoneyRepository honeyRepository;
    @Autowired
    private UdpmHoney udpmHoney;
    @Autowired
    private StudentGiftTransactionRepository giftRepository;
    @Autowired
    private ConvertRequestApiidentity requestApiidentity;
    @Autowired
    private StudentArchiveGiftRepository archiveGiftRepository;
    @Autowired
    private StudentArchiveRepository archiveRepository;

    @Override
    public StudentCategoryResponse getCategory() {
        return categoryRepository.getCategory();
    }

    @Override
    public StudentHoneyResponse getHoney(String categoryId) {
        return honeyRepository.getPoint(categoryId, udpmHoney.getIdUser());
    }

    @Override
    public String searchUser(String email) {
        SimpleResponse simpleResponse = requestApiidentity.handleCallApiGetUserByEmail(email);
        if (simpleResponse != null) {
            if (udpmHoney.getIdUser().equals(simpleResponse.getId())) {
                throw new RestApiException("Không thể giao dịch với bản thân!");
            }
            return simpleResponse.getId();
        } else {
            throw new RestApiException("Email sinh viên không tồn tại!");
        }
    }

    @Override
    public SimpleResponse getUserById(String id) {
        return requestApiidentity.handleCallApiGetUserById(id);
    }

    @Override
    public String getUserLogin() {
        return udpmHoney.getIdUser();
    }

    @Override
    public TransactionResponse sendTransaction(StudentTransactionRequest request) {
        try {
            return new TransactionResponse(request.getIdTransaction(), request.getNameUser(), request.getIdUser());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<StudentGiftTransactionResponse> getGiftTransactions() {
        return giftRepository.getGiftTransaction(udpmHoney.getIdUser());
    }

    @Override
    public Boolean transaction(StudentDoneRequest request) {
            try {
                //lay ra honey cua 2 thang dang giao dich
                Honey honeyGui = honeyRepository.
                        findById(honeyRepository.
                                getPoint(request.getIdCategory(), request.getRuongDi().getIdUser()).getId()).orElse(null);

                Honey honeyNhan = honeyRepository.
                        findById(honeyRepository.
                                getPoint(request.getIdCategory(), request.getRuongDen().getIdUser()).getId()).orElse(null);

                //thuc hien tru so luong mat gui va cong so luong mat nhan
                List<Honey> honeyUpdates = new ArrayList<>();
                if (honeyGui != null) {
                    honeyGui.setHoneyPoint(honeyGui.getHoneyPoint() - request.getRuongDi().getHoney() + request.getRuongDen().getHoney());
                    honeyUpdates.add(honeyGui);
                }
                if (honeyNhan != null) {
                    honeyNhan.setHoneyPoint(honeyNhan.getHoneyPoint() - request.getRuongDen().getHoney() + request.getRuongDi().getHoney());
                    honeyUpdates.add(honeyGui);
                }

                //lay ra ruong do sinh vien neu khong co tao moi
                Archive archiveGui = archiveRepository.findByStudentId(request.getRuongDi().getIdUser()).orElse(null);
                Archive archiveNhan = archiveRepository.findByStudentId(request.getRuongDen().getIdUser()).orElse(null);
                if (archiveGui == null) {
                    archiveGui = new Archive();
                    archiveGui.setStudentId(request.getRuongDi().getIdUser());
                    archiveGui.setStatus(Status.HOAT_DONG);
                    archiveRepository.save(archiveGui);
                }
                if (archiveNhan == null) {
                    archiveNhan = new Archive();
                    archiveNhan.setStudentId(request.getRuongDi().getIdUser());
                    archiveNhan.setStatus(Status.HOAT_DONG);
                    archiveRepository.save(archiveNhan);
                }

                //lay ra item trong ruong cua sinh vien tru item giao dich them item duoc nhan
                List<ArchiveGift> archiveGifts = new ArrayList<>();
                List<ArchiveGift> archiveGiftDeletes = new ArrayList<>();
                for (ItemTransfer item : request.getRuongDi().getItem()) {
                    ArchiveGift archiveGiftGui = archiveGiftRepository.findByGiftIdAndAndArchiveId(item.getId(), archiveGui.getId()).get();
                    archiveGiftGui.setQuantity(archiveGiftGui.getQuantity() - item.getQuantity());
                    if (archiveGiftGui.getQuantity() == 0) {
                        archiveGiftDeletes.add(archiveGiftGui);
                    } else {
                        archiveGifts.add(archiveGiftGui);
                    }
                    ArchiveGift archiveGiftNhan = archiveGiftRepository.findByGiftIdAndAndArchiveId(item.getId(), archiveNhan.getId()).orElse(null);
                    if (archiveGiftNhan == null) {
                        archiveGiftNhan = new ArchiveGift();
                        archiveGiftNhan.setQuantity(item.getQuantity());
                        archiveGiftNhan.setArchiveId(archiveNhan.getId());
                        archiveGiftNhan.setGiftId(item.getId());
                    }else {
                        archiveGiftNhan.setQuantity(archiveGiftNhan.getQuantity()+ item.getQuantity());
                    }
                    archiveGifts.add(archiveGiftNhan);
                }
                archiveGiftRepository.saveAll(archiveGifts);
                archiveGifts.clear();
                archiveGiftRepository.deleteAll(archiveGiftDeletes);
                archiveGiftDeletes.clear();

                for (ItemTransfer item : request.getRuongDen().getItem()) {
                    ArchiveGift archiveGiftNhan = archiveGiftRepository.findByGiftIdAndAndArchiveId(item.getId(), archiveNhan.getId()).get();
                    archiveGiftNhan.setQuantity(archiveGiftNhan.getQuantity() - item.getQuantity());
                    if (archiveGiftNhan.getQuantity() == 0) {
                        archiveGiftDeletes.add(archiveGiftNhan);
                    } else {
                        archiveGifts.add(archiveGiftNhan);
                    }
                    ArchiveGift archiveGiftGui = archiveGiftRepository.findByGiftIdAndAndArchiveId(item.getId(), archiveGui.getId()).orElse(null);
                    if (archiveGiftGui == null) {
                        archiveGiftGui = new ArchiveGift();
                        archiveGiftGui.setQuantity(item.getQuantity());
                        archiveGiftGui.setArchiveId(archiveGui.getId());
                        archiveGiftGui.setGiftId(item.getId());
                    } else {
                        archiveGiftGui.setQuantity(archiveGiftGui.getQuantity() + item.getQuantity());
                    }
                    archiveGifts.add(archiveGiftGui);
                }
                archiveGiftRepository.saveAll(archiveGifts);
                archiveGifts.clear();
                archiveGiftRepository.deleteAll(archiveGiftDeletes);
                archiveGiftDeletes.clear();
                honeyRepository.saveAll(honeyUpdates);
                return true;
            }catch (Exception e) {
                e.printStackTrace();
                return null;
            }
    }
}
