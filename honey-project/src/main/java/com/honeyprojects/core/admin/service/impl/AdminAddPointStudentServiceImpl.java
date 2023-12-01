package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminAddPointStudentLabReportBOO;
import com.honeyprojects.core.admin.model.request.AdminAddPointStudentLabReportRequestt;
import com.honeyprojects.core.admin.model.request.AdminAddPointStudentPortalEventsBO;
import com.honeyprojects.core.admin.model.request.AdminAddPointStudentPortalEventsBOO;
import com.honeyprojects.core.admin.model.request.AdminAddPointStudentPortalEventsRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateNotificationDetailRandomRequest;
import com.honeyprojects.core.admin.model.request.AdminNotificationRandomRequest;
import com.honeyprojects.core.admin.repository.AdHistoryDetailRepository;
import com.honeyprojects.core.admin.repository.AdNotificationRespository;
import com.honeyprojects.core.admin.repository.AdminCategoryRepository;
import com.honeyprojects.core.admin.service.AdminAddPointStudentService;
import com.honeyprojects.core.admin.service.ExportExcelServiceService;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.student.repository.StudentNotificationDetailRepository;
import com.honeyprojects.core.teacher.model.request.TeacherGetPointRequest;
import com.honeyprojects.core.teacher.model.response.TeacherPointResponse;
import com.honeyprojects.core.teacher.repository.TeacherHistoryRepository;
import com.honeyprojects.core.teacher.repository.TeacherHoneyRepository;
import com.honeyprojects.entity.Category;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.HistoryDetail;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.entity.Notification;
import com.honeyprojects.entity.NotificationDetail;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.Constants;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.NotificationDetailType;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.NotificationType;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.util.ConvertRequestApiidentity;
import com.honeyprojects.util.DataUtils;
import com.honeyprojects.util.ExcelUtils;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class AdminAddPointStudentServiceImpl implements AdminAddPointStudentService {

    @Autowired
    private AdminCategoryRepository adminCategoryRepository;

    @Autowired
    private StudentNotificationDetailRepository studentNotificationDetailRepository;

    @Autowired
    private AdNotificationRespository adNotificationRespository;

    @Autowired
    private TeacherHistoryRepository historyRepository;

    @Autowired
    private TeacherHoneyRepository honeyRepository;

    @Autowired
    private AdHistoryDetailRepository historyDetailRepository;

    @Autowired
    private ConvertRequestApiidentity convertRequestApiidentity;

    @Autowired
    private ExportExcelServiceService exportExcelService;

    @Override
    public Boolean addPointToStudentLabReport(AdminAddPointStudentLabReportBOO requestAddPointStudentBO) {

        Category category = adminCategoryRepository.findById(requestAddPointStudentBO.getCategoryId()).orElse(null);

        for (AdminAddPointStudentLabReportRequestt adminAddPointStudentLabReportRequest :
                requestAddPointStudentBO.getListStudent()) {
            if (category.getCategoryStatus().equals(CategoryStatus.FREE)) {
                Notification notification = createNotification(adminAddPointStudentLabReportRequest.getId());
                if (!DataUtils.isNullObject(requestAddPointStudentBO.getListStudent())) {
                    try {
                        Integer honeyPoint = adminAddPointStudentLabReportRequest.getNumberHoney();
                        createNotificationDetailHoney(category, notification.getId(), honeyPoint);
                    } catch (NumberFormatException e) {
                        e.printStackTrace();
                    }
                }
            }
            if (category.getCategoryStatus().equals(CategoryStatus.ACCEPT)) {
                TeacherGetPointRequest getPointRequest = new TeacherGetPointRequest();
                getPointRequest.setStudentId(adminAddPointStudentLabReportRequest.getId());
                getPointRequest.setCategoryId(requestAddPointStudentBO.getCategoryId());
                TeacherPointResponse teacherPointResponse = honeyRepository.getPoint(getPointRequest);

                Long dateNow = Calendar.getInstance().getTimeInMillis();
                History history = new History();
                history.setStudentId(adminAddPointStudentLabReportRequest.getId());
                history.setType(TypeHistory.CONG_DIEM);
                history.setChangeDate(dateNow);
                historyRepository.save(history);

                HistoryDetail historyDetail = new HistoryDetail();
                historyDetail.setHistoryId(history.getId());
                historyDetail.setHoneyPoint(adminAddPointStudentLabReportRequest.getNumberHoney());
                historyDetail.setStudentId(getPointRequest.getStudentId());

                if (teacherPointResponse == null) {
                    Honey honey = new Honey();
                    honey.setStatus(Status.HOAT_DONG);
                    honey.setHoneyPoint(adminAddPointStudentLabReportRequest.getNumberHoney());
                    honey.setStudentId(adminAddPointStudentLabReportRequest.getId());
                    honey.setHoneyCategoryId(requestAddPointStudentBO.getCategoryId());
                    honeyRepository.save(honey);
                    historyDetail.setHoneyId(honey.getId());
                } else {
                    Honey honey = honeyRepository.findByStudentIdAndHoneyCategoryId(getPointRequest.getStudentId(), category.getId());
                    honey.setHoneyPoint(adminAddPointStudentLabReportRequest.getNumberHoney() + honey.getHoneyPoint());
                    honeyRepository.save(honey);
                    historyDetail.setHoneyId(honey.getId());
                }
                historyDetailRepository.save(historyDetail);
            }
        }
        return true;
    }

    @Override
    public AdminAddPointStudentLabReportBOO previewDataLabReportImportExcel(MultipartFile file) throws IOException {
        // Lấy đối tượng InputStream từ tệp Excel được tải lên
        InputStream inputStream = file.getInputStream();

        // Tạo một Workbook (bảng tính) từ InputStream sử dụng thư viện Apache POI
        Workbook workbook = new XSSFWorkbook(inputStream);

        // Lấy bảng tính đầu tiên từ Workbook
        Sheet sheet = workbook.getSheetAt(0);

        // Đọc dữ liệu từ bảng tính và tạo danh sách các đối tượng AdminAddItemDTO
        List<AdminAddPointStudentLabReportRequestt> lstUserImportDTO = StreamSupport.stream(sheet.spliterator(), false)
                .skip(3) // Bỏ qua 4 dòng đầu tiên
                .filter(row -> !ExcelUtils.checkNullLCells(row, 1))
                .map(row -> processRowLabReport(row))
                .collect(Collectors.toList());

        // Nhóm dữ liệu theo trạng thái lỗi (error) và đếm số lượng mỗi trạng thái
        Map<Boolean, Long> importStatusCounts = lstUserImportDTO.stream()
                .collect(Collectors.groupingBy(AdminAddPointStudentLabReportRequestt::isError, Collectors.counting()));

        // Tạo đối tượng AdminAddItemBO để lưu trữ thông tin bản xem trước
        AdminAddPointStudentLabReportBOO presidentAddItemBO = new AdminAddPointStudentLabReportBOO();
        presidentAddItemBO.setListStudent(lstUserImportDTO);
        presidentAddItemBO.setTotal(Long.parseLong(String.valueOf(lstUserImportDTO.size())));
        presidentAddItemBO.setTotalError(importStatusCounts.getOrDefault(true, 0L));
        presidentAddItemBO.setTotalSuccess(importStatusCounts.getOrDefault(false, 0L));

        return presidentAddItemBO;
    }

    @Override
    public void importDataLabReport(AdminAddPointStudentLabReportBOO requestAddPointStudentBO) throws IOException {
        Category category = adminCategoryRepository.findById(requestAddPointStudentBO.getCategoryId()).orElse(null);

        for (AdminAddPointStudentLabReportRequestt adminAddPointStudentLabReportRequest :
                requestAddPointStudentBO.getListStudent()) {
            TeacherGetPointRequest getPointRequest = new TeacherGetPointRequest();
            getPointRequest.setStudentId(adminAddPointStudentLabReportRequest.getId());
            getPointRequest.setCategoryId(requestAddPointStudentBO.getCategoryId());
            TeacherPointResponse teacherPointResponse = honeyRepository.getPoint(getPointRequest);

            Long dateNow = Calendar.getInstance().getTimeInMillis();
            History history = new History();
            history.setStudentId(adminAddPointStudentLabReportRequest.getId());
            history.setType(TypeHistory.CONG_DIEM);
            history.setChangeDate(dateNow);
            historyRepository.save(history);

            HistoryDetail historyDetail = new HistoryDetail();
            historyDetail.setHistoryId(history.getId());
            historyDetail.setHoneyPoint(adminAddPointStudentLabReportRequest.getNumberHoney());
            historyDetail.setStudentId(getPointRequest.getStudentId());

            if (teacherPointResponse == null) {
                Honey honey = new Honey();
                honey.setStatus(Status.HOAT_DONG);
                honey.setHoneyPoint(adminAddPointStudentLabReportRequest.getNumberHoney());
                honey.setStudentId(adminAddPointStudentLabReportRequest.getId());
                honey.setHoneyCategoryId(requestAddPointStudentBO.getCategoryId());
                honeyRepository.save(honey);
                historyDetail.setHoneyId(honey.getId());
            } else {
                Honey honey = honeyRepository.findByStudentIdAndHoneyCategoryId(getPointRequest.getStudentId(), category.getId());
                honey.setHoneyPoint(adminAddPointStudentLabReportRequest.getNumberHoney() + honey.getHoneyPoint());
                honeyRepository.save(honey);
                historyDetail.setHoneyId(honey.getId());
            }
            historyDetailRepository.save(historyDetail);
        }
    }

    private AdminAddPointStudentLabReportRequestt processRowLabReport(Row row) {
        AdminAddPointStudentLabReportRequestt userDTO = new AdminAddPointStudentLabReportRequestt();
        String email = ExcelUtils.getCellString(row.getCell(0));
        String numberHoney = ExcelUtils.getCellString(row.getCell(1));

        // Gọi API để kiểm tra sự tồn tại của người dùng
        SimpleResponse response = convertRequestApiidentity.handleCallApiGetUserByEmail(email);

        // Biến để kiểm tra sự tồn tại của lỗi
        boolean hasError = false;

        // Kiểm tra dữ liệu và xác định trạng thái lỗi (error)
        if (DataUtils.isNullObject(email)) {
            userDTO.setImportMessage("Email không được để trống");
            userDTO.setError(true);
            hasError = true;
        }
        if (DataUtils.isNullObject(response)) {
            userDTO.setImportMessage("Sinh viên không tồn tại");
            userDTO.setError(true);
            hasError = true;
        }
        if (DataUtils.isNullObject(numberHoney)) {
            userDTO.setImportMessage("Không thể để trống số lượng mật ong");
            userDTO.setError(true);
            hasError = true;
        }
        if (Integer.parseInt(numberHoney) < 0) {
            userDTO.setImportMessage("Số lượng mật ong không được nhỏ hơn 1");
            userDTO.setError(true);
            hasError = true;
        }

        // Xác định trạng thái thành công hoặc lỗi và cung cấp thông báo
        if (!hasError) {
            userDTO.setImportMessage("SUCCESS");
            userDTO.setError(false);
        }
        // Đặt các thuộc tính của đối tượng AdminAddItemDTO
        userDTO.setId(response != null ? response.getId() : null);
        userDTO.setNumberHoney(numberHoney != null ? Integer.parseInt(numberHoney) : null);
        userDTO.setEmail(email != null ? email : null);

        return userDTO;
    }

    @Override
    public AdminAddPointStudentPortalEventsBO previewDataPortalEventsImportExcel(MultipartFile file) throws IOException {
        // Lấy đối tượng InputStream từ tệp Excel được tải lên
        InputStream inputStream = file.getInputStream();

        // Tạo một Workbook (bảng tính) từ InputStream sử dụng thư viện Apache POI
        Workbook workbook = new XSSFWorkbook(inputStream);

        // Lấy bảng tính đầu tiên từ Workbook
        Sheet sheet = workbook.getSheetAt(0);

        // Đọc dữ liệu từ bảng tính và tạo danh sách các đối tượng AdminAddItemDTO
        List<AdminAddPointStudentPortalEventsRequest> lstUserImportDTO = StreamSupport.stream(sheet.spliterator(), false)
                .skip(3) // Bỏ qua 4 dòng đầu tiên
                .filter(row -> !ExcelUtils.checkNullLCells(row, 1))
                .map(row -> processPortalEvent(row))
                .collect(Collectors.toList());

        // Nhóm dữ liệu theo trạng thái lỗi (error) và đếm số lượng mỗi trạng thái
        Map<Boolean, Long> importStatusCounts = lstUserImportDTO.stream()
                .collect(Collectors.groupingBy(AdminAddPointStudentPortalEventsRequest::isError, Collectors.counting()));

        // Tạo đối tượng AdminAddItemBO để lưu trữ thông tin bản xem trước
        AdminAddPointStudentPortalEventsBO presidentAddItemBO = new AdminAddPointStudentPortalEventsBO();
        presidentAddItemBO.setLstStudentId(lstUserImportDTO);
        presidentAddItemBO.setTotal(Long.parseLong(String.valueOf(lstUserImportDTO.size())));
        presidentAddItemBO.setTotalError(importStatusCounts.getOrDefault(true, 0L));
        presidentAddItemBO.setTotalSuccess(importStatusCounts.getOrDefault(false, 0L));

        return presidentAddItemBO;
    }

    @Override
    public void importDataPortalEvents(AdminAddPointStudentPortalEventsBO requestAddPointStudentBO) {
        Category category = adminCategoryRepository.findById(requestAddPointStudentBO.getCategoryId()).orElse(null);
        Integer honeyPoint = requestAddPointStudentBO.getNumberHoney();

        for (AdminAddPointStudentPortalEventsRequest studentId :
                requestAddPointStudentBO.getLstStudentId()) {

            TeacherGetPointRequest getPointRequest = new TeacherGetPointRequest();
            getPointRequest.setStudentId(studentId.getId());
            getPointRequest.setCategoryId(requestAddPointStudentBO.getCategoryId());
            TeacherPointResponse teacherPointResponse = honeyRepository.getPoint(getPointRequest);

            Long dateNow = Calendar.getInstance().getTimeInMillis();
            History history = new History();
            history.setStudentId(studentId.getId());
            history.setType(TypeHistory.CONG_DIEM);
            history.setChangeDate(dateNow);
            historyRepository.save(history);

            HistoryDetail historyDetail = new HistoryDetail();
            historyDetail.setHistoryId(history.getId());
            historyDetail.setHoneyPoint(honeyPoint);
            historyDetail.setStudentId(getPointRequest.getStudentId());

            if (teacherPointResponse == null) {
                Honey honey = new Honey();
                honey.setStatus(Status.HOAT_DONG);
                honey.setHoneyPoint(honeyPoint);
                honey.setStudentId(studentId.getId());
                honey.setHoneyCategoryId(requestAddPointStudentBO.getCategoryId());
                honeyRepository.save(honey);
                historyDetail.setHoneyId(honey.getId());
            } else {
                Honey honey = honeyRepository.findByStudentIdAndHoneyCategoryId(getPointRequest.getStudentId(), category.getId());
                honey.setHoneyPoint(requestAddPointStudentBO.getNumberHoney() + honey.getHoneyPoint());
                honeyRepository.save(honey);
                historyDetail.setHoneyId(honey.getId());
            }
            historyDetailRepository.save(historyDetail);
        }
    }

    private AdminAddPointStudentPortalEventsRequest processPortalEvent(Row row) {
        AdminAddPointStudentPortalEventsRequest userDTO = new AdminAddPointStudentPortalEventsRequest();
        String email = ExcelUtils.getCellString(row.getCell(0));

        // Gọi API để kiểm tra sự tồn tại của người dùng
        SimpleResponse response = convertRequestApiidentity.handleCallApiGetUserByEmail(email);

        // Biến để kiểm tra sự tồn tại của lỗi
        boolean hasError = false;

        // Kiểm tra dữ liệu và xác định trạng thái lỗi (error)
        if (DataUtils.isNullObject(email)) {
            userDTO.setImportMessage("Email không được để trống");
            userDTO.setError(true);
            hasError = true;
        }
        if (DataUtils.isNullObject(response)) {
            userDTO.setImportMessage("Sinh viên không tồn tại");
            userDTO.setError(true);
            hasError = true;
        }

        // Xác định trạng thái thành công hoặc lỗi và cung cấp thông báo
        if (!hasError) {
            userDTO.setImportMessage("SUCCESS");
            userDTO.setError(false);
        }
        // Đặt các thuộc tính của đối tượng AdminAddItemDTO
        userDTO.setId(response != null ? response.getId() : null);
        userDTO.setEmail(email != null ? email : null);

        return userDTO;
    }

    @Override
    public Boolean createPointToStudentPortalEvents(AdminAddPointStudentPortalEventsBOO requestAddPointStudentBO) {
        Category category = adminCategoryRepository.findById(requestAddPointStudentBO.getCategoryId()).orElse(null);
        Integer honeyPoint = requestAddPointStudentBO.getNumberHoney();

        for (AdminAddPointStudentPortalEventsBOO.User studentId :
                requestAddPointStudentBO.getListUser()) {
            TeacherGetPointRequest getPointRequest = new TeacherGetPointRequest();
            getPointRequest.setStudentId(studentId.getId());
            getPointRequest.setCategoryId(requestAddPointStudentBO.getCategoryId());
            TeacherPointResponse teacherPointResponse = honeyRepository.getPoint(getPointRequest);
            Long dateNow = Calendar.getInstance().getTimeInMillis();
            History history = new History();
            if (category.getCategoryStatus().equals(CategoryStatus.FREE)) {
                history.setStatus(HoneyStatus.DA_PHE_DUYET);
                Notification notification = createNotification(studentId.getId());
                if (!DataUtils.isNullObject(requestAddPointStudentBO.getListUser())) {
                    try {
                        createNotificationDetailHoney(category, notification.getId(), honeyPoint);
                    } catch (NumberFormatException e) {
                        e.printStackTrace();
                    }
                }
            }
            if (category.getCategoryStatus().equals(CategoryStatus.ACCEPT)) {
            history.setStatus(HoneyStatus.CHO_PHE_DUYET);
            }
            history.setStudentId(studentId.getId());
            history.setType(TypeHistory.MAT_ONG_VA_VAT_PHAM);
            history.setChangeDate(dateNow);
            historyRepository.save(history);

            HistoryDetail historyDetail = new HistoryDetail();
            historyDetail.setHistoryId(history.getId());
            historyDetail.setHoneyPoint(honeyPoint);
            historyDetail.setStudentId(getPointRequest.getStudentId());

            if (teacherPointResponse == null) {
                Honey honey = new Honey();
                honey.setStatus(Status.HOAT_DONG);
                honey.setHoneyPoint(honeyPoint);
                honey.setStudentId(studentId.getId());
                honey.setHoneyCategoryId(requestAddPointStudentBO.getCategoryId());
                honeyRepository.save(honey);
                historyDetail.setHoneyId(honey.getId());
            } else {
                Honey honey = honeyRepository.findByStudentIdAndHoneyCategoryId(getPointRequest.getStudentId(), category.getId());
                honey.setHoneyPoint(requestAddPointStudentBO.getNumberHoney() + honey.getHoneyPoint());
                honeyRepository.save(honey);
                historyDetail.setHoneyId(honey.getId());
            }
            historyDetailRepository.save(historyDetail);
        }
        return true;
    }

    private Notification createNotification(String idStudent) {
        String title = Constants.TITLE_NOTIFICATION_SYSTEM;
        AdminNotificationRandomRequest request = new AdminNotificationRandomRequest(title, idStudent, NotificationType.HE_THONG, NotificationStatus.CHUA_DOC);
        Notification notification = request.createNotification(new Notification());
        return adNotificationRespository.save(notification);
    }

    private NotificationDetail createNotificationDetailHoney(Category category, String idNotification, Integer quantity) {
        Integer roundedQuantity = (int) Math.round(quantity);
        String content = Constants.CONTENT_NOTIFICATION_MODULE_LAB_REPORT + " Mật ong - " + category.getName() + " - Số lượng: " + roundedQuantity;
        AdminCreateNotificationDetailRandomRequest detailRandomRequest = new AdminCreateNotificationDetailRandomRequest(content, category.getId(), idNotification,
                NotificationDetailType.NOTIFICATION_DETAIL_HONEY, Integer.parseInt(String.valueOf(roundedQuantity)));
        NotificationDetail notificationDetail = detailRandomRequest.createNotificationDetail(new NotificationDetail());
        return studentNotificationDetailRepository.save(notificationDetail);
    }

    @Override
    public ByteArrayOutputStream exportExcelPortalEventsClass(HttpServletResponse response) {
        return exportExcelService.export(response, null, null,
                "Định dạng cột email: haipxph26772@fpt.edu.vn", new String[]{"Email"});
    }

    @Override
    public ByteArrayOutputStream exportExcelLabReportClass(HttpServletResponse response) {
        return exportExcelService.export(response, null, null,
                "Định dạng cột email: haipxph26772@fpt.edu.vn - Định dạng cột số lượng mật ong: 29"
                , new String[]{"Email", "Số lượng mật ong"});
    }
}
