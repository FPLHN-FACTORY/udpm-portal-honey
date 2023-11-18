package com.honeyprojects.infrastructure.configws.modelmessage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class MessageAuction {

    private String idAuction;

    private String idUser;

    private Long lastPrice;
}
