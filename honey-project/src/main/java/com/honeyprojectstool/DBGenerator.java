package com.honeyprojectstool;

import com.honeyprojects.entity.Archive;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.entity.Auction;
import com.honeyprojects.entity.Category;
import com.honeyprojects.entity.Conversion;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.entity.GiftDetail;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.entity.Semester;
import com.honeyprojects.entity.UserSemester;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.CategoryTransaction;
import com.honeyprojects.infrastructure.contant.SemesterStatus;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.contant.StatusGift;
import com.honeyprojects.infrastructure.contant.TypeGift;
import com.honeyprojects.repository.ArchiveGiftRepository;
import com.honeyprojects.repository.ArchiveRepository;
import com.honeyprojects.repository.AuctionRepository;
import com.honeyprojects.repository.CategoryRepository;
import com.honeyprojects.repository.ConversionRepository;
import com.honeyprojects.repository.GiftDetailRepository;
import com.honeyprojects.repository.GiftRepository;
import com.honeyprojects.repository.HistoryRepository;
import com.honeyprojects.repository.HoneyRepository;
import com.honeyprojects.repository.SemesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.math.BigDecimal;
import java.util.Calendar;

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
    private ConversionRepository conversionRepository;


    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private ArchiveRepository archiveRepository;

    @Autowired
    private ArchiveGiftRepository archiveGiftRepository;

    @Autowired
    private GiftDetailRepository giftDetailRepository;


    public void run(String... args) throws Exception {

    }

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(DBGenerator.class);
        ctx.close();
    }

}