package com.honeyprojects.core.common.base;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UdpmHoneyImpl implements UdpmHoney {

    @Autowired
    private HttpSession httpSession;

    @Override
    public String getIdUser() {
        return (String) httpSession.getAttribute("idUser");
    }

    @Override
    public String getName() {
        return (String) httpSession.getAttribute("name");
    }

    @Override
    public String getEmail() {
        return (String) httpSession.getAttribute("email");
    }

    @Override
    public String getUserName() {
        return (String) httpSession.getAttribute("userName");
    }

    @Override
    public String getPicture() {
        return (String) httpSession.getAttribute("picture");
    }
}
