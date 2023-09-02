package com.honeyprojectstool;

import com.honeyprojects.entity.User;
import com.honeyprojects.entity.Conversion;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.entity.Semester;
import com.honeyprojects.entity.Category;
import com.honeyprojects.entity.HoneyCategory;
import com.honeyprojects.entity.UserSemester;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.Constants;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.repository.UserRepositpry;
import com.honeyprojects.repository.ConversionRepository;
import com.honeyprojects.repository.GiftRepository;
import com.honeyprojects.repository.HistoryRepository;
import com.honeyprojects.repository.HoneyRepository;
import com.honeyprojects.repository.SemesterRepository;
import com.honeyprojects.repository.CategoryRepository;
import com.honeyprojects.repository.HoneyCategoryRepository;
import com.honeyprojects.repository.UserSemesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Date;

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
    private CategoryRepository categoryRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private HoneyCategoryRepository honeyCategoryRepository;

    @Autowired
    private SemesterRepository semesterRepository;

    @Autowired
    private UserSemesterRepository userSemesterRepository;

    @Autowired
    private ConversionRepository conversionRepository;

    @Autowired
    private UserRepositpry userRepositpry;


    public void run(String... args) throws Exception{

        Category category1 = new Category();
        category1.setName("GOLD");
        category1.setCategoryStatus(CategoryStatus.ACTIVE);
        category1.setCode("CT1");
        category1.setId(categoryRepository.save(category1).getId());

        Category category2 = new Category();
        category2.setName("SLIVER");
        category2.setCategoryStatus(CategoryStatus.ACTIVE);
        category2.setCode("CT2");
        category2.setId(categoryRepository.save(category2).getId());

        Category category3 = new Category();
        category3.setName("BRONZE");
        category3.setCategoryStatus(CategoryStatus.ACTIVE);
        category3.setCode("CT3");
        category3.setId(categoryRepository.save(category3).getId());

        HoneyCategory honeyCategory1 = new HoneyCategory();
        honeyCategory1.setCategoryId(category1.getId());
        honeyCategory1.setStatus(Status.DA_PHE_DUYET);
        honeyCategory1.setId(honeyCategoryRepository.save(honeyCategory1).getId());

        HoneyCategory honeyCategory2 = new HoneyCategory();
        honeyCategory2.setCategoryId(category2.getId());
        honeyCategory2.setStatus(Status.DA_PHE_DUYET);
        honeyCategory2.setId(honeyCategoryRepository.save(honeyCategory1).getId());

        HoneyCategory honeyCategory3 = new HoneyCategory();
        honeyCategory3.setCategoryId(category3.getId());
        honeyCategory3.setStatus(Status.CHO_PHE_DUYET);
        honeyCategory3.setId(honeyCategoryRepository.save(honeyCategory3).getId());

        Semester semester = new Semester();
        semester.setCode("SE1");
        semester.setName("Summer 2023");
        semester.setToDate(1687194000000L);
        semester.setFromDate(new Date().getTime());
        semester.setId(semesterRepository.save(semester).getId());

        User user1 = new User();
        user1.setName("Nguyễn Quốc Huy");
        user1.setEmail("huynq@gmail.com");
        user1.setCode("TE2");
        user1.setId(userRepositpry.save(user1).getId());

        User user2 = new User();
        user2.setName("Ngọc Anh");
        user2.setEmail("ngocanh@gmail.com");
        user2.setCode("TE1");
        user2.setId(userRepositpry.save(user2).getId());

        User user3 = new User();
        user1.setName("Nguyễn Anh Dũng");
        user1.setEmail("dungna29@gmail.com");
        user1.setCode("TE3");
        user1.setId(userRepositpry.save(user1).getId());

        Honey honey1 = new Honey();
        honey1.setHoneyPoint(1000);
        honey1.setStudentId(user1.getId());
        honey1.setUserSemesterId(semester.getId());
        honey1.setHoneyCategoryId(honeyCategory1.getCategoryId());
        honey1.setId(honeyRepository.save(honey1).getId());

        Honey honey2 = new Honey();
        honey2.setHoneyPoint(2000);
        honey2.setUserSemesterId(semester.getId());
        honey2.setHoneyCategoryId(honeyCategory2.getCategoryId());
        honey2.setStudentId(user2.getId());
        honey2.setId(honeyRepository.save(honey2).getId());

        Honey honey3 = new Honey();
        honey3.setHoneyPoint(1000);
        honey3.setStudentId(user1.getId());
        honey3.setUserSemesterId(semester.getId());
        honey3.setHoneyCategoryId(honeyCategory2.getCategoryId());
        honey3.setId(honeyRepository.save(honey3).getId());

        Honey honey4 = new Honey();
        honey4.setHoneyPoint(1000);
        honey4.setStudentId(user2.getId());
        honey4.setUserSemesterId(semester.getId());
        honey4.setHoneyCategoryId(honeyCategory1.getCategoryId());
        honey4.setId(honeyRepository.save(honey4).getId());

        Honey honey5 = new Honey();
        honey5.setHoneyPoint(100);
        honey5.setStudentId(user2.getId());
        honey5.setUserSemesterId(semester.getId());
        honey5.setHoneyCategoryId(honeyCategory3.getCategoryId());
        honey5.setId(honeyRepository.save(honey5).getId());

        Gift gift1 = new Gift();
        gift1.setCode("G1");
        gift1.setName("Điểm lab");
        gift1.setStatus(Status.CHO_PHE_DUYET);
        gift1.setId(giftRepository.save(gift1).getId());

        Gift gift2 = new Gift();
        gift2.setCode("G2");
        gift2.setName("Điểm thi");
        gift2.setStatus(Status.CHO_PHE_DUYET);
        gift2.setId(giftRepository.save(gift2).getId());

        UserSemester userSemester1 = new UserSemester();
        userSemester1.setSemesterId(semester.getId());
        userSemester1.setStudentId(user1.getId());
        userSemester1.setTotalHoney(2000);
        userSemester1.setId(userSemesterRepository.save(userSemester1).getId());

        UserSemester userSemester2 = new UserSemester();
        userSemester2.setSemesterId(semester.getId());
        userSemester2.setStudentId(user2.getId());
        userSemester2.setTotalHoney(3100);
        userSemester2.setId(userSemesterRepository.save(userSemester2).getId());


        Conversion conversion1 = new Conversion();
        conversion1.setCode("CV1");
        conversion1.setComponentPoint(100);
        conversion1.setHoney_point(1.0);
        conversion1.setStatus(Status.CHO_PHE_DUYET);
        conversion1.setGift_id(gift1.getId());
        conversion1.setId(conversionRepository.save(conversion1).getId());

        Conversion conversion2 = new Conversion();
        conversion2.setCode("CV2");
        conversion2.setComponentPoint(100);
        conversion2.setHoney_point(0.1);
        conversion2.setStatus(Status.DA_PHE_DUYET);
        conversion2.setGift_id(gift2.getId());
        conversion2.setId(conversionRepository.save(conversion2).getId());

        History history1 = new History();
        history1.setNameGift("Điểm lab");
        history1.setHoneyPoint(100);
        history1.setChangeDate(new Date().getTime());
        history1.setCreatedAt(new Date().getTime());
        history1.setGiftId(gift1.getId());
        history1.setStudentId(category1.getId());
        history1.setType(Constants.TYPE_HONEY_HISTORY.GIFT_HISTORY);
        history1.setTeacherId(user3.getId());
        history1.setId(historyRepository.save(history1).getId());

        History history2 = new History();
        history2.setNameGift("Điểm lab");
        history2.setHoneyPoint(100);
        history2.setChangeDate(new Date().getTime());
        history2.setCreatedAt(new Date().getTime());
        history2.setType(Constants.TYPE_HONEY_HISTORY.GIFT_HISTORY);
        history2.setGiftId(gift1.getId());
        history2.setStudentId(user1.getId());
        history2.setTeacherId(user3.getId());
        history2.setId(historyRepository.save(history2).getId());

        History history3 = new History();
        history3.setNameGift("Điểm thi");
        history3.setHoneyPoint(100);
        history3.setChangeDate(1689932796276L);
        history2.setCreatedAt(new Date().getTime());
        history3.setGiftId(gift2.getId());
        history3.setStudentId(user2.getId());
        history3.setTeacherId(user3.getId());
        history3.setType(Constants.TYPE_HONEY_HISTORY.GIFT_HISTORY);
        history3.setId(historyRepository.save(history3).getId());

        History history4 = new History();
        history4.setNameGift("Điểm thi");
        history4.setHoneyPoint(100);
        history4.setChangeDate(1689932796276L);
        history4.setCreatedAt(new Date().getTime());
        history4.setType(Constants.TYPE_HONEY_HISTORY.APPROVED_HISTORY);
        history4.setGiftId(gift2.getId());
        history4.setStudentId(user1.getId());
        history4.setTeacherId(user3.getId());
        history4.setId(historyRepository.save(history4).getId());

        History history5 = new History();
        history5.setNameGift("Điểm lab");
        history5.setHoneyPoint(100);
        history5.setChangeDate(1689932796276L);
        history5.setCreatedAt(new Date().getTime());
        history5.setType(Constants.TYPE_HONEY_HISTORY.APPROVED_HISTORY);
        history5.setGiftId(gift1.getId());
        history5.setStudentId(user2.getId());
        history5.setTeacherId(user3.getId());
        history5.setId(historyRepository.save(history5).getId());

        History history6 = new History();
        history6.setNameGift("Điểm thi");
        history6.setHoneyPoint(100);
        history6.setChangeDate(1689932796276L);
        history6.setCreatedAt(new Date().getTime());
        history6.setType(Constants.TYPE_HONEY_HISTORY.APPROVED_HISTORY);
        history6.setGiftId(gift2.getId());
        history6.setStudentId(user1.getId());
        history6.setTeacherId(user3.getId());
        history6.setId(historyRepository.save(history6).getId());

    }

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(DBGenerator.class);
        ctx.close();
    }

}