package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminSearchSemesterRequest;
import com.honeyprojects.core.admin.model.request.AdminSemesterRequest;
import com.honeyprojects.core.admin.model.response.AdminSemesterResponse;
import com.honeyprojects.core.admin.model.response.SemesterJobResponse;
import com.honeyprojects.core.admin.repository.AdSemesterRepository;
import com.honeyprojects.core.admin.service.AdminSemesterService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.jobs.CloseExpirationSemesterAndOpenNewSemesterJob;
import com.honeyprojects.entity.Semester;
import com.honeyprojects.infrastructure.contant.Message;
import com.honeyprojects.infrastructure.contant.SemesterStatus;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunction;
import com.honeyprojects.infrastructure.rabbit.RabbitProducer;
import com.honeyprojects.util.DataUtils;
import com.honeyprojects.util.LoggerUtil;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.SimpleTrigger;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AdminSemesterServiceImpl implements AdminSemesterService {

    @Autowired
    private AdSemesterRepository adSemesterRepository;

    @Autowired
    private LoggerUtil loggerUtil;

    @Autowired
    private RabbitProducer producer;

    @Autowired
    private SchedulerFactoryBean schedulerFactoryBean;

//    @Autowired
//    private JobDetail jobDetail;

    @Autowired
    private SimpleTrigger simpleTrigger;

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
            semester.setStatus(SemesterStatus.KHONG_HOAT_DONG);
            deleteJob(semester.getId());
            adSemesterRepository.save(semester);
            return semester;
        }).orElse(null);
    }

    @Override
    public Semester addSemester(AdminSemesterRequest request) {
        Semester existSemester = adSemesterRepository.findSemesterByStatus(SemesterStatus.DANG_HOAT_DONG);
        if (!DataUtils.isNullObject(existSemester) && request.getStatus().equals(SemesterStatus.DANG_HOAT_DONG)) {
            throw new RestApiException(Message.SEMESTER_ALREADY_EXIST);
        }
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
//        createJob(semester);
        try {
            SchedulerFactory schedulerFactory = new StdSchedulerFactory();
            Scheduler scheduler = schedulerFactory.getScheduler();
            scheduler.start();

            JobDetail jobDetail = JobBuilder.newJob(CloseExpirationSemesterAndOpenNewSemesterJob.class)
                    .withIdentity("semesterEndJob_" + semester.getId(), "group1")
                    .build();

            jobDetail.getJobDataMap().put("adSemesterRepository", adSemesterRepository);

            Trigger trigger = TriggerBuilder.newTrigger()
                    .withIdentity("semesterEndTrigger_" + semester.getId(), "group1")
                    .startAt(new Date(semester.getToDate()))
                    .build();

            scheduler.scheduleJob(jobDetail, trigger);
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
        return semester;
    }

    private void createJob(Semester semester) {
        try {
            SchedulerFactory schedulerFactory = new StdSchedulerFactory();
            Scheduler scheduler = schedulerFactory.getScheduler();
            scheduler.start();

            JobDetail jobDetail = JobBuilder.newJob(CloseExpirationSemesterAndOpenNewSemesterJob.class)
                    .withIdentity("semesterEndJob_" + semester.getId(), "group1")
                    .build();

            jobDetail.getJobDataMap().put("adSemesterRepository", adSemesterRepository);

            Trigger trigger = TriggerBuilder.newTrigger()
                    .withIdentity("semesterEndTrigger_" + semester.getId(), "group1")
                    .startAt(new Date(semester.getToDate()))
                    .withSchedule(SimpleScheduleBuilder.simpleSchedule().withRepeatCount(0))
                    .build();

            scheduler.scheduleJob(jobDetail, trigger);
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
    }

    private void deleteJob(String id) {
        try {
            SchedulerFactory schedulerFactory = new StdSchedulerFactory();
            Scheduler scheduler = schedulerFactory.getScheduler();
            scheduler.start();
            // Xóa công việc và trigger của đợt cũ nếu tồn tại
            scheduler.deleteJob(JobKey.jobKey("semesterEndJob_" + id, "group1"));
        } catch (SchedulerException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Semester updateSemester(AdminSemesterRequest request, String id) {
        Semester semester = adSemesterRepository.findById(id).orElse(null);
        Long oldToDate = semester.getToDate();
        String oldId = semester.getId();
        StringBuilder contentLogger = new StringBuilder();

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
        if (oldToDate != semester.getToDate()) {
            deleteJob(oldId);
            createJob(semester);
        }
        return semester;
    }

    @Override
    public SemesterJobResponse findSemesterByStatus() {
        return adSemesterRepository.getSemesterJobByStatus();
    }

    @Override
    public void openNewSemester(Long newDate) {
        SemesterJobResponse semesterJobResponse = adSemesterRepository.openNewSemester();
        if (semesterJobResponse.getToDate() == newDate) {
            Optional<Semester> optionalSemester = adSemesterRepository.findById(semesterJobResponse.getId());
            optionalSemester.get().setStatus(SemesterStatus.DANG_HOAT_DONG);
        }
    }

}
