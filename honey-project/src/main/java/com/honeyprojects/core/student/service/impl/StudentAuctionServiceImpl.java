package com.honeyprojects.core.student.service.impl;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.core.student.model.request.auction.StudentAuctionCreateRequest;
import com.honeyprojects.core.student.model.request.auction.StudentAuctionRoomFilterRequest;
import com.honeyprojects.core.student.model.response.StudentAuctionResponse;
import com.honeyprojects.core.student.repository.StudentArchiveGiftRepository;
import com.honeyprojects.core.student.repository.StudentArchiveRepository;
import com.honeyprojects.core.student.repository.StudentAuctionRepository;
import com.honeyprojects.core.student.repository.StudentGiftRepository;
import com.honeyprojects.core.student.repository.StudentHoneyRepository;
import com.honeyprojects.core.student.service.StudentAuctionService;
import com.honeyprojects.entity.Archive;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.entity.Auction;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.configws.modelmessage.MessageAuction;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.exception.rest.MessageHandlingException;
import com.honeyprojects.infrastructure.exception.rest.RestApiException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.Synchronized;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentAuctionServiceImpl implements StudentAuctionService {

    private final StudentAuctionRepository studentAuctionRepository;

    private final StudentHoneyRepository studentHoneyRepository;

    @Autowired
    private StudentArchiveGiftRepository studentArchiveGiftRepository;

    @Autowired
    private StudentGiftRepository studentGiftRepository;

    @Autowired
    private StudentArchiveRepository studentArchiveRepository;

    @Override
    public Auction getOneByid(String id) {
        var auction = studentAuctionRepository.findById(id);
        if (!auction.isPresent()) {
            throw new RestApiException("Không tìm thấy bàn đấu giá");
        }
        return auction.get();
    }

    @Override
    @Transactional
    @Synchronized
    public Auction add(StudentAuctionCreateRequest request) {
        Optional<Archive> getArchive = studentArchiveRepository.findByStudentId(request.getIdUser());
        ArchiveGift archiveGiftFind = studentArchiveGiftRepository.findByGiftIdAndArchiveId(request.getIdGift(), getArchive.get().getId());
        Optional<Gift> giftFind = studentGiftRepository.findById(request.getIdGift());
        if (archiveGiftFind == null) {
            throw new RestApiException("Không tìm thấy vật phẩm !");
        } else {
            if (archiveGiftFind.getQuantity() != null) {
                if (archiveGiftFind.getQuantity() < request.getQuantity()) {
                    throw new MessageHandlingException("Số lượng \"" + giftFind.get().getName() + "\" đấu giá phải nhỏ hơn hoặc bằng "
                            + archiveGiftFind.getQuantity());
                } else {
                    archiveGiftFind.setQuantity(archiveGiftFind.getQuantity() - request.getQuantity());
                    studentArchiveGiftRepository.save(archiveGiftFind);
                }
            }
            long fromdate = System.currentTimeMillis();
            Auction auction = new Auction();
            auction.setJump(new BigDecimal(request.getJump()));
            auction.setStartingPrice(new BigDecimal(request.getStartingPrice()));
            auction.setFromDate(fromdate);
            auction.setToDate(fromdate + Integer.valueOf(request.getTime()) * 3600 * 1000L);
            auction.setName(request.getName());
            auction.setGiftId(request.getIdGift());
            auction.setHoneyCategoryId(request.getIdCategory());
            auction.setStatus(Status.HOAT_DONG);
            auction.setQuantity(request.getQuantity());
            return studentAuctionRepository.save(auction);
        }
    }

    @Override
    public Auction updateLastPrice(MessageAuction messageAuction) {
        var auction = studentAuctionRepository.findById(messageAuction.getIdAuction());
        if (!auction.isPresent()) {
            throw new RestApiException("Không tìm thấy phiên dấu giá.");
        }
        Honey honey = studentHoneyRepository.findByStudentIdAndHoneyCategoryId(messageAuction.getIdUser(), auction.get().getHoneyCategoryId());
        if (honey == null || honey.getHoneyPoint() < messageAuction.getLastPrice()) {
            throw new MessageHandlingException("Không đủ mật ong.");
        }
        auction.get().setLastPrice(new BigDecimal(messageAuction.getLastPrice()));
        studentAuctionRepository.save(auction.get());
        return auction.get();
    }


    @Override
    public PageableObject<StudentAuctionResponse> findAllAuctionRoom(StudentAuctionRoomFilterRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<StudentAuctionResponse> page = studentAuctionRepository.findAllAuctionRoom(request, pageable);
        return new PageableObject<>(page);
    }
}
