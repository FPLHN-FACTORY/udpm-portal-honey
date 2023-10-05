package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminClubRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateClubGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateClubRequest;
import com.honeyprojects.core.admin.model.request.AdminGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminUpdateClubRequest;
import com.honeyprojects.core.admin.model.response.AdminClubResponse;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.core.admin.repository.AdClubGiftRepository;
import com.honeyprojects.core.admin.repository.AdClubRepository;
import com.honeyprojects.core.admin.repository.AdGiftRepository;
import com.honeyprojects.core.admin.service.AdminClubService;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Club;
import com.honeyprojects.entity.ClubGift;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.infrastructure.contant.Status;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AdminClubServiceImpl implements AdminClubService {

    @Autowired
    private AdClubRepository adClubRepository;

    @Autowired
    private AdClubGiftRepository adClubGiftRepository;

    @Override
    public PageableObject<AdminClubResponse> getAllCategoryByAdmin(AdminClubRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<AdminClubResponse> pageRes = adClubRepository.getAllClubByAdmin(pageable, request);
        return new PageableObject<>(pageRes);
    }

    @Override
    public PageableObject<AdminGiftResponse> findGiftInClub(AdminGiftRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<AdminGiftResponse> page = adClubRepository.findGiftInClub(pageable, request);
    return new PageableObject<>(page);
    }

    @Override
    public PageableObject<AdminGiftResponse> findGiftNotInClub(AdminGiftRequest request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<AdminGiftResponse> page = adClubRepository.findGiftNotInClub(pageable, request);
        return new PageableObject<>(page);
    }

    @Override
    public Boolean addGiftClub(AdminCreateClubGiftRequest request) {
        List<ClubGift>listIdGifts = new ArrayList<>();
        for(String giftId: request.getGiftId()){
            ClubGift clubGift = new ClubGift();
            clubGift.setGiftId(giftId);
            clubGift.setClubId(request.getClubId());
            listIdGifts.add(clubGift);
        }
        adClubGiftRepository.saveAll(listIdGifts);
        return true;
    }

    @Override
    public List<AdminClubResponse> getAllListGift() {
        return adClubRepository.getAllListResponse();
    }

    @Override
    @Transactional
    public Club addClub(AdminCreateClubRequest request) {
        Club club = request.dtoToEntity(new Club());
        return adClubRepository.save(club);
    }

    @Override
    @Transactional
    public Club updateClub(AdminUpdateClubRequest request, String id) {
        Optional<Club> optional = adClubRepository.findById(id);
        System.out.println(optional.get().getStatus());
        optional.get().setStatus(Status.HOAT_DONG);
        optional.get().setName(request.getName());
        return adClubRepository.save(optional.get());
    }

    @Override
    public Club getOne(String id) {
        return adClubRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public void deleteById(String id) {
        adClubRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Club updateStatusClub(AdminUpdateClubRequest request, String id) {
        Optional<Club> optional = adClubRepository.findById(id);
        optional.get().setStatus(Status.KHONG_HOAT_DONG);
        optional.get().setName(optional.get().getName());
        return adClubRepository.save(optional.get());
    }
}
