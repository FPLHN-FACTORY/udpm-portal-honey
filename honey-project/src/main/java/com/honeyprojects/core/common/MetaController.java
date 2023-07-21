package com.honeyprojects.core.common;

import com.honeyprojects.infrastructure.contant.Constants;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

public class MetaController {

    @GetMapping("/version")
    public String getVersion(Model model){
        model.addAttribute("version", Constants.VERSION);
        return "version";
    }
}
