package com.honeyprojects.core.student.model.request.transaction;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ItemTransfer {
    private String id;
    private String idUser;
    private String name;
    private String image;
    private int quantity;
    private Boolean cancel;
    private Integer honey;
    private Boolean lock;
    private Boolean xacNhan;
}
