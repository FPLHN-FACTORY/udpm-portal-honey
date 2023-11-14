package com.honeyprojects.infrastructure.configution;

import com.honeyprojects.core.jobs.CloseExpirationGiftJob;
import com.honeyprojects.core.jobs.CloseExpirationSemesterAndOpenNewSemesterJob;
import org.quartz.CronScheduleBuilder;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;

public class CronTrigger {
    public static void main( String[] args ) throws Exception
    {

        JobKey jobKeyA = new JobKey("jobA", "group1");
        JobDetail jobA = JobBuilder.newJob(CloseExpirationSemesterAndOpenNewSemesterJob.class)
                .withIdentity(jobKeyA).build();

        JobKey jobKeyB = new JobKey("jobB", "group1");
        JobDetail jobB = JobBuilder.newJob(CloseExpirationGiftJob.class)
                .withIdentity(jobKeyB).build();


        Trigger trigger1 = TriggerBuilder
                .newTrigger()
                .withIdentity("dummyTriggerName1", "group1")
                .withSchedule(
                        CronScheduleBuilder.cronSchedule("0/5 * * * * ?"))
                .build();

        Trigger trigger2 = TriggerBuilder
                .newTrigger()
                .withIdentity("dummyTriggerName2", "group1")
                .withSchedule(
                        CronScheduleBuilder.cronSchedule("0/5 * * * * ?"))
                .build();

        Scheduler scheduler = new StdSchedulerFactory().getScheduler();

        scheduler.start();
        scheduler.scheduleJob(jobA, trigger1);
        scheduler.scheduleJob(jobB, trigger2);

    }
}
