package com.honeyprojects.core.admin.model.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AdminAddPointStudentPortalEventsBOO {

    private Integer numberHoney;

    private String categoryId;

    private List<User> listUser;

    private String moduleCode;

    private String nameEvent;

    @Setter
    @Getter
    @NoArgsConstructor
    public static class User {

        private String id;

        private String email;

    }

}
