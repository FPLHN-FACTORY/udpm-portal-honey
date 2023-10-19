package com.honeyprojects.infrastructure.configws;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SessionWebSocketInfo {

    private String jwtToken;

    private String name;

    private String userName;

    private String email;

    private String id;

}
