package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.entity.HistoryDetail;
import com.honeyprojects.infrastructure.contant.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminHistoryRandomDetailRequest {
    private String studentId;
    private String honeyId;
    private String giftId;
    private String chestId;
    private String historyId;
    private Integer quantityGift;
    private Integer honeyPoint;
    private String nameGift;


    public HistoryDetail createHistoryDetail(HistoryDetail historyDetail) {
        historyDetail.setStudentId(this.studentId);
        historyDetail.setPresidentId(null);
        historyDetail.setTeacherId(null);
        historyDetail.setHoneyId(this.honeyId);
        historyDetail.setGiftId(this.giftId);
        historyDetail.setChestId(this.chestId);
        historyDetail.setHistoryId(this.historyId);
        historyDetail.setStatus(Status.HOAT_DONG);
        historyDetail.setQuantityGift(this.quantityGift);
        historyDetail.setHoneyPoint(this.honeyPoint);
        historyDetail.setNameGift(this.nameGift);
        return historyDetail;
    }
}
