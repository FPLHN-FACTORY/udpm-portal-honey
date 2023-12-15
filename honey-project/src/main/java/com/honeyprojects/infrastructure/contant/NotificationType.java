package com.honeyprojects.infrastructure.contant;

public enum NotificationType {
    ADMIN_CHO_PHE_DUYET, // 0 teacher, president gửi yêu cầu cho admin
    DA_PHE_DUYET_TEACHER, // 1 admin gửi thông báo phê duyệt cho giảng viên
    TU_CHOI_TEACHER, // 2 admin gửi thông báo từ chối cho giảng viên
    DA_PHE_DUYET_PRESIDENT, // 3 admin gửi thông báo phê duyệt cho president
    TU_CHOI_PRESIDENT, // 4 admin gửi thông báo từ chối cho president
    HE_THONG, // 5 admin gửi thông báo cho sinh viên
    TEACHER_CHO_PHE_DUYET, // 6 sinh viên gủi yêu cầu lên cho giảng viên
    TU_CHOI_STUDENT, // 7 giảng viên gửi thông báo từ chối cho sinh viên
    DA_PHE_DUYET_STUDENT, // 8 giảng viên gửi thông báo phê duyệt cho sinh viên

}
