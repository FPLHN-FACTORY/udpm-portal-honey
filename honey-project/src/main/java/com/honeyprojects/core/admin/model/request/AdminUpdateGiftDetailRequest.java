package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.entity.GiftDetail;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AdminUpdateGiftDetailRequest {
    private String giftId;

    private String categoryId;

    private  Integer honey;

    public GiftDetail dtoToEntity(GiftDetail giftDetail){
        giftDetail.setGiftId(this.getGiftId());
        giftDetail.setCategoryId(this.getCategoryId());
        giftDetail.setHoney(this.getHoney());
        return giftDetail;
    }
}
