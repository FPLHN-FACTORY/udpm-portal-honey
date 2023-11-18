//package com.honeyprojects.infrastructure.configution;
//
//import com.honeyprojects.core.jobs.CloseExpirationSemesterAndOpenNewSemesterJob;
//import org.quartz.JobDetail;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.scheduling.quartz.JobDetailFactoryBean;
//import org.springframework.scheduling.quartz.SimpleTriggerFactoryBean;
//
//@Configuration
//public class QuartzConfig {
//
//    @Bean
//    public JobDetailFactoryBean jobDetailFactoryBean() {
//        JobDetailFactoryBean jobDetailFactoryBean = new JobDetailFactoryBean();
//        jobDetailFactoryBean.setJobClass(CloseExpirationSemesterAndOpenNewSemesterJob.class);
//        jobDetailFactoryBean.setName("closeExpirationSemesterAndOpenNewSemesterJob");
//        jobDetailFactoryBean.setDescription("Close Expiration Semester And Open New Semester Job");
//        jobDetailFactoryBean.setDurability(true);
//        return jobDetailFactoryBean;
//    }
//
//    @Bean
//    public SimpleTriggerFactoryBean simpleTriggerFactoryBean(JobDetail jobDetail) {
//        SimpleTriggerFactoryBean simpleTriggerFactoryBean = new SimpleTriggerFactoryBean();
//        simpleTriggerFactoryBean.setJobDetail(jobDetail);
//        simpleTriggerFactoryBean.setStartDelay(0); // Chạy ngay khi được kích hoạt
//        simpleTriggerFactoryBean.setRepeatCount(0); // Chạy một lần
//        simpleTriggerFactoryBean.setRepeatInterval(0); // Không lặp lại
//        return simpleTriggerFactoryBean;
//    }
//}
