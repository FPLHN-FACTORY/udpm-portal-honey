package com.honeyprojectstool;

import com.honeyprojects.entity.*;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.contant.*;
import com.honeyprojects.infrastructure.contant.TypeGift;
import com.honeyprojects.repository.*;
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

//    @Autowired
//    private ClubRepository clubRepository;
//
//    @Autowired
//    private ClubGiftRepository clubGiftRepository;

    @Autowired
    private AuctionRepository auctionRepository;

    public void run(String... args) throws Exception {

//        Club club = new Club();
//        club.setCode("CLB1");
//        club.setName("Bee SuperHero");
//        club.setStatus(Status.HOAT_DONG);
//        club.setId(clubRepository.save(club).getId());

        Category category1 = new Category();
        category1.setName("GOLD");
        category1.setCategoryStatus(CategoryStatus.ACCEPT);
        category1.setCode("CT1");
        category1.setId(categoryRepository.save(category1).getId());
        category1.setTransactionRights(CategoryTransaction.LIMIT);

        Category category2 = new Category();
        category2.setName("SLIVER");
        category2.setCategoryStatus(CategoryStatus.ACCEPT);
        category2.setCode("CT2");
        category2.setId(categoryRepository.save(category2).getId());
        category2.setTransactionRights(CategoryTransaction.FREE);

        Category category3 = new Category();
        category3.setName("BRONZE");
        category3.setCategoryStatus(CategoryStatus.FREE);
        category3.setCode("CT3");
        category3.setId(categoryRepository.save(category3).getId());
        category3.setTransactionRights(CategoryTransaction.FREE);

        Semester semester = new Semester();
        semester.setCode("SE1");
        semester.setName("Summer 2023");
        semester.setToDate(2007194000000L);
        semester.setFromDate(1681600400000L);
        semester.setId(semesterRepository.save(semester).getId());

        Honey honey1 = new Honey();
        honey1.setHoneyPoint(1000);
        honey1.setStudentId("C4CF21F4-F3E0-490E-B1CC-08DBB743DD7D");
        honey1.setUserSemesterId(semester.getId());
        honey1.setHoneyCategoryId(category1.getId());
        honey1.setId(honeyRepository.save(honey1).getId());

        Honey honey2 = new Honey();
        honey2.setHoneyPoint(2000);
        honey2.setUserSemesterId(semester.getId());
        honey2.setHoneyCategoryId(category2.getId());
        honey2.setStudentId("FCB1D931-CB71-4F12-94D6-08DBB66B2F92");
        honey2.setId(honeyRepository.save(honey2).getId());

        Honey honey3 = new Honey();
        honey3.setHoneyPoint(1000);
        honey3.setStudentId("1243F96A-42BD-49B3-8E45-08DBB2F9FEB4");
        honey3.setUserSemesterId(semester.getId());
        honey3.setHoneyCategoryId(category3.getId());
        honey3.setId(honeyRepository.save(honey3).getId());

        Honey honey4 = new Honey();
        honey4.setHoneyPoint(1000);
        honey4.setStudentId("FCB1D931-CB71-4F12-94D6-08DBB66B2F92");
        honey4.setUserSemesterId(semester.getId());
        honey4.setHoneyCategoryId(category1.getId());
        honey4.setId(honeyRepository.save(honey4).getId());

        Honey honey5 = new Honey();
        honey5.setHoneyPoint(100);
        honey5.setStudentId("C4CF21F4-F3E0-490E-B1CC-08DBB743DD7D");
        honey5.setUserSemesterId(semester.getId());
        honey5.setHoneyCategoryId(category2.getId());
        honey5.setId(honeyRepository.save(honey5).getId());

        Gift gift1 = new Gift();
        gift1.setCode("G1");
        gift1.setName("Điểm lab");
        gift1.setStatus(StatusGift.FREE);
        gift1.setType(TypeGift.QUA_TANG);
        gift1.setId(giftRepository.save(gift1).getId());
//        gift1.setNote("Nguyễn Thúy Hằng lớp IT17326 môn font-end ");

        Gift gift2 = new Gift();
        gift2.setCode("G2");
        gift2.setName("Điểm thi");
        gift2.setStatus(StatusGift.FREE);
        gift2.setType(TypeGift.QUA_TANG);
        gift2.setId(giftRepository.save(gift2).getId());
//        gift2.setNote("Nguyễn Thúy Hằng lớp IT17326 môn font-end ");

        Gift gift3 = new Gift();
        gift3.setCode("G3");
        gift3.setName("Tinh hoa lam");
        gift3.setStatus(StatusGift.ACCEPT);
        gift3.setType(TypeGift.VAT_PHAM);
        gift3.setId(giftRepository.save(gift3).getId());
//        gift3.setNote("Nguyễn Thúy Hằng lớp IT17326 môn font-end ");

        Gift gift4 = new Gift();
        gift4.setCode("G4");
        gift4.setName("Bộ dụng cụ");
        gift4.setStatus(StatusGift.ACCEPT);
        gift4.setType(TypeGift.DUNG_CU);
        gift4.setId(giftRepository.save(gift4).getId());
//        gift4.setNote("Nguyễn Thúy Hằng lớp IT17326 môn font-end ");

        Gift gift5 = new Gift();
        gift5.setCode("G5");
        gift5.setName("Vô cực kiếm");
        gift5.setStatus(StatusGift.ACCEPT);
        gift5.setType(TypeGift.VAT_PHAM);
        gift5.setId(giftRepository.save(gift5).getId());

        Gift gift6 = new Gift();
        gift6.setCode("G6");
        gift6.setName("Diệt khổng lồ");
        gift6.setStatus(StatusGift.ACCEPT);
        gift6.setType(TypeGift.VAT_PHAM);
        gift6.setId(giftRepository.save(gift6).getId());

        Gift gift7 = new Gift();
        gift7.setCode("G7");
        gift7.setName("Cung xanh");
        gift7.setStatus(StatusGift.ACCEPT);
        gift7.setType(TypeGift.VAT_PHAM);
        gift7.setId(giftRepository.save(gift7).getId());

        Gift gift8 = new Gift();
        gift8.setCode("G8");
        gift8.setName("Giáp gai");
        gift8.setStatus(StatusGift.ACCEPT);
        gift8.setType(TypeGift.VAT_PHAM);
        gift8.setId(giftRepository.save(gift8).getId());

        Gift gift9 = new Gift();
        gift9.setCode("G7");
        gift9.setName("Mũ phù thủy");
        gift9.setStatus(StatusGift.ACCEPT);
        gift9.setType(TypeGift.VAT_PHAM);
        gift9.setId(giftRepository.save(gift9).getId());

        Gift gift10 = new Gift();
        gift10.setCode("G7");
        gift10.setName("Nỏ sét");
        gift10.setStatus(StatusGift.ACCEPT);
        gift10.setType(TypeGift.VAT_PHAM);
        gift10.setId(giftRepository.save(gift10).getId());

        UserSemester userSemester1 = new UserSemester();
        userSemester1.setSemesterId(semester.getId());
        userSemester1.setStudentId("C4CF21F4-F3E0-490E-B1CC-08DBB743DD7D");
        userSemester1.setTotalHoney(2000);
        userSemester1.setCategoryId(category1.getId());
        userSemester1.setId(userSemesterRepository.save(userSemester1).getId());

        UserSemester userSemester2 = new UserSemester();
        userSemester2.setSemesterId(semester.getId());
        userSemester2.setStudentId("FCB1D931-CB71-4F12-94D6-08DBB66B2F92");
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
        history1.setTeacherId("1243F96A-42BD-49B3-8E45-08DBB2F9FEB4");
        history1.setId(historyRepository.save(history1).getId());

        History history2 = new History();
        history2.setNameGift("Điểm lab");
        history2.setHoneyPoint(100);
        history2.setChangeDate(1689932796276L);
        history2.setGiftId(gift1.getId());
        history2.setStudentId("C4CF21F4-F3E0-490E-B1CC-08DBB743DD7D");
        history2.setTeacherId("1243F96A-42BD-49B3-8E45-08DBB2F9FEB4");
        history2.setId(historyRepository.save(history2).getId());

        History history3 = new History();
        history3.setNameGift("Điểm thi");
        history3.setHoneyPoint(100);
        history3.setChangeDate(1689932796276L);
        history3.setGiftId(gift2.getId());
        history3.setStudentId("FCB1D931-CB71-4F12-94D6-08DBB66B2F92");
        history3.setTeacherId("1243F96A-42BD-49B3-8E45-08DBB2F9FEB4");
        history3.setId(historyRepository.save(history3).getId());

        History history4 = new History();
        history4.setNameGift("Điểm thi");
        history4.setHoneyPoint(100);
        history4.setChangeDate(1689932796276L);
        history4.setGiftId(gift2.getId());
        history4.setStudentId("C4CF21F4-F3E0-490E-B1CC-08DBB743DD7D");
        history4.setTeacherId("1243F96A-42BD-49B3-8E45-08DBB2F9FEB4");
        history4.setId(historyRepository.save(history4).getId());

        History history5 = new History();
        history5.setNameGift("Điểm lab");
        history5.setHoneyPoint(100);
        history5.setChangeDate(1689932796276L);
        history5.setGiftId(gift1.getId());
        history5.setStudentId("FCB1D931-CB71-4F12-94D6-08DBB66B2F92");
        history5.setTeacherId("1243F96A-42BD-49B3-8E45-08DBB2F9FEB4");
        history5.setId(historyRepository.save(history5).getId());

        History history6 = new History();
        history6.setNameGift("Điểm thi");
        history6.setHoneyPoint(100);
        history6.setChangeDate(1689932796276L);
        history6.setGiftId(gift2.getId());
        history6.setStudentId("C4CF21F4-F3E0-490E-B1CC-08DBB743DD7D");
        history6.setTeacherId("1243F96A-42BD-49B3-8E45-08DBB2F9FEB4");
        history6.setId(historyRepository.save(history6).getId());

        Auction auction = new Auction();
        auction.setName("Phiên đấu giá biển số");
        auction.setHoneyCategoryId(category1.getId());
        auction.setHoney(200L);
        auction.setStatus(Status.HOAT_DONG);
        auction.setId(auctionRepository.save(auction).getId());

        Auction auction1 = new Auction();
        auction1.setName("Phiên đấu giá biển số đầu tiên");
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