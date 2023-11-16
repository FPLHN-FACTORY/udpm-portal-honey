//package com.honeyprojects.core.jobs;
//
//import com.honeyprojects.core.admin.model.response.SemesterJobResponse;
//import com.honeyprojects.infrastructure.contant.SemesterStatus;
//import com.honeyprojects.util.DataUtils;
//import org.quartz.Job;
//import org.quartz.JobDataMap;
//import org.quartz.JobExecutionContext;
//import org.quartz.JobExecutionException;
//import org.quartz.JobKey;
//import org.quartz.Scheduler;
//import org.quartz.SchedulerException;
//import org.quartz.SchedulerFactory;
//import org.quartz.impl.StdSchedulerFactory;
//
//import java.util.Optional;
//
//public class CloseExpirationSemesterAndOpenNewSemesterJob implements Job {
//
//    @Override
//    public void execute(JobExecutionContext context) throws JobExecutionException {
//
//        JobDataMap dataMap = context.getJobDetail().getJobDataMap();
//
//        AdSemesterRepository adSemesterRepository = (AdSemesterRepository) dataMap.get("adSemesterRepository");
//
//        if (!DataUtils.isNullObject(adSemesterRepository)) {
//            // Lấy ngày hiện tại
//            Long currentDateMillis = System.currentTimeMillis();
//            SemesterJobResponse semester = adSemesterRepository.getSemesterJobByStatus();
//            Long toDate = semester.getToDate();
//            if (!DataUtils.isNullObject(toDate)) {
//                // So sánh kiểu long
//                if (currentDateMillis >= toDate) {
//                    // Ngày hiện tại lớn hơn hoặc bằng toDate, thực hiện cập nhật trạng thái ở đây
//                    // close
//                    Optional<Semester> optionalSemester = adSemesterRepository.findById(semester.getId());
//                    optionalSemester.get().setStatus(SemesterStatus.KHONG_HOAT_DONG);
//                    adSemesterRepository.save(optionalSemester.get());
//                    deleteJob(semester.getId());
//                    // open new
//                    SemesterJobResponse semesterJobResponse = adSemesterRepository.openNewSemester();
//                    if (!DataUtils.isNullObject(semesterJobResponse)) {
//                        if (semesterJobResponse.getToDate() == currentDateMillis) {
//                            Optional<Semester> optionalSemesterNew = adSemesterRepository.findById(semesterJobResponse.getId());
//                            optionalSemesterNew.get().setStatus(SemesterStatus.DANG_HOAT_DONG);
//                        }
//                    }
////                adminSemesterService.deleteSemester(semester.getId());
////                adminSemesterService.openNewSemester(currentDateMillis);
//                    System.out.println("Cập nhật trạng thái...");
//                }
//            }
//        }
//    }
//
//    private void deleteJob(String id) {
//        try {
//            SchedulerFactory schedulerFactory = new StdSchedulerFactory();
//            Scheduler scheduler = schedulerFactory.getScheduler();
//            scheduler.start();
//            // Xóa công việc và trigger của đợt cũ nếu tồn tại
//            scheduler.deleteJob(JobKey.jobKey("semesterEndJob_" + id, "group1"));
//        } catch (SchedulerException e) {
//            e.printStackTrace();
//        }
//    }
//}
