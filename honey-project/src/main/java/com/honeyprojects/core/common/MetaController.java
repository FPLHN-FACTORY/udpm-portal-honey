package com.honeyprojects.core.common;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MetaController {

    @GetMapping("/version")
    public String getVersion() {
        return "Không Bugs !!!";
    }
}
