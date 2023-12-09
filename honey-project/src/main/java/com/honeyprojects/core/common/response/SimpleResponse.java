package com.honeyprojects.core.common.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimpleResponse {
    private String id;
    private String name;
    private String userName;
    private String email;
    private String picture;
}
