package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.contant.StatusGift;
import com.honeyprojects.infrastructure.contant.TypeGift;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Random;

@Getter
@Setter
public class AdminCreateGiftRequest extends PageableRequest {

    private String code;

    @NotBlank(message = "tên không được để trống")
    @Size(min = 0, max = 250)
    private String name;

    private TypeGift type;

    private StatusGift status;

    public Gift dtoToEntity(Gift gift) {
        // ramdom code
        Random random = new Random();
        int number = random.nextInt(1000);
        String code = String.format("G%04d",number);

        gift.setCode(code);
        gift.setName(this.getName());
        if(this.getStatus().equals(StatusGift.ACCEPT)){
            gift.setStatus(StatusGift.ACCEPT);
        }else {
            gift.setStatus(StatusGift.FREE);
        }
        return gift;
    }
}
