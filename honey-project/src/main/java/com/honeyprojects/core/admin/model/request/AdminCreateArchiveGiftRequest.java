package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.entity.ArchiveGift;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminCreateArchiveGiftRequest {
    private String chestId;
    private String giftId;

    public ArchiveGift createArchivegift(ArchiveGift archiveGift) {
        archiveGift.setArchiveId(null);
        archiveGift.setChestId(this.chestId);
        archiveGift.setGiftId(this.giftId);
        return archiveGift;
    }
}
