package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.entity.GiftDetail;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AdminUpdateGiftDetailRequest {

    private  Integer honey;

    public GiftDetail dtoToEntity(GiftDetail giftDetail){
        giftDetail.setHoney(this.getHoney());
        return giftDetail;
    }
}
