package com.honeyprojects.infrastructure.configws.modelmessage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MessageWebSocket {

    private String idUser;

    private String senderName;

    private String email;

    private String message;

    private String avatar;

    private Status status;

    private String date;

    private String idRoom;
}
