package com.honeyprojects.util;

import com.honeyprojects.infrastructure.contant.ConfigurationsConstant;
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
        data.setAuthor(getAuth());
        return data;
    }

    public String getPathFileInProperties(String constant) {
        PropertiesReader po = new PropertiesReader();
        String path = po.getPropertyConfig(constant);
        return path;
    }

    public String getAuth() {
        String api = httpServletRequest.getRequestURI();
        if (api.startsWith("/api/censor")) {
            return "Admin";
        }
        if (api.startsWith("/api/president")) {
            return "Chủ nhiệm câu lập bộ";
        }
        if (api.startsWith("/api/student")) {
            return "Sinh viên";
        }
        if (api.startsWith("/api/teacher")) {
            return "Giảng viên";
        }
        return "";
    }

    public String getPathFileAdmin() {
        String api = httpServletRequest.getRequestURI();
        StringBuilder pathFile = new StringBuilder();
        if (api.startsWith("/api/censor")) {
            pathFile.append(getPathFileInProperties(ConfigurationsConstant.FOLDER_ADMIN));
            if (api.contains("add-point")) {
                pathFile.append(getPathFileInProperties(ConfigurationsConstant.FILE_CONG_MAT_ONG));
            }
            if (api.contains("auction")) {
                pathFile.append(getPathFileInProperties(ConfigurationsConstant.FILE_PHONG_DAU_GIA));
            }
            if (api.contains("category")) {
                pathFile.append(getPathFileInProperties(ConfigurationsConstant.FILE_THE_LOAI));
            }
            if (api.contains("chest-gift")) {
                pathFile.append(getPathFileInProperties(ConfigurationsConstant.FILE_RUONG));
            }
            if (api.contains("chest")) {
                pathFile.append(getPathFileInProperties(ConfigurationsConstant.FILE_RUONG));
            }
            if (api.contains("conversion")) {
//                pathFile.append(getPathFileInProperties());
            }
            if (api.contains("gift-detail")) {
                pathFile.append(getPathFileInProperties(ConfigurationsConstant.FILE_VAT_PHAM));
            }
            if (api.contains("gift")) {
                pathFile.append(getPathFileInProperties(ConfigurationsConstant.FILE_VAT_PHAM));
            }
            if (api.contains("random-add-point")) {
                pathFile.append(getPathFileInProperties(ConfigurationsConstant.FILE_TANG_VAT_PHAM));
            }
            if (api.contains("semester")) {
                pathFile.append(getPathFileInProperties(ConfigurationsConstant.FILE_HOC_KY));
            }
            if (api.contains("upgrade-rate")) {
                pathFile.append(getPathFileInProperties(ConfigurationsConstant.FILE_TI_LE_NANG_CAP));
            }
            if (api.contains("request-manager")) {
                pathFile.append(getPathFileInProperties(ConfigurationsConstant.FILE_YEU_CAU));
            }
        }

        System.out.println("========= pathFile: " + pathFile.toString());
        return pathFile.toString();
    }

    public String getPathFileTeacher() {
        StringBuilder pathFile = new StringBuilder();
        pathFile.append(getPathFileInProperties(ConfigurationsConstant.FOLDER_FILE_TEACHER) + getPathFileInProperties(ConfigurationsConstant.FILE_FILE_TEACHER));
        System.out.println("========= pathFile: " + pathFile.toString());
        return pathFile.toString();
    }
    public String getPathFileClub() {
        StringBuilder pathFile = new StringBuilder();
        pathFile.append(getPathFileInProperties(ConfigurationsConstant.FOLDER_CAU_LAP_BO) + getPathFileInProperties(ConfigurationsConstant.FILE_CAU_LAP_BO));
        System.out.println("========= pathFile: " + pathFile.toString());
        return pathFile.toString();
    }

    public String getPathFileStudent(String studentName) {
        StringBuilder pathFile = new StringBuilder();
        String fileName = ConvertUtils.
                replaceSpacesWithUnderscores(ConvertUtils.
                        replaceSpecialCharacters(ConvertUtils.
                                removeVietnameseChars(studentName)));
        pathFile.append(getPathFileInProperties(ConfigurationsConstant.FOLDER_SINH_VIEN) + fileName + ".csv");
        System.out.println("========= pathFile: " + pathFile.toString());
        return pathFile.toString();
    }

}
