package com.honeyprojectstool;

import com.honeyprojects.repository.ArchiveGiftRepository;
import com.honeyprojects.repository.ArchiveRepository;
import com.honeyprojects.repository.AuctionRepository;
import com.honeyprojects.repository.CategoryRepository;
import com.honeyprojects.repository.GiftDetailRepository;
import com.honeyprojects.repository.GiftRepository;
import com.honeyprojects.repository.HistoryRepository;
import com.honeyprojects.repository.HoneyRepository;
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
    private CategoryRepository categoryRepository;

    @Autowired
    private HistoryRepository historyRepository;

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