package com.honeyprojects.infrastructure.configemail;

import ch.qos.logback.classic.pattern.DateConverter;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Setter
@Getter
public class Email {

    private String [] toEmail;
    private String subject;
    private String body;
    private String titleEmail;
}
// demo đây nhé
//
//    private void sendRegistrationEmail(RegistrationPeriod registrationPeriod, List<String> lstUserId) {
//        List<String> lstEmail = censorUserRepository.getLstEmailByLstUserIds(lstUserId);
//        String[] emailArray = lstEmail.toArray(new String[0]);
//
//        String emailContent = getEmailContent(registrationPeriod);
//
//        Runnable emailTask = () -> {
//            emailSender.sendEmail(emailArray, "Portal Article xin thông báo",
//                    "Thông báo về việc viết bài", emailContent);
//        };
//
//        // Sử dụng ExecutorService để quản lý luồng gửi email
//        ExecutorService executorService = Executors.newFixedThreadPool(5); // Điều chỉnh số luồng theo nhu cầu
//        executorService.execute(emailTask);
//        executorService.shutdown();
//    }
//
//    private String getEmailContent(RegistrationPeriod registrationPeriod) {
//        return String.format(
//                "<html><body>" +
//                        "<h3><span>Xin chào!</span> Bạn đã được thêm vào đợt viết bài: <span>%s</span></h3>" +
//                        "<ul>" +
//                        "<li>Ngày bắt đầu đợt: <span style=\"color: red;\"><b>%s</b></span></li>" +
//                        "<li>Ngày kết thúc đợt: <span style=\"color: red;\"><b>%s</b></span></li>" +
//                        "</ul>" +
//                        "<p>Bạn có thể tạo ngay bài viết của bạn ở đây:</p>" +
//                        "http://localhost:3000/user/create-article/" +
//                        "<p>Chúng tôi rất cảm ơn về đóng góp của bạn với bộ môn.</p>" +
//                        "<p>Trân trọng,</p>" +
//                        "<p>- Portal Articles -</p>" +
//                        "</body></html>",
//                registrationPeriod.getName(),
//                DateConverter.convertDateToStringMail(registrationPeriod.getFromDate()),
//                DateConverter.convertDateToStringMail(registrationPeriod.getToDate())
//        );
//    }