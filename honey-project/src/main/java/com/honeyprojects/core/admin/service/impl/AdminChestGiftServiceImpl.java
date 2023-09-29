package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminCreateChestGiftRequest;
import com.honeyprojects.core.admin.model.response.AdminChestGiftResponse;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.core.admin.repository.AdChestGiftRepository;
import com.honeyprojects.core.admin.repository.AdChestRepository;
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
//
//    @Override
//    public ChestGift addChestGift(AdminCreateChestGiftRequest request) {
//        ChestGift chestGift = new ChestGift();
//        chestGift.setChestId(request.getChestId());
//        chestGift.setGiftId(request.getGiftId());
//        return chestGiftRepository.save(chestGift);
//    }

    @Override
    @Transactional
    public void deleteChestGift(String id) {
        List<ChestGift> listChestGift = chestGiftRepository.listChestGift(id);
        chestGiftRepository.deleteAll(listChestGift);
        Chest chest = chestRepository.findById(id).get();
        chestRepository.delete(chest);
    }


//    @Override
//    @Transactional
//    public List<ChestGift> saveAllChestGift(List<AdminCreateChestGiftRequest> chestGiftRequests) {
//        List<ChestGift> chestGiftList = new ArrayList<>();
//        for (AdminCreateChestGiftRequest request : chestGiftRequests) {
//            ChestGift chestGift = new ChestGift();
//            chestGift.setGiftId(request.getGiftId());
//            chestGift.setChestId(request.getChestId());
//            chestGiftList.add(chestGift);
//        }
//        return chestGiftRepository.saveAll(chestGiftList);
//    }

    @Override
    public List<AdminChestGiftResponse> getChestGift(String chestId) {
        return chestGiftRepository.getChestGift(chestId);
    }

    @Override
    @Transactional
    public void addGiftsToChest(AdminCreateChestGiftRequest request) {
        Optional<Chest> chest = chestRepository.findById(request.getChestId());
        if (chest.isPresent()) {
            List<ChestGift> listNew = new ArrayList<>();
            for (String giftId : request.getListGift()) {
                ChestGift chestGift = new ChestGift();
                chestGift.setChestId(chest.get().getId());
                chestGift.setGiftId(giftId);
                listNew.add(chestGift);
//                } else {
//                    listChestGift.forEach(item -> {
//                        if (item.getChestId().equals(request.getChestId()) && !item.getGiftId().equals(giftId)) {
//                            ChestGift chestGift = new ChestGift();
//                            chestGift.setChestId(chest.get().getId());
//                            chestGift.setGiftId(giftId);
//                            listNew.add(chestGift);
//                        }else{
//
//                        }
//                    });
//                }
            }
            chestGiftRepository.saveAll(listNew);
        }
    }

    @Override
    public List<AdminGiftResponse> findGiftNotJoinChest(String idChest) {
        return chestGiftRepository.findGiftNotJoinChest(idChest);
    }

    @Override
    @Transactional
    public void deleteGiftInChest(AdminCreateChestGiftRequest request) {
        List<ChestGift> listChestGift = chestGiftRepository.getChestGiftsByChestId(request.getChestId());
        List<String> listRequest = request.getListGift();
        if (listChestGift.size() == 0 && listRequest.size() == 0) {
            return;
        }
        List<ChestGift> listDelete = new ArrayList<>();
        listChestGift.forEach(item -> {
            listRequest.forEach(remove -> {
                if (item.getGiftId().equals(remove)) {
                    listDelete.add(item);
                }
            });
        });
        chestGiftRepository.deleteAll(listDelete);
    }
}
