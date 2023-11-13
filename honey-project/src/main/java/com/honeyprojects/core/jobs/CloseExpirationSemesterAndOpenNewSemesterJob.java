package com.honeyprojects.core.jobs;

import com.honeyprojects.core.admin.model.response.SemesterJobResponse;
import com.honeyprojects.core.admin.service.AdminSemesterService;
import com.honeyprojects.util.DataUtils;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;

public class CloseExpirationSemesterAndOpenNewSemesterJob implements Job {

    @Autowired
    private AdminSemesterService adminSemesterService;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {

        System.out.println("Tôi đã vào công việc CloseExpirationSemesterAndOpenNewSemesterJob");
        // Lấy ngày hiện tại
        Long currentDateMillis = System.currentTimeMillis();
        SemesterJobResponse semester = adminSemesterService.findSemesterByStatus();
        Long toDate = semester.getToDate();
        if (!DataUtils.isNullObject(toDate)) {
            // So sánh kiểu long
            if (currentDateMillis >= toDate) {
                // Ngày hiện tại lớn hơn hoặc bằng toDate, thực hiện cập nhật trạng thái ở đây
                adminSemesterService.deleteSemester(semester.getId());
                adminSemesterService.openNewSemester(currentDateMillis);
                System.out.println("Cập nhật trạng thái...");
            }
        }
    }
}
