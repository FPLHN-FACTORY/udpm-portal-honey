package com.honeyprojects.util;

import com.honeyprojects.infrastructure.contant.SessionConstant;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunction;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunctionMain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LoggerUtil {

    @Autowired
    private HttpSession session;

    @Autowired
    private HttpServletRequest httpServletRequest;

    public LoggerFunction genLoggerFunction(LoggerFunction data) {
        data.setCreateDate(ConvertUtils.convertDateNowToString());
        data.setIp(httpServletRequest.getRemoteAddr());
        data.setUserName((String) session.getAttribute(SessionConstant.USER_NAME));
        return data;
    }

    public LoggerFunctionMain genLoggerFunctionMain(LoggerFunctionMain data) {
        data.setCreateDate(ConvertUtils.convertDateNowToString());
        data.setIp(httpServletRequest.getRemoteAddr());
        data.setUserName((String) session.getAttribute(SessionConstant.USER_NAME));
        return data;
    }

    public String getPathFileInProperties(String constant) {
        PropertiesReader po = new PropertiesReader();
        String path = po.getPropertyConfig(constant);
        return path;
    }

}
