package com.honeyprojectstool;

import com.honeyprojects.entity.*;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.contant.TypeCategory;
import com.honeyprojects.repository.*;
import com.honeyprojects.entity.Category;
import com.honeyprojects.entity.Conversion;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.entity.Semester;
import com.honeyprojects.entity.UserAPI;
import com.honeyprojects.entity.UserSemester;
import com.honeyprojects.infrastructure.contant.*;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.contant.TypeCategory;
import com.honeyprojects.infrastructure.contant.TypeGift;
import com.honeyprojects.repository.UserRepositpry;

import com.honeyprojects.repository.CategoryRepository;

import com.honeyprojects.repository.ConversionRepository;
import com.honeyprojects.repository.GiftRepository;
import com.honeyprojects.repository.HistoryRepository;
import com.honeyprojects.repository.HoneyRepository;
import com.honeyprojects.repository.SemesterRepository;
import com.honeyprojects.repository.UserRepositpry;
import com.honeyprojects.repository.UserSemesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.math.BigDecimal;

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
    private SemesterRepository semesterRepository;

    @Autowired
    private UserSemesterRepository userSemesterRepository;

    @Autowired
    private ConversionRepository conversionRepository;

    @Autowired
    private UserRepositpry userRepositpry;

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private AuctionRepository auctionRepository;

    public void run(String... args) throws Exception {

        Category category1 = new Category();
        category1.setName("GOLD");
        category1.setCategoryStatus(CategoryStatus.ACCEPT);
        category1.setCode("CT1");
        category1.setId(categoryRepository.save(category1).getId());

        Category category2 = new Category();
        category2.setName("SLIVER");
        category2.setCategoryStatus(CategoryStatus.ACCEPT);
        category2.setCode("CT2");
        category2.setId(categoryRepository.save(category2).getId());

        Category category3 = new Category();
        category3.setName("BRONZE");
        category3.setCategoryStatus(CategoryStatus.FREE);
        category3.setCode("CT3");
        category3.setId(categoryRepository.save(category3).getId());

        Semester semester = new Semester();
        semester.setCode("SE1");
        semester.setName("Summer 2023");
        semester.setToDate(2007194000000L);
        semester.setFromDate(1681600400000L);
        semester.setId(semesterRepository.save(semester).getId());

        UserAPI userAPI1 = new UserAPI();
        userAPI1.setName("Triệu Văn Tưởng");
        userAPI1.setEmail("tuongtvph26149@fpt.edu.vn");
        userAPI1.setCode("tuongtvph26149");
        userAPI1.setId("C4CF21F4-F3E0-490E-B1CC-08DBB743DD7D".toLowerCase());

        UserAPI userAPI2 = new UserAPI();
        userAPI2.setName("Nguyễn Quốc Huy");
        userAPI2.setEmail("huynqph26772@fpt.edu.vn");
        userAPI2.setCode("huynqph26772");
        userAPI2.setId("FCB1D931-CB71-4F12-94D6-08DBB66B2F92".toLowerCase());

        UserAPI userAPI3 = new UserAPI();
        userAPI3.setName("Nguyễn Thúy Hằng");
        userAPI3.setEmail("hangnt169@fpt.edu.vn");
        userAPI3.setCode("hangnt169");
        userAPI3.setId("1243F96A-42BD-49B3-8E45-08DBB2F9FEB4".toLowerCase());

        Honey honey1 = new Honey();
        honey1.setHoneyPoint(1000);
        honey1.setStudentId(userAPI1.getId());
        honey1.setUserSemesterId(semester.getId());
        honey1.setHoneyCategoryId(category1.getId());
        honey1.setId(honeyRepository.save(honey1).getId());

        Honey honey2 = new Honey();
        honey2.setHoneyPoint(2000);
        honey2.setUserSemesterId(semester.getId());
        honey2.setHoneyCategoryId(category2.getId());
        honey2.setStudentId(userAPI2.getId());
        honey2.setId(honeyRepository.save(honey2).getId());

        Honey honey3 = new Honey();
        honey3.setHoneyPoint(1000);
        honey3.setStudentId(userAPI1.getId());
        honey3.setUserSemesterId(semester.getId());
        honey3.setHoneyCategoryId(category3.getId());
        honey3.setId(honeyRepository.save(honey3).getId());

        Honey honey4 = new Honey();
        honey4.setHoneyPoint(1000);
        honey4.setStudentId(userAPI2.getId());
        honey4.setUserSemesterId(semester.getId());
        honey4.setHoneyCategoryId(category1.getId());
        honey4.setId(honeyRepository.save(honey4).getId());

        Honey honey5 = new Honey();
        honey5.setHoneyPoint(100);
        honey5.setStudentId(userAPI3.getId());
        honey5.setUserSemesterId(semester.getId());
        honey5.setHoneyCategoryId(category2.getId());
        honey5.setId(honeyRepository.save(honey5).getId());

        Gift gift1 = new Gift();
        gift1.setCode("G1");
        gift1.setName("Điểm lab");
        gift1.setStatus(StatusGift.FREE);
        gift1.setType(TypeGift.QUA_TANG);
        gift1.setId(giftRepository.save(gift1).getId());

        Gift gift2 = new Gift();
        gift2.setCode("G2");
        gift2.setName("Điểm thi");
        gift2.setStatus(StatusGift.FREE);
        gift2.setType(TypeGift.QUA_TANG);
        gift2.setId(giftRepository.save(gift2).getId());

        Gift gift3 = new Gift();
        gift3.setCode("G3");
        gift3.setName("Tinh hoa lam");
        gift3.setStatus(StatusGift.ACCEPT);
        gift3.setType(TypeGift.VAT_PHAM);
        gift3.setId(giftRepository.save(gift3).getId());

        Gift gift4 = new Gift();
        gift4.setCode("G4");
        gift4.setName("Bộ dụng cụ");
        gift4.setStatus(StatusGift.ACCEPT);
        gift4.setType(TypeGift.DUNG_CU);
        gift4.setId(giftRepository.save(gift4).getId());

        UserSemester userSemester1 = new UserSemester();
        userSemester1.setSemesterId(semester.getId());
        userSemester1.setStudentId(userAPI1.getId());
        userSemester1.setTotalHoney(2000);
        userSemester1.setCategoryId(category1.getId());
        userSemester1.setId(userSemesterRepository.save(userSemester1).getId());

        UserSemester userSemester2 = new UserSemester();
        userSemester2.setSemesterId(semester.getId());
        userSemester2.setStudentId(userAPI2.getId());
        userSemester2.setTotalHoney(3100);
        userSemester2.setCategoryId(category2.getId());
        userSemester2.setId(userSemesterRepository.save(userSemester2).getId());


        Conversion conversion1 = new Conversion();
        conversion1.setCode("CV1");
        conversion1.setRatio(Double.valueOf(100));
        conversion1.setStatus(Status.HOAT_DONG);
        conversion1.setGiftId(gift1.getId());
        conversion1.setId(conversionRepository.save(conversion1).getId());

        Conversion conversion2 = new Conversion();
        conversion2.setCode("CV2");
        conversion2.setRatio(Double.valueOf(200));
        conversion2.setStatus(Status.HOAT_DONG);
        conversion2.setGiftId(gift2.getId());
        conversion2.setId(conversionRepository.save(conversion2).getId());

        History history1 = new History();
        history1.setNameGift("Điểm lab");
        history1.setHoneyPoint(100);
        history1.setChangeDate(1689932796276L);
        history1.setGiftId(gift1.getId());
        history1.setStudentId(category1.getId());
        history1.setTeacherId(userAPI3.getId());
        history1.setId(historyRepository.save(history1).getId());

        History history2 = new History();
        history2.setNameGift("Điểm lab");
        history2.setHoneyPoint(100);
        history2.setChangeDate(1689932796276L);
        history2.setGiftId(gift1.getId());
        history2.setStudentId(userAPI1.getId());
        history2.setTeacherId(userAPI3.getId());
        history2.setId(historyRepository.save(history2).getId());

        History history3 = new History();
        history3.setNameGift("Điểm thi");
        history3.setHoneyPoint(100);
        history3.setChangeDate(1689932796276L);
        history3.setGiftId(gift2.getId());
        history3.setStudentId(userAPI2.getId());
        history3.setTeacherId(userAPI3.getId());
        history3.setId(historyRepository.save(history3).getId());

        History history4 = new History();
        history4.setNameGift("Điểm thi");
        history4.setHoneyPoint(100);
        history4.setChangeDate(1689932796276L);
        history4.setGiftId(gift2.getId());
        history4.setStudentId(userAPI1.getId());
        history4.setTeacherId(userAPI3.getId());
        history4.setId(historyRepository.save(history4).getId());

        History history5 = new History();
        history5.setNameGift("Điểm lab");
        history5.setHoneyPoint(100);
        history5.setChangeDate(1689932796276L);
        history5.setGiftId(gift1.getId());
        history5.setStudentId(userAPI2.getId());
        history5.setTeacherId(userAPI3.getId());
        history5.setId(historyRepository.save(history5).getId());

        History history6 = new History();
        history6.setNameGift("Điểm thi");
        history6.setHoneyPoint(100);
        history6.setChangeDate(1689932796276L);
        history6.setGiftId(gift2.getId());
        history6.setStudentId(userAPI1.getId());
        history6.setTeacherId(userAPI3.getId());
        history6.setId(historyRepository.save(history6).getId());

        Club club1 = new Club();
        club1.setCode("CLB2");
        club1.setName("Bóng đá");
        club1.setStatus(Status.HOAT_DONG);
        club1.setId(clubRepository.save(club1).getId());

        Auction auction = new Auction();
        auction.setName("Phiên đấu giá biển số");
        auction.setFromDate(1678294800000L);
        auction.setToDate(1685379600000L);
        auction.setStartingPrice(BigDecimal.valueOf(5000));
        auction.setJump(BigDecimal.valueOf(100));
        auction.setHoneyCategoryId(category1.getId());
        auction.setHoney(200L);
        auction.setStatus(Status.HOAT_DONG);
        auction.setId(auctionRepository.save(auction).getId());

        Auction auction1 = new Auction();
        auction1.setName("Phiên đấu giá biển số đầu tiên");
        auction1.setFromDate(1678294800000L);
        auction1.setToDate(1685379600000L);
        auction1.setStartingPrice(BigDecimal.valueOf(5000));
        auction1.setJump(BigDecimal.valueOf(100));
        auction1.setHoneyCategoryId(category2.getId());
        auction1.setHoney(200L);
        auction1.setStatus(Status.KHONG_HOAT_DONG);
        auction1.setId(auctionRepository.save(auction1).getId());
    }

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(DBGenerator.class);
        ctx.close();
    }
}