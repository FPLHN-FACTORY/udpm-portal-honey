package com.honeyprojects.core.common.base;

import com.honeyprojects.infrastructure.contant.SessionConstant;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UdpmHoneyImpl implements UdpmHoney {

    @Autowired
    private HttpSession httpSession;

    @Override
    public String getIdUser() {
        return (String) httpSession.getAttribute(SessionConstant.ID_USER);
    }

    @Override
    public String getName() {
        return (String) httpSession.getAttribute(SessionConstant.NAME);
    }

    @Override
    public String getEmail() {
        return (String) httpSession.getAttribute(SessionConstant.EMAIL);
    }

    @Override
    public String getUserName() {
        return (String) httpSession.getAttribute(SessionConstant.USER_NAME);
    }

    @Override
    public String getPicture() {
        return (String) httpSession.getAttribute(SessionConstant.PICTURE);
    }
}
