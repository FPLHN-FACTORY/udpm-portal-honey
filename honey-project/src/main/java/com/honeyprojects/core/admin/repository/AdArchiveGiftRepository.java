package com.honeyprojects.core.admin.repository;

import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.repository.ArchiveGiftRepository;

import java.util.List;

public interface AdArchiveGiftRepository extends ArchiveGiftRepository {

    List<ArchiveGift> findAllByGiftId(String idGift);
}
