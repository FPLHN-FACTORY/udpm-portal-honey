package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.admin.repository.CensorUserAPIRepository;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.common.base.UdomHoney;
import com.honeyprojects.core.student.model.request.StudentChangeStatusHistoryRequest;
import com.honeyprojects.core.student.model.request.StudentSearchHistoryRequest;
import com.honeyprojects.core.student.model.request.StudentTransactionRequest;
import com.honeyprojects.core.student.model.response.StudentCategoryResponse;
import com.honeyprojects.core.student.model.response.StudentHistoryResponse;
import com.honeyprojects.core.student.model.response.StudentHoneyResponse;
import com.honeyprojects.core.student.repository.StudentCategoryRepository;
import com.honeyprojects.core.student.repository.StudentHistoryRepository;
import com.honeyprojects.core.student.repository.StudentHoneyRepository;
import com.honeyprojects.core.student.repository.StudentVericationRepository;
import com.honeyprojects.core.student.service.StudentTransactionService;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.entity.Verification;
import com.honeyprojects.infrastructure.configemail.EmailSender;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.Message;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import com.honeyprojects.util.RSAEncryption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;
import java.util.Random;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


@Service
public class StudentTransactionServiceImpl implements StudentTransactionService {

    @Value("${rsa.public-key}")
    private String publicKey;

    @Value("${rsa.private-key}")
    private String privateKey;

    //fake user login
    @Autowired
    private CensorUserAPIRepository userRepository;

    @Autowired
    private StudentCategoryRepository categoryRepository;
    @Autowired
    private StudentHoneyRepository honeyRepository;
    @Autowired
    private StudentHistoryRepository historyRepository;
    @Autowired
    private StudentVericationRepository vericationRepository;
    @Autowired
    private EmailSender emailSender;

    @Autowired
    private UdomHoney udomHoney;


    @Override
    public List<StudentCategoryResponse> getCategory(String recipientId) {
        if (Objects.equals(recipientId, udomHoney.getIdUser())) {
            throw new RestApiException(Message.MA_NGUOI_NHAN_KHONG_HOP_LE);
        }
        return categoryRepository.getCategoryByIdUser(udomHoney.getIdUser());
    }

    @Override
    public StudentHoneyResponse getHoney(String categoryId) {
        Long dateNow = Calendar.getInstance().getTimeInMillis();
        return honeyRepository.getPoint(categoryId, udomHoney.getIdUser(), dateNow);
    }

    @Override
    public String genCodeVerify() {
        Random random = new Random();

        String codeVerify = String.format("%06d", random.nextInt(1000000));
        Calendar calendar = Calendar.getInstance();

        calendar.add(Calendar.MINUTE, 3);
        Long dateVerify = calendar.getTimeInMillis();

        try {
            PublicKey keyPublic = RSAEncryption.getPublicKeyFromString(publicKey);
            String encryptedCode = RSAEncryption.encrypt(codeVerify, keyPublic);
            Verification verification = vericationRepository
                    .findByStudentId(udomHoney.getIdUser()).orElse(new Verification());
            verification.setCode(encryptedCode);
            verification.setStudentId(udomHoney.getIdUser());
            verification.setExpiryTime(dateVerify);
            vericationRepository.save(verification);
        } catch (Exception e) {
            return null;
        }
        String[] toMail = {udomHoney.getEmail()};
        Runnable emailTask = () -> emailSender.sendEmail(toMail, "Xác nhận giao dịch",
                "Mã xác nhận của bạn là",
                "<h1 style='text-align: center'>" + codeVerify + "</h1>");

        ExecutorService executorService = Executors.newFixedThreadPool(5);
        executorService.execute(emailTask);
        executorService.shutdown();
        return udomHoney.getEmail();
    }

    @Override
    public Boolean checkVerify(String code) {
        long now = Calendar.getInstance().getTimeInMillis();
        try {
            PrivateKey keyPrivate = RSAEncryption.getPrivateKeyFromString(privateKey);
            Verification verification = vericationRepository
                    .findByStudentId(udomHoney.getIdUser())
                    .orElseThrow(() -> new RestApiException(Message.VERIFICATION_NOT_EXIST));
            String codeDeCrypt = RSAEncryption.decrypt(verification.getCode(), keyPrivate);
            return codeDeCrypt.equals(code) && now <= verification.getExpiryTime();
        } catch (Exception e) {
            return false;
        }
    }


    @Override
    @Transactional
    public History trasaction(StudentTransactionRequest transactionRequest) {
        long now = Calendar.getInstance().getTimeInMillis();
        History history = new History();
        history.setStudentId(transactionRequest.getIdStudent());
        history.setNote(transactionRequest.getNote());
        history.setHoneyPoint(transactionRequest.getHoneyPoint());
        history.setHoneyId(transactionRequest.getIdHoney());
        history.setType(TypeHistory.GIAO_DICH);
        history.setCreatedAt(now);

        //type == 1 la honey can phe duyet
        if (transactionRequest.getType() == 1) {
            history.setStatus(HoneyStatus.CHO_PHE_DUYET);
            return historyRepository.save(history);
        }
        //type == 0 giao dich ngay khong can phe duyet
        if (transactionRequest.getType() == 0) {

            //lay ra honey cua nguoi gui
            Honey honey = honeyRepository.findById(transactionRequest.getIdHoney())
                    .orElseThrow(() -> new RestApiException(Message.HONEY_NOT_EXIST));
            //tru honey cua nguoi gui
            honey.setHoneyPoint(honey.getHoneyPoint() - transactionRequest.getHoneyPoint());

            //lay ra honey cua nguoi nhan
            StudentHoneyResponse honeyResponse = honeyRepository.getPoint(transactionRequest
                    .getIdCategory(), transactionRequest.getIdStudent(), now);
            honeyRepository.save(honey);
            //kiem tra neu honey nguoi nhan khong ton tai se tao moi
            Honey honeyNhan = new Honey();
            if (honeyResponse == null) {
                honeyNhan.setHoneyPoint(0);
                honeyNhan.setHoneyCategoryId(transactionRequest.getIdCategory());
                honeyNhan.setStudentId(transactionRequest.getIdStudent());
                honeyNhan.setUserSemesterId(honey.getUserSemesterId());
            } else {
                honeyNhan.setHoneyPoint(honeyResponse.getHoney());
                honeyNhan.setHoneyCategoryId(transactionRequest.getIdCategory());
                honeyNhan.setStudentId(transactionRequest.getIdStudent());
                honeyNhan.setUserSemesterId(honey.getUserSemesterId());
                honeyNhan.setId(honeyResponse.getId());
            }
            //cong them honey cho nguoi nhan
            honeyNhan.setHoneyPoint(honeyNhan.getHoneyPoint() + transactionRequest.getHoneyPoint());
            honeyRepository.save(honeyNhan);

            history.setChangeDate(now);
            history.setStatus(HoneyStatus.DA_PHE_DUYET);
            return historyRepository.save(history);
        }
        return null;
    }

    @Override
    public History changeStatus(StudentChangeStatusHistoryRequest changeReq) {
        History history = historyRepository.findById(changeReq.getIdHistory()).get();
        history.setStatus(HoneyStatus.values()[changeReq.getStatus()]);
        return historyRepository.save(history);
    }

    @Override
    public PageableObject<StudentHistoryResponse> getHistory(StudentSearchHistoryRequest historyRequest) {
        Pageable pageable = PageRequest.of(historyRequest.getPage(), historyRequest.getSize());
        historyRequest.setIdUserLogin(udomHoney.getIdUser());
        System.out.println(udomHoney.getIdUser() + " aaaaaaaaaaaaa");
        return new PageableObject<>(historyRepository.getHistory(historyRequest, pageable));
    }
}
