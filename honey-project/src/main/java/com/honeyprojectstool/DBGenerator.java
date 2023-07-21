package com.honeyprojectstool;

import com.honeyprojects.entity.Admin;
import com.honeyprojects.entity.Conversion;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.entity.Semester;
import com.honeyprojects.entity.Student;
import com.honeyprojects.entity.Teacher;
import com.honeyprojects.entity.UserSemester;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.repository.AdminRepositpry;
import com.honeyprojects.repository.ConversionRepository;
import com.honeyprojects.repository.GiftRepository;
import com.honeyprojects.repository.HistoryRepository;
import com.honeyprojects.repository.HoneyRepository;
import com.honeyprojects.repository.SemesterRepository;
import com.honeyprojects.repository.StudentRepository;
import com.honeyprojects.repository.TeacherRepository;
import com.honeyprojects.repository.UserSemesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(
        basePackages = "com.honeyprojects.repository"
)
public class DBGenerator implements CommandLineRunner {

    @Autowired
    private GiftRepository giftRepository;

    @Autowired
    private HoneyRepository honeyRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private SemesterRepository semesterRepository;

    @Autowired
    private UserSemesterRepository userSemesterRepository;

    @Autowired
    private ConversionRepository conversionRepository;

    @Autowired
    private AdminRepositpry adminRepositpry;


    public void run(String... args) throws Exception{

        Student student1 = new Student();
        student1.setName("Nguyễn Xuân Hải");
        student1.setEmail("nguyenxuanhai@gmail.com");
        student1.setCode("SV1");
        student1.setId(studentRepository.save(student1).getId());

        Student student2 = new Student();
        student2.setName("Phùng Việt Hùng");
        student2.setEmail("phungviethung@gmail.com");
        student2.setCode("SV2");
        student2.setId(studentRepository.save(student2).getId());

        Student student3 = new Student();
        student3.setName("Ngọc Anh");
        student3.setEmail("ngocanh@gmail.com");
        student3.setCode("SV3");
        student3.setId(studentRepository.save(student3).getId());

        Student student4 = new Student();
        student4.setName("Nguyễn Quốc Huy");
        student4.setEmail("nguyenquochuy@gmail.com");
        student4.setCode("SV4");
        student4.setId(studentRepository.save(student4).getId());

        Student student5 = new Student();
        student5.setName("Vũ Quang Huy");
        student5.setEmail("vuquanghuy@gmail.com");
        student5.setCode("SV5");
        student5.setId(studentRepository.save(student5).getId());

        Teacher teacher1 = new Teacher();
        teacher1.setName("Nguyễn Thúy Hằng");
        teacher1.setEmail("hangnt169@gmail.com");
        teacher1.setCode("TE1");
        teacher1.setId(teacherRepository.save(teacher1).getId());

        Teacher teacher2 = new Teacher();
        teacher2.setName("Vũ Văn Nguyên");
        teacher2.setEmail("nguyenvv4@gmail.com");
        teacher2.setCode("TE2");
        teacher2.setId(teacherRepository.save(teacher1).getId());

        Teacher teacher3 = new Teacher();
        teacher3.setName("Trần Tuấn Phong");
        teacher3.setEmail("phongtt35@gmail.com");
        teacher3.setCode("TE3");
        teacher3.setId(teacherRepository.save(teacher3).getId());

        Teacher teacher4 = new Teacher();
        teacher4.setName("Phạm Gia Khánh");
        teacher4.setEmail("khanhpg9@gmail.com");
        teacher4.setCode("TE4");
        teacher4.setId(teacherRepository.save(teacher4).getId());

        Teacher teacher5 = new Teacher();
        teacher5.setName("Nguyễn Hoàng Tiến");
        teacher5.setEmail("tiennh21@gmail.com");
        teacher5.setCode("TE5");
        teacher5.setId(teacherRepository.save(teacher5).getId());

        Admin admin1 = new Admin();
        admin1.setName("Nguyễn Anh Dũng");
        admin1.setEmail("dungna29@gmail.com");
        admin1.setCode("TE5");
        admin1.setId(adminRepositpry.save(admin1).getId());

        Honey honey1 = new Honey();
        honey1.setHoneyPoint(100);
        honey1.setStudentId(student1.getId());
        honey1.setId(honeyRepository.save(honey1).getId());

        Honey honey2 = new Honey();
        honey2.setHoneyPoint(200);
        honey2.setStudentId(student2.getId());
        honey2.setId(honeyRepository.save(honey2).getId());

        Honey honey3 = new Honey();
        honey3.setHoneyPoint(100);
        honey3.setStudentId(student3.getId());
        honey3.setId(honeyRepository.save(honey3).getId());

        Honey honey4 = new Honey();
        honey4.setHoneyPoint(100);
        honey4.setStudentId(student3.getId());
        honey4.setId(honeyRepository.save(honey4).getId());

        Honey honey5 = new Honey();
        honey5.setHoneyPoint(100);
        honey5.setStudentId(student3.getId());
        honey5.setId(honeyRepository.save(honey5).getId());

        Gift gift1 = new Gift();
        gift1.setCode("G1");
        gift1.setName("Điểm lab");
        gift1.setStatus(Status.HOAT_DONG);
        gift1.setId(giftRepository.save(gift1).getId());

        Gift gift2 = new Gift();
        gift2.setCode("G2");
        gift2.setName("Điểm thi");
        gift2.setStatus(Status.HOAT_DONG);
        gift2.setId(giftRepository.save(gift2).getId());

        Semester semester = new Semester();
        semester.setCode("SE1");
        semester.setName("Summer 2023");
        semester.setToDate(1687194000000L);
        semester.setFromDate(1691600400000L);
        semester.setId(semesterRepository.save(semester).getId());

        UserSemester userSemester1 = new UserSemester();
        userSemester1.setSemesterId(semester.getId());
        userSemester1.setStudentId(student1.getId());
        userSemester1.setTotalHoney(100);
        userSemester1.setId(userSemesterRepository.save(userSemester1).getId());

        UserSemester userSemester2 = new UserSemester();
        userSemester2.setSemesterId(semester.getId());
        userSemester2.setStudentId(student2.getId());
        userSemester2.setTotalHoney(200);
        userSemester2.setId(userSemesterRepository.save(userSemester2).getId());

        UserSemester userSemester3 = new UserSemester();
        userSemester3.setSemesterId(semester.getId());
        userSemester3.setStudentId(student3.getId());
        userSemester3.setTotalHoney(100);
        userSemester3.setId(userSemesterRepository.save(userSemester3).getId());

        UserSemester userSemester4 = new UserSemester();
        userSemester4.setSemesterId(semester.getId());
        userSemester4.setStudentId(student3.getId());
        userSemester4.setTotalHoney(100);
        userSemester4.setId(userSemesterRepository.save(userSemester4).getId());

        UserSemester userSemester5 = new UserSemester();
        userSemester5.setSemesterId(semester.getId());
        userSemester5.setStudentId(student3.getId());
        userSemester5.setTotalHoney(100);
        userSemester5.setId(userSemesterRepository.save(userSemester5).getId());

        Conversion conversion1 = new Conversion();
        conversion1.setCode("CV1");
        conversion1.setComponentPoint(100);
        conversion1.setHoney_point(1.0);
        conversion1.setStatus(Status.HOAT_DONG);
        conversion1.setGift_id(gift1.getId());
        conversion1.setId(conversionRepository.save(conversion1).getId());

        Conversion conversion2 = new Conversion();
        conversion2.setCode("CV2");
        conversion2.setComponentPoint(100);
        conversion2.setHoney_point(0.1);
        conversion2.setStatus(Status.HOAT_DONG);
        conversion2.setGift_id(gift2.getId());
        conversion2.setId(conversionRepository.save(conversion2).getId());

        History history1 = new History();
        history1.setNameGift("Điểm lab");
        history1.setHoneyPoint(100);
        history1.setChangeDate(1689932796276L);
        history1.setGiftId(gift1.getId());
        history1.setStudentId(student1.getId());
        history1.setTeacherId(teacher1.getId());
        history1.setId(historyRepository.save(history1).getId());

        History history2 = new History();
        history2.setNameGift("Điểm lab");
        history2.setHoneyPoint(100);
        history2.setChangeDate(1689932796276L);
        history2.setGiftId(gift1.getId());
        history2.setStudentId(student3.getId());
        history2.setTeacherId(teacher2.getId());
        history2.setId(historyRepository.save(history2).getId());

        History history3 = new History();
        history3.setNameGift("Điểm thi");
        history3.setHoneyPoint(100);
        history3.setChangeDate(1689932796276L);
        history3.setGiftId(gift2.getId());
        history3.setStudentId(student2.getId());
        history3.setTeacherId(teacher1.getId());
        history3.setId(historyRepository.save(history3).getId());

        History history4 = new History();
        history4.setNameGift("Điểm thi");
        history4.setHoneyPoint(100);
        history4.setChangeDate(1689932796276L);
        history4.setGiftId(gift2.getId());
        history4.setStudentId(student4.getId());
        history4.setTeacherId(teacher3.getId());
        history4.setId(historyRepository.save(history4).getId());

        History history5 = new History();
        history5.setNameGift("Điểm lab");
        history5.setHoneyPoint(100);
        history5.setChangeDate(1689932796276L);
        history5.setGiftId(gift1.getId());
        history5.setStudentId(student5.getId());
        history5.setTeacherId(teacher4.getId());
        history5.setId(historyRepository.save(history5).getId());

        History history6 = new History();
        history6.setNameGift("Điểm thi");
        history6.setHoneyPoint(100);
        history6.setChangeDate(1689932796276L);
        history6.setGiftId(gift2.getId());
        history6.setStudentId(student3.getId());
        history6.setTeacherId(teacher5.getId());
        history6.setId(historyRepository.save(history6).getId());

    }

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(DBGenerator.class);
        ctx.close();
    }

}