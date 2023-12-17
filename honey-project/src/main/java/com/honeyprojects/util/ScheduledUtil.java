package com.honeyprojects.util;

import com.honeyprojects.core.student.repository.StudentArchiveGiftRepository;
import com.honeyprojects.core.student.repository.StudentArchiveRepository;
import com.honeyprojects.core.student.repository.StudentGiftRepository;
import com.honeyprojects.entity.Archive;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.entity.Auction;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.infrastructure.contant.ExpiryGift;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import com.honeyprojects.repository.AuctionRepository;
import com.honeyprojects.repository.GiftRepository;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
public class ScheduledUtil {

    @Autowired
    @Qualifier("adGiftRepository")
    private GiftRepository giftRepository;

    @Autowired
    @Qualifier(AuctionRepository.NAME)
    private AuctionRepository auctionRepository;

    @Autowired
    private StudentArchiveGiftRepository studentArchiveGiftRepository;

    @Autowired
    private StudentGiftRepository studentGiftRepository;

    @Autowired
    private StudentArchiveRepository studentArchiveRepository;

    @Scheduled(cron = "0 0 0 * * ?")
    public void myJodSetExpiryGift() {
        List<Gift> listGift = giftRepository.getAllGiftNotInHetHanVinhVienKhongHoatDong();
        List<Gift> listGiftSave = new ArrayList<>();
        listGift.forEach(gift -> {
            if (gift.getFromDate() == null && gift.getToDate() == null) {
                gift.setExpiry(ExpiryGift.VINH_VIEN);
            }
            Long currentTime = DateUtils.truncate(new Date(), Calendar.DATE).getTime();
            if (gift.getFromDate() != null && gift.getToDate() == null) {
                if (currentTime < gift.getFromDate()) {
                    gift.setExpiry(ExpiryGift.CHUA_HOAT_DONG);
                } else {
                    gift.setExpiry(ExpiryGift.VINH_VIEN);
                }
            } else if (gift.getFromDate() == null && gift.getToDate() != null) {
                if (gift.getToDate() < currentTime) {
                    gift.setExpiry(ExpiryGift.HET_HAN);
                } else {
                    gift.setExpiry(ExpiryGift.DANG_HOAT_DONG);
                }
            } else if (gift.getFromDate() != null && gift.getToDate() != null) {
                if (gift.getFromDate() <= currentTime && currentTime <= gift.getToDate()) {
                    gift.setExpiry(ExpiryGift.DANG_HOAT_DONG);
                } else if (gift.getFromDate() > currentTime && currentTime < gift.getToDate()) {
                    gift.setExpiry(ExpiryGift.CHUA_HOAT_DONG);
                } else if (currentTime > gift.getToDate()) {
                    gift.setExpiry(ExpiryGift.HET_HAN);
                }
            }
            listGiftSave.add(gift);
        });
        if (listGift.size() > 0) {
            giftRepository.saveAll(listGiftSave);
        }
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void scheduledCheckAuction() {
        List<Auction> auctions = auctionRepository.findAllAuctionNotActive();
        if (auctions.size() > 0) {
            auctions.forEach(el -> {
                Optional<Archive> getArchive = studentArchiveRepository.findByStudentId(el.getAuctioneerId());
                ArchiveGift archiveGiftFind = studentArchiveGiftRepository.findByGiftIdAndArchiveId(el.getGiftId(), getArchive.get().getId());
                Optional<Gift> giftFind = studentGiftRepository.findById(el.getGiftId());
                if (giftFind != null) {
                    if (archiveGiftFind == null) {
                        archiveGiftFind = new ArchiveGift();
                        archiveGiftFind.setGiftId(el.getGiftId());
                        archiveGiftFind.setArchiveId(getArchive.get().getId());
                        archiveGiftFind.setQuantity(el.getQuantity());
                        archiveGiftFind.setNote("Đấu giá thành công");
                    } else {
                        archiveGiftFind.setQuantity(archiveGiftFind.getQuantity() + el.getQuantity());
                    }
                    studentArchiveGiftRepository.save(archiveGiftFind);
                }
                el.setStatus(Status.KHONG_HOAT_DONG);
            });
        }
        auctionRepository.saveAll(auctions);
    }
}
