package com.honeyprojects.infrastructure.logger.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoggerFunctionMain implements Serializable {

    private String content;

    private String ip;

    private String createDate;

    private String userName;

    private String userActive;

    private String pathFile;

}
