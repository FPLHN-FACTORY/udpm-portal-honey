package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

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

    private Long numberDateEnd;

}
