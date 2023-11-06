package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.entity.Gift;
import com.honeyprojects.infrastructure.contant.StatusGift;
import com.honeyprojects.infrastructure.contant.TransactionGift;
import com.honeyprojects.infrastructure.contant.TypeGift;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@Getter
@Setter
public class AdminUpdateGiftRequest {

    private String code;

    @NotBlank(message = "tên không được để trống")
    @Size(min = 0, max = 100)
    private String name;

    private Integer type;

    private Integer status;

    private Integer transactionGift;

    private Integer quantity;

    private Integer limitQuantity;

    private MultipartFile image;

    private String note;

    private Long toDate;

    private Long fromDate;

    private String semesterId;

    public Gift dtoToEntity(Gift gift) throws IOException {
        gift.setCode(this.getCode());
        gift.setName(this.getName());
        if (this.getStatus() != null) {
            gift.setStatus(StatusGift.values()[this.getStatus()]);
        }
        if (this.getType() != null) {
            gift.setType(TypeGift.values()[this.getType()]);
        }
        if (this.getTransactionGift() != null) {
            gift.setTransactionGift(TransactionGift.values()[this.getTransactionGift()]);
        }

        gift.setQuantity(this.getQuantity());

        gift.setLimitQuantity(this.getLimitQuantity());

        if (this.getImage() != null) {
            byte[] imageBytes = this.getImage().getBytes();
            gift.setImage(imageBytes);
        }
        gift.setNote(this.getNote());
        gift.setToDate(this.getToDate());
        gift.setFromDate(this.getFromDate());
        gift.setSemesterId(this.getSemesterId());
        return gift;
    }
}
