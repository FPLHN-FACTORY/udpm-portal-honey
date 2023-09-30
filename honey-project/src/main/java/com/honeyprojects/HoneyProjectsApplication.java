package com.honeyprojects;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class HoneyProjectsApplication {

    public static void main(String[] args) {
        SpringApplication.run(HoneyProjectsApplication.class, args);
    }

}
