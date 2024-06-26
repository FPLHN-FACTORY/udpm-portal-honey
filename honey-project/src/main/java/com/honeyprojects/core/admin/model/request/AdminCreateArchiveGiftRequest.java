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
    private String archiveId;
    private String chestId;
    private String giftId;
    private Integer quantityGift;

    public ArchiveGift createArchivegift(ArchiveGift archiveGift) {
        archiveGift.setArchiveId(this.archiveId);
        archiveGift.setChestId(this.chestId);
        archiveGift.setGiftId(this.giftId);
        archiveGift.setQuantity(this.quantityGift);
        return archiveGift;
    }
}
