//package com.portalprojects.util;
//
//import com.portalprojects.core.admin.model.response.MyMissionResponse;
//import com.portalprojects.entity.MissionDetail;
//import com.portalprojects.entity.Student;
//import com.portalprojects.infrastructure.contant.TrangThaiNhiemVu;
//import com.portalprojects.repository.MissionDetailRepository;
//import com.portalprojects.repository.MissionRepository;
//import com.portalprojects.repository.StudentRepository;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//import java.util.ArrayList;
//
//@Component
//@Slf4j
//public class DailyCheckTrangThaiNhiemVu {
//
//    @Autowired
//    @Qualifier(MissionRepository.NAME)
//    private MissionRepository missionRepository;
//
//    @Autowired
//    @Qualifier(MissionDetailRepository.NAME)
//    private MissionDetailRepository missionDetailRepostiory;
//
//    @Autowired
//    @Qualifier(StudentRepository.NAME)
//    private StudentRepository studentRepository;
//
//    @Scheduled(fixedDelay = 1000)
//    public void daiLyChecking() throws InterruptedException {
//        Student student = this.studentRepository.findByCode("SV1");
//        ArrayList<MyMissionResponse> myMissions = this.missionRepository.getMyMissionByStudentId(student.getId());
//
//        myMissions.forEach(e->{
//            if(e.getStatus() != 2) {
//                if(e.getDateRemaining() < 0 ){
//                    MissionDetail missionDetail = this.missionDetailRepostiory.getMissionDetailByStudentIdAndMissionId(student.getId(), e.getId());
//                    this.missionDetailRepostiory.updateStatusByMissionDetailId(missionDetail.getId(), TrangThaiNhiemVu.DA_HET_HAN);
//                }
//                if (e.getDateRemaining() == 0 ) {
//                    if (e.getTimeRemaining() < 0) {
//                        MissionDetail missionDetail = this.missionDetailRepostiory.getMissionDetailByStudentIdAndMissionId(student.getId(), e.getId());
//                        this.missionDetailRepostiory.updateStatusByMissionDetailId(missionDetail.getId(), TrangThaiNhiemVu.DA_HET_HAN);
//                    }
//                }
//            }
//        });
//    }
//
//}
