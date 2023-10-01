package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import com.honeyprojects.entity.Club;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.infrastructure.contant.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Random;

@Getter
@Setter
public class AdminCreateClubRequest extends PageableRequest {
    private String code;

    @NotBlank(message = "tên không được để trống")
    @Size(min = 0, max = 250)
    private String name;

    public Club dtoToEntity(Club club) {
        // ramdom code
        Random random = new Random();
        int number = random.nextInt(1000);
        String code = String.format("C%04d",number);

        club.setCode(code);
        club.setName(this.getName());
        club.setStatus(Status.HOAT_DONG);
        return club;
    }
}
