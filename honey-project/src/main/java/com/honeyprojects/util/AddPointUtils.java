package com.honeyprojects.util;

import com.honeyprojects.entity.Archive;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import com.honeyprojects.repository.ArchiveGiftRepository;
import com.honeyprojects.repository.ArchiveRepository;
import com.honeyprojects.repository.HoneyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class AddPointUtils {

    @Autowired
    @Qualifier(HoneyRepository.NAME)
    private HoneyRepository honeyRepository;

    @Autowired
    @Qualifier(ArchiveGiftRepository.NAME)
    private ArchiveGiftRepository archiveGiftRepository;

    @Autowired
    @Qualifier(ArchiveRepository.NAME)
    private ArchiveRepository archiveRepository;

    public Honey addHoneyUtils(String studentId, String categoryId, Integer honeyPoint) {
        try {
            Honey honey = null;
            List<Honey> honeyList = honeyRepository.findAllByStudentIdAndHoneyCategoryId(studentId, categoryId);
            if (honeyList.size() == 0) {
                honey = new Honey();
                honey.setStatus(Status.HOAT_DONG);
                honey.setStudentId(studentId);
                honey.setHoneyCategoryId(categoryId);
                honey.setHoneyPoint(honeyPoint);
            } else {
                honey = honeyList.get(0);
                honey.setHoneyPoint(honeyPoint + honey.getHoneyPoint());
            }

            return honeyRepository.save(honey);
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RestApiException("Thêm mật ong thất bại");
        }
    }

    public ArchiveGift addGiftUtils(String studentId, String giftId, Integer giftPoint) {
        try {
            Optional<Archive> optional = archiveRepository.findByStudentId(studentId);
            String archiveId = "";
            if (optional.isEmpty()) {
                Archive archive = new Archive();
                archive.setStudentId(studentId);
                archive.setStatus(Status.HOAT_DONG);
                Archive savedArchive = archiveRepository.save(archive);
                archiveId = savedArchive.getId();
            } else {
                archiveId = optional.get().getId();
            }

            Optional<ArchiveGift> optionalArchiveGift = archiveGiftRepository.findByArchiveIdAndGiftId(archiveId, giftId);
            ArchiveGift archiveGift = null;

            if (optionalArchiveGift.isEmpty()) {
                archiveGift = new ArchiveGift();
                archiveGift.setGiftId(giftId);
                archiveGift.setArchiveId(archiveId);
                archiveGift.setQuantity(giftPoint);
            } else {
                archiveGift = optionalArchiveGift.get();
                archiveGift.setQuantity(giftPoint + optionalArchiveGift.get().getQuantity());
            }

            return archiveGiftRepository.save(archiveGift);
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RestApiException("Thêm mật ong thất bại");
        }
    }

    public ArchiveGift addChestUtils(String studentId, String chestId, Integer giftPoint) {
        try {
            Optional<Archive> optional = archiveRepository.findByStudentId(studentId);
            String archiveId = "";
            if (optional.isEmpty()) {
                Archive archive = new Archive();
                archive.setStudentId(studentId);
                archive.setStatus(Status.HOAT_DONG);
                Archive savedArchive = archiveRepository.save(archive);
                archiveId = savedArchive.getId();
            } else {
                archiveId = optional.get().getId();
            }

            Optional<ArchiveGift> optionalArchiveGift = archiveGiftRepository.findByArchiveIdAndChestId(archiveId, chestId);
            ArchiveGift archiveGift = null;

            if (optionalArchiveGift.isEmpty()) {
                archiveGift = new ArchiveGift();
                archiveGift.setChestId(chestId);
                archiveGift.setArchiveId(archiveId);
                archiveGift.setQuantity(giftPoint);
            } else {
                archiveGift = optionalArchiveGift.get();
                archiveGift.setQuantity(giftPoint + optionalArchiveGift.get().getQuantity());
            }

            return archiveGiftRepository.save(archiveGift);
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RestApiException("Thêm mật ong thất bại");
        }
    }
}
