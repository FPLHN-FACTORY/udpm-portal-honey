package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminSemesterRequest;
import com.honeyprojects.core.admin.repository.AdSemesterRepository;
import com.honeyprojects.core.admin.service.AdminSemesterLogService;
import com.honeyprojects.entity.Semester;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunction;
import com.honeyprojects.infrastructure.rabbit.RabbitProducer;
import com.honeyprojects.util.LoggerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class AdminSemesterLogServiceImpl implements AdminSemesterLogService {

    @Autowired
    private AdSemesterRepository adSemesterRepository;
    @Autowired
    private LoggerUtil loggerUtil;
    @Autowired
    private RabbitProducer producer;

    @Override
    public Boolean addSemester(AdminSemesterRequest request) {
        try {
            Semester semester = new Semester();
            StringBuilder contentLogger = new StringBuilder();

            int number = new Random().nextInt(1000);
            String code = String.format("SE%04d", number);
            semester.setCode(code);
            semester.setName(request.getName());
            semester.setToDate(request.getToDate());
            semester.setFromDate(request.getFromDate());
            semester.setStatus(request.getStatus());
            adSemesterRepository.save(semester);

            contentLogger.append("Kỳ học có mã " + semester.getCode() + " được thêm vào hệ thống. ");
            contentLogger.append("Có trạng thái " + semester.getStatus());
            LoggerFunction loggerObject = new LoggerFunction();
            loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
            loggerObject.setContent(contentLogger.toString());
            try {
                producer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        } catch (Exception exception) {
            exception.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public Boolean updateSemester(AdminSemesterRequest request, String id) {
        try {
            Semester semester = adSemesterRepository.findById(id).get();
            StringBuilder contentLogger = new StringBuilder();

            int number = new Random().nextInt(1000);
            String code = String.format("SE%04d", number);
            semester.setCode(code);
            semester.setName(request.getName());
            semester.setToDate(request.getToDate());
            semester.setFromDate(request.getFromDate());
            semester.setStatus(request.getStatus());
            adSemesterRepository.save(semester);

            contentLogger.append("Kỳ học có mã " + semester.getCode() + " đã được cập nhật. ");
            contentLogger.append("Có trạng thái " + semester.getStatus());
            LoggerFunction loggerObject = new LoggerFunction();
            loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
            loggerObject.setContent(contentLogger.toString());
            try {
                producer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        } catch (Exception exception) {
            exception.printStackTrace();
            return false;
        }
        return true;
    }
}
