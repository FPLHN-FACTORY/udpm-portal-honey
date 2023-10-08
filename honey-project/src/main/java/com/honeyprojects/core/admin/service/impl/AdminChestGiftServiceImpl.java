package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminCreateChestGiftRequest;
import com.honeyprojects.core.admin.model.response.AdminChestGiftResponse;
import com.honeyprojects.core.admin.model.response.AdminGetGiftResponse;
import com.honeyprojects.core.admin.repository.AdChestGiftRepository;
import com.honeyprojects.core.admin.repository.AdChestRepository;
import com.honeyprojects.core.admin.repository.AdGiftRepository;
import com.honeyprojects.core.admin.service.AdminChestGiftService;
import com.honeyprojects.entity.Chest;
import com.honeyprojects.entity.ChestGift;
import com.honeyprojects.entity.Gift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AdminChestGiftServiceImpl implements AdminChestGiftService {

    @Autowired
    private AdChestGiftRepository chestGiftRepository;
    @Autowired
    private AdChestRepository chestRepository;
    @Autowired
    private AdGiftRepository adGiftRepository;

    @Override
    @Transactional
    public void deleteChestGift(String id) {
        List<ChestGift> listChestGift = chestGiftRepository.listChestGift(id);
        chestGiftRepository.deleteAll(listChestGift);
        Chest chest = chestRepository.findById(id).get();
        chestRepository.delete(chest);
    }

    @Override
    public List<AdminChestGiftResponse> getChestGift(String chestId) {
        return chestGiftRepository.getChestGift(chestId);
    }

    @Override
    @Transactional
    public List<ChestGift> addGiftsToChest(AdminCreateChestGiftRequest request) {
        Optional<Chest> chest = chestRepository.findById(request.getChestId());
        if (chest.isPresent()) {
            List<ChestGift> listNew = new ArrayList<>();
            for (String giftId : request.getListGift()) {
                ChestGift chestGift = new ChestGift();
                chestGift.setChestId(chest.get().getId());
                chestGift.setGiftId(giftId);
                listNew.add(chestGift);
            }
            chestGiftRepository.saveAll(listNew);
            return listNew;
        }
        return null;
    }

    @Override
    public List<AdminGetGiftResponse> findGiftNotJoinChest(String idChest) {
        return chestGiftRepository.findGiftNotJoinChest(idChest);
    }

    @Override
    @Transactional
    public List<Gift> deleteGiftInChest(AdminCreateChestGiftRequest request) {
        List<ChestGift> listChestGift = chestGiftRepository.getChestGiftsByChestId(request.getChestId());
        List<String> listRequest = request.getListGift();
        List<Gift> listGiftReturn = new ArrayList<>();
        if (listChestGift.size() == 0 && listRequest.size() == 0) {
            return null;
        }
        List<ChestGift> listDelete = new ArrayList<>();
        listChestGift.forEach(item -> {
            listRequest.forEach(remove -> {
                if (item.getGiftId().equals(remove)) {
                    listDelete.add(item);
                }
            });
        });
        List<Gift> listGift = adGiftRepository.findAll();
        listGift.forEach(gift -> {
            listDelete.forEach(giftRe -> {
                if (giftRe.getGiftId().equals(gift.getId())) {
                    listGiftReturn.add(gift);
                }
            });
        });
        chestGiftRepository.deleteAll(listDelete);
        return listGiftReturn;
    }

    @Override
    public List<ChestGift> createChestGift(AdminCreateChestGiftRequest request) {
        List<String> listGiftId = request.getListGift();
        if (listGiftId.size() != 0) {
            Chest chestNew = new Chest();
            chestRepository.save(chestNew);
            List<ChestGift> chestGiftList = new ArrayList<>();
            for (String giftId : listGiftId) {
                ChestGift chestGift = new ChestGift();
                chestGift.setChestId(chestNew.getId());
                chestGift.setGiftId(giftId);
                chestGiftList.add(chestGift);
            }
            chestGiftRepository.saveAll(chestGiftList);
            return chestGiftList;
        }else {
            return null;
        }
    }
}
