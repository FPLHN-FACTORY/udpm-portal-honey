package com.honeyprojects.core.common;

import com.honeyprojects.infrastructure.contant.Constants;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MetaController {

    @GetMapping("/version")
    public String getVersion(){
        return "version";
    }
}
