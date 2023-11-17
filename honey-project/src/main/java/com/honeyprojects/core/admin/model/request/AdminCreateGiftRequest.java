package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.infrastructure.contant.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Random;

@Getter
@Setter
@ToString
public class AdminCreateGiftRequest extends PageableRequest {

    private String code;

    @NotBlank(message = "tên không được để trống")
    @Size(min = 0, max = 100)
    private String name;

    private Integer type;

    private Integer status;

    private Integer quantity;

    private Integer limitQuantity;

    private Integer transactionGift;

    private MultipartFile image;

    private String note;

    private Long toDate;

    private Long fromDate;

    private String semesterId;

//    public Gift dtoToEntity(Gift gift) throws IOException {
//        Random random = new Random();
//        int number = random.nextInt(10000);
//        String code = String.format("G%05d", number);
//
//        gift.setCode(code);
//        gift.setName(this.getName());
//        if (this.getStatus() != null) {
//            gift.setStatus(StatusGift.values()[this.getStatus()]);
//        }
//        gift.setQuantity(this.getQuantity());
//        gift.setLimitQuantity(this.getLimitQuantity());
//        if (this.getType() != null) {
//            gift.setType(TypeGift.values()[this.getType()]);
//        }
//        if (this.getTransactionGift() != null) {
//            gift.setTransactionGift(TransactionGift.values()[this.getTransactionGift()]);
//        }
//        if (this.getImage() != null) {
//            byte[] imageBytes = this.getImage().getBytes();
//            gift.setImage(imageBytes);
//        }
//        gift.setNote(this.getNote());
//        gift.setToDate(this.getToDate());
//        gift.setFromDate(this.getFromDate());
//        gift.setSemesterId(this.getSemesterId());
//        return gift;
//    }
}
