package com.honeyprojects.core.admin.model.request;

import com.honeyprojects.core.common.base.PageableRequest;
import com.honeyprojects.infrastructure.contant.Status;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AdminUpdateGiftRequest {
   private String name;

   private Status status;
}
