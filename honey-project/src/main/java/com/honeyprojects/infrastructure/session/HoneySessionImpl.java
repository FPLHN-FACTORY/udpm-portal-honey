package com.honeyprojects.infrastructure.session;

import com.honeyprojects.infrastructure.contant.Constants;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class HoneySessionImpl implements HoneySession{
    @Autowired
    private HttpSession session;

    @Override
    public String getToken() {
        return String.valueOf(session.getAttribute(Constants.TOKEN));
    }
}
