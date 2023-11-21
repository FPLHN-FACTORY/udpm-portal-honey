package com.honeyprojects.core.student.model.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class StudentUpdateHoneyArchiveRequest {

    private String idUpgrade;

    private List<String>idGift;

    private Integer quantity;

    private Integer originalHoney;

    private Integer destinationHoney;

}
