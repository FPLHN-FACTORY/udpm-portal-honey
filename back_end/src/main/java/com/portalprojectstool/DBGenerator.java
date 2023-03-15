package com.portalprojectstool;

import com.portalprojects.entity.Gift;
import com.portalprojects.entity.GiftDetail;
import com.portalprojects.entity.Mission;
import com.portalprojects.entity.MissionDetail;
import com.portalprojects.entity.Point;
import com.portalprojects.entity.Student;
import com.portalprojects.entity.Teacher;
import com.portalprojects.repository.GiftDetailRepository;
import com.portalprojects.repository.GiftRepository;
import com.portalprojects.repository.MissionDetailRepository;
import com.portalprojects.repository.MissionRepository;
import com.portalprojects.repository.PointRepository;
import com.portalprojects.repository.StudentRepository;
import com.portalprojects.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Date;

@SpringBootApplication
@EnableJpaRepositories(
        basePackages = "com.portalprojects.repository"
)
@ComponentScan(basePackages={"com.portalprojects.repository"})
@EntityScan(basePackages="com.portalprojects.entity")
public class DBGenerator  implements CommandLineRunner {

    @Autowired
    private GiftDetailRepository giftDetailRepository;

    @Autowired
    private GiftRepository giftRepository;

    @Autowired
    private MissionDetailRepository missionDetailRepository;

    @Autowired
    private MissionRepository missionRepository;

    @Autowired
    private PointRepository pointRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    public void run(String... args) throws Exception{

        Teacher teacher1  = new Teacher();
        teacher1.setCode("GV1");
        teacher1.setName("Tam");
        teacher1.setCreatedDate(56000l);
        teacher1.setLastModifiedDate(57000l);

        Teacher teacher2  = new Teacher();
        teacher2.setCode("GV2");
        teacher2.setName("hung");
        teacher2.setCreatedDate(56000l);
        teacher2.setLastModifiedDate(57000l);

        this.teacherRepository.save(teacher1);
        this.teacherRepository.save(teacher2);


        Student student1 = new Student();
        student1.setName("a");
        student1.setScore(0);
        student1.setCreatedDate(5600l);
        student1.setLastModifiedDate(5600l);
        student1.setEmail("tamhvph21131@gmail.com");
        student1.setCode("SV1");

        Student student2 = new Student();
        student2.setName("b");
        student2.setScore(0);
        student2.setCreatedDate(5600l);
        student2.setLastModifiedDate(5600l);
        student2.setEmail("tamhvph21131@gmail.com");
        student2.setCode("SV2");

        this.studentRepository.save(student1);
        this.studentRepository.save(student2);

        Point point1 = new Point();
        point1.setExpirationDate(new Date());
        point1.setNote("Thừa điểm không biết làm gì");
        point1.setStudentId("SV1");
        point1.setScore(500);
        point1.setCreatedDate(5600l);
        point1.setLastModifiedDate(5600l);

        Point point2 = new Point();
        point2.setExpirationDate(new Date());
        point2.setNote("Thừa điểm không biết làm gì ");
        point2.setStudentId("SV2");
        point2.setScore(500);
        point2.setCreatedDate(5600l);
        point2.setLastModifiedDate(5600l);

        this.pointRepository.save(point1);
        this.pointRepository.save(point2);

        Mission mission1 = new Mission();
        mission1.setCreatedDate(5600l);
        mission1.setLastModifiedDate(5600l);
        mission1.setDescribeMission("Tìm người yêu");
        mission1.setCode("NV1");
        mission1.setName("Tìm người yêu");
        mission1.setPointMission(8888);

        Mission mission2 = new Mission();
        mission2.setCreatedDate(5600l);
        mission2.setLastModifiedDate(5600l);
        mission2.setDescribeMission("Tìm người yêu ");
        mission2.setCode("NV2");
        mission2.setName("Tìm người yêu cho mẹ");
        mission2.setPointMission(8888);

        this.missionRepository.save(mission1);
        this.missionRepository.save(mission2);

        MissionDetail missionDetail1 = new MissionDetail();
        missionDetail1.setMissionId("NV1");
        missionDetail1.setCreatedDate(5600l);
        missionDetail1.setLastModifiedDate(5600l);
        missionDetail1.setStudentId("SV1");
        missionDetail1.setStartDay(new Date());
        missionDetail1.setFinishDay(new Date());

        MissionDetail missionDetail2 = new MissionDetail();
        missionDetail2.setMissionId("NV2");
        missionDetail2.setCreatedDate(5600l);
        missionDetail2.setLastModifiedDate(5600l);
        missionDetail2.setStudentId("SV1");
        missionDetail2.setStartDay(new Date());
        missionDetail2.setFinishDay(new Date());

        this.missionDetailRepository.save(missionDetail1);
        this.missionDetailRepository.save(missionDetail2);

        Gift gift1 = new Gift();
        gift1.setCode("G1");
        gift1.setName("Nhận một cô người yêu xinh vl");
        gift1.setNote("Cac em đạt đủ 2 tỷ điểm sẽ đổi được 1 cô người yêu ");
        gift1.setCreatedDate(5600l);
        gift1.setLastModifiedDate(5600l);

        Gift gift2 = new Gift();
        gift2.setCode("G2");
        gift2.setName("Nhận lamborghini adventador");
        gift2.setNote("Cac em đạt đủ 2 0 tỷ điểm sẽ đổi được 1 xe thể thao lamborghini ");
        gift2.setCreatedDate(5600l);
        gift2.setLastModifiedDate(5600l);

        this.giftRepository.save(gift1);
        this.giftRepository.save(gift2);

        GiftDetail giftDetail1 = new GiftDetail();
        giftDetail1.setGiftId("G1");
        giftDetail1.setCreatedDate(5600l);
        giftDetail1.setLastModifiedDate(5600l);
        giftDetail1.setChangeDate(new Date());
        giftDetail1.setScorePoint(3000);
        giftDetail1.setStudentId("SV1");

        GiftDetail giftDetail2 = new GiftDetail();
        giftDetail2.setGiftId("G2");
        giftDetail2.setCreatedDate(5600l);
        giftDetail2.setLastModifiedDate(5600l);
        giftDetail2.setChangeDate(new Date());
        giftDetail2.setScorePoint(3000);
        giftDetail2.setStudentId("SV1");

        this.giftDetailRepository.save(giftDetail1);
        this.giftDetailRepository.save(giftDetail2);

    }

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(DBGenerator.class);
        ctx.close();
    }

}
