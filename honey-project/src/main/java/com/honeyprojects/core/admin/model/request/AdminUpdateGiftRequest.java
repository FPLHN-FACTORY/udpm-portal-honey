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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Random;


@Getter
@Setter
public class AdminUpdateGiftRequest {

   private String code;

   @NotBlank(message = "tên không được để trống")
   @Size(min = 0, max = 250)
   private String name;

   private Integer type;

   private StatusGift status;

   private Integer quantity;

   private MultipartFile image;

   public Gift dtoToEntity(Gift gift) throws IOException {
      gift.setCode(this.getCode());
      gift.setName(this.getName());
      gift.setStatus(this.getStatus());
      if (this.getType() != null) {
         gift.setType(TypeGift.values()[this.getType()]);
      }

      if (this.getQuantity() != null) {
         gift.setQuantity(this.getQuantity());
      }

      if (this.getImage() != null) {
         byte[] imageBytes = this.getImage().getBytes();
         gift.setImage(imageBytes);
      }

      return gift;
   }
}
