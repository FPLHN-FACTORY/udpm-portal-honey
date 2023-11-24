package com.honeyprojects.core.teacher.service.impl;

import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.president.model.request.PresidentCreateNotificationDetailAddItemRequest;
import com.honeyprojects.core.president.model.request.PresidentNotificationAddItemRequest;
import com.honeyprojects.core.teacher.model.request.TeacherGetPointRequest;
import com.honeyprojects.core.teacher.model.response.TeacherAddPoinExcelResponse;
import com.honeyprojects.core.teacher.model.response.TeacherCategoryResponse;
import com.honeyprojects.core.teacher.model.response.TeacherExcelAddPoinBO;
import com.honeyprojects.core.teacher.model.response.TeacherPointResponse;
import com.honeyprojects.core.teacher.repository.TeacherCategoryRepository;
import com.honeyprojects.core.teacher.repository.TeacherHistoryRepository;
import com.honeyprojects.core.teacher.repository.TeacherHoneyRepository;
import com.honeyprojects.core.teacher.repository.TeacherNotificationDetailRepository;
import com.honeyprojects.core.teacher.repository.TeacherNotificationRepository;
import com.honeyprojects.core.teacher.service.TeacherExcelAddPointService;
import com.honeyprojects.entity.Category;
import com.honeyprojects.entity.History;
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
import com.honeyprojects.util.DateUtils;
import com.honeyprojects.util.ExcelUtils;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class TeacherExcelAddPointServiceImpl implements TeacherExcelAddPointService {


    @Autowired
    private ConvertRequestApiidentity convertRequestApiidentity;

    @Autowired
    private TeacherCategoryRepository categoryRepository;

    @Autowired
    private TeacherHoneyRepository honeyRepository;

    @Autowired
    private TeacherHistoryRepository historyRepository;

    @Autowired
    private TeacherNotificationRepository teacherNotificationRepository;

    @Autowired
    private TeacherNotificationDetailRepository teacherNotificationDetailRepository;
    @Autowired
    private UdpmHoney udpmHoney;

    @Override
    public Boolean importFromExcel(MultipartFile file) {
//        List<TeacherAddPoinExcelResponse> dataList = new ArrayList<>();
//
//        String idTeacher = udpmHoney.getIdUser();
//
//        try (InputStream inputStream = file.getInputStream();
//             Workbook workbook = new XSSFWorkbook(inputStream)) {
//
//            Sheet sheet = workbook.getSheetAt(0);
//            Iterator<Row> rowIterator = sheet.iterator();
//
//            if (rowIterator.hasNext()) {
//                rowIterator.next();
//            }
//
//            while (rowIterator.hasNext()) {
//                Row row = rowIterator.next();
//                TeacherAddPoinExcelResponse response = new TeacherAddPoinExcelResponse();
//
//
//                String name = row.getCell(1).getStringCellValue();
//                String email = row.getCell(2).getStringCellValue();
//                String categoryName = row.getCell(3).getStringCellValue();
//                Integer poin = (int) row.getCell(4).getNumericCellValue();
//                String note = row.getCell(5).getStringCellValue();
//
//                response.setStudentName(name);
//                if (!email.matches("^[^@]+@[^@]+$")) {
//                    continue;
//                } else {
//                    response.setEmail(email);
//                }
//                response.setCategoryName(categoryName);
//                if (poin < 0) {
//                    continue;
//                } else {
//                    response.setHoneyPoint(poin);
//                }
//                response.setNote(note);
//
//                dataList.add(response);
//            }
//            String enumCategoryFREE = String.valueOf(CategoryStatus.FREE.ordinal());
//            String enumCategoryACCEPT = String.valueOf(CategoryStatus.ACCEPT.ordinal());
//
//            for (TeacherAddPoinExcelResponse response : dataList) {
//                SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserByEmail(response.getEmail());
//                Category category = categoryRepository.getCategoryByName(response.getCategoryName());
//                if(category.getCategoryStatus().equals(enumCategoryFREE)){
//                    // gủi cho sinh viên
//                    Notification notification = createNotification(simpleResponse.getId());
//
//                    createNotificationDetailHoney(category, notification.getId(), response.getHoneyPoint());
//                }
//                if(category.getCategoryStatus().equals(enumCategoryACCEPT)){
//                    TeacherGetPointRequest getPointRequest = new TeacherGetPointRequest();
//                    getPointRequest.setStudentId(simpleResponse.getId());
//                    getPointRequest.setCategoryId(category.getId());
//                    Long dateNow = Calendar.getInstance().getTimeInMillis();
//
//                    TeacherPointResponse teacherPointResponse = honeyRepository.getPoint(getPointRequest);
//
//                    History history = new History();
//                    history.setStatus(HoneyStatus.CHO_PHE_DUYET);
//                    history.setTeacherId(idTeacher);
//                    history.setHoneyPoint(response.getHoneyPoint());
//                    history.setNote(response.getNote());
//                    history.setType(TypeHistory.CONG_DIEM);
//                    history.setCreatedAt(dateNow);
//                    if (teacherPointResponse == null) {
//                        Honey honey = new Honey();
//                        honey.setStatus(Status.HOAT_DONG);
//                        honey.setHoneyPoint(0);
//                        honey.setStudentId(simpleResponse.getId());
//                        honey.setHoneyCategoryId(category.getId());
//                        history.setHoneyId(honeyRepository.save(honey).getId());
//                    } else {
//                        Honey honey = honeyRepository.findById(teacherPointResponse.getId()).orElseThrow();
//                        history.setHoneyId(honey.getId());
//                    }
//                    history.setStudentId(simpleResponse.getId());
//                    historyRepository.save(history);
//                }
//
//            }
//            return true;
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
        return false;
    }
    private Notification createNotification(String idStudent) {
        String title = Constants.TITLE_NOTIFICATION_SYSTEM;
        PresidentNotificationAddItemRequest request = new PresidentNotificationAddItemRequest(title, idStudent, NotificationType.HE_THONG, NotificationStatus.CHUA_DOC);
        Notification notification = request.createNotification(new Notification());
        return teacherNotificationRepository.save(notification);
    }

    private NotificationDetail createNotificationDetailHoney(Category categoryResponse, String idNotification, Integer quantity) {
        String content = Constants.CONTENT_NOTIFICATION_SYSTEM + " Mật ong - " + categoryResponse.getName() + " - Số lượng: " + quantity;
        PresidentCreateNotificationDetailAddItemRequest detailRandomRequest = new PresidentCreateNotificationDetailAddItemRequest(content, categoryResponse.getId(), idNotification, NotificationDetailType.NOTIFICATION_DETAIL_HONEY, quantity);
        NotificationDetail notificationDetail = detailRandomRequest.createNotificationDetail(new NotificationDetail());
        return teacherNotificationDetailRepository.save(notificationDetail);
    }

    private static final int COLUMN_WIDTH = 15 * 256;

    @Override
    public Boolean exportExcel() {
        String userHome = System.getProperty("user.home");
        String outputPath = userHome + File.separator + "Downloads" + File.separator + "file_template_add_point" + DateUtils.date2yyyyMMddHHMMssNoSlash(new Date()) + ".xlsx";

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Trang 1");

        CellStyle headerStyle = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setColor(IndexedColors.BLACK.getIndex());
        font.setBold(true);
        font.setFontHeightInPoints((short) 15);
        headerStyle.setFont(font);
        headerStyle.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        headerStyle.setBorderTop(BorderStyle.THIN);
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setBorderLeft(BorderStyle.THIN);
        headerStyle.setBorderRight(BorderStyle.THIN);

        // Dòng thứ 1 - Chữ "Chú ý"
        Row noteRow = sheet.createRow(0);
        Cell noteCell = noteRow.createCell(0);
        noteCell.setCellValue("Chú ý");
        // Tạo một kiểu cho ô "Lưu ý"
        CellStyle noteStyle = workbook.createCellStyle();
        Font noteFont = workbook.createFont();
        noteFont.setBold(true);
        noteFont.setFontHeightInPoints((short) 13);
        noteStyle.setFont(noteFont);
        noteFont.setColor(IndexedColors.RED.getIndex());
        noteStyle.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
        noteStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        noteCell.setCellStyle(noteStyle);
        // Dòng thứ 2 - cách viết đúng định dạng quà tặng
        Row formatGiftRow = sheet.createRow(1);
        Cell formatGiftCell = formatGiftRow.createCell(1);
        formatGiftCell.setCellValue("Định dạng mật ong:  <số lượng> <loại mật ong> VD: " +
                "Cột mật ong: 10 GOLD, ...");

        // Tạo một kiểu cho các ô định dạng
        CellStyle formatStyle = workbook.createCellStyle();
        Font formatFont = workbook.createFont();
        formatFont.setBold(true);
        formatFont.setFontHeightInPoints((short) 13);
        formatFont.setColor(IndexedColors.BLACK.getIndex());
        formatStyle.setFillForegroundColor(IndexedColors.WHITE.getIndex());
//            formatStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        formatStyle.setFont(formatFont);
        formatGiftCell.setCellStyle(formatStyle);
        // Tạo hàng tiêu đề và đặt các tiêu đề cột
        Row headerRow = sheet.createRow(3);
        String[] headers = {"Mã sinh viên", "Mật ong", "Mô tả"};
        int columnCount = headers.length;
        for (int i = 0; i < columnCount; i++) {
            Cell headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headers[i]);
            headerCell.setCellStyle(headerStyle);
            // Thiết lập cỡ cột
            sheet.setColumnWidth(i, COLUMN_WIDTH); // Sử dụng một constant cho cỡ cột
        }
        // Tạo kiểu cho ô tiêu đề trống
        CellStyle emptyHeaderStyle = workbook.createCellStyle();
        Font emptyHeaderFont = workbook.createFont();
        emptyHeaderFont.setColor(IndexedColors.RED.getIndex());
        emptyHeaderStyle.setFont(emptyHeaderFont);

        try {
            FileOutputStream outputStream = new FileOutputStream(outputPath);
            workbook.write(outputStream);
            outputStream.close();
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public TeacherExcelAddPoinBO previewDataImportExcel(MultipartFile file) throws IOException {
        InputStream inputStream = file.getInputStream();
        Workbook workbook = new XSSFWorkbook(inputStream);

        Sheet sheet = workbook.getSheetAt(0);

        List<TeacherAddPoinExcelResponse> lstUserImportDTO = StreamSupport.stream(sheet.spliterator(), false)
                .skip(3) // Bỏ qua 4 dòng đầu tiên
                .filter(row -> !ExcelUtils.checkNullLCells(row, 1))
                .map(row -> processRow(row))
                .collect(Collectors.toList());

        Map<Boolean, Long> importStatusCounts = lstUserImportDTO.stream()
                .collect(Collectors.groupingBy(TeacherAddPoinExcelResponse::isError, Collectors.counting()));

        // set tổng số bản ghi lỗi, tổng số bản ghi thành công, tổng số bản ghi
        TeacherExcelAddPoinBO teacherExcelAddPoinBO = new TeacherExcelAddPoinBO();
        teacherExcelAddPoinBO.setResponseList(lstUserImportDTO);
        teacherExcelAddPoinBO.setTotal(Long.parseLong(String.valueOf(lstUserImportDTO.size())));
        teacherExcelAddPoinBO.setTotalError(importStatusCounts.getOrDefault(true, 0L));
        teacherExcelAddPoinBO.setTotalSuccess(importStatusCounts.getOrDefault(false, 0L));
        this.saveData(teacherExcelAddPoinBO);
        return teacherExcelAddPoinBO;
    }

    private TeacherAddPoinExcelResponse processRow(Row row) {
        TeacherAddPoinExcelResponse userDTO = new TeacherAddPoinExcelResponse();
        String userName = ExcelUtils.getCellString(row.getCell(0));
        String listHoney = ExcelUtils.getCellString(row.getCell(1));
        String note = ExcelUtils.getCellString(row.getCell(2));

        // Tạo địa chỉ email giả định từ tên đăng nhập
        String emailSimple = userName + "@fpt.edu.vn";

        // Gọi API để kiểm tra sự tồn tại của người dùng
        SimpleResponse response = convertRequestApiidentity.handleCallApiGetUserByEmail(emailSimple);

        // Biến để kiểm tra sự tồn tại của lỗi
        boolean hasError = false;

        // Kiểm tra dữ liệu và xác định trạng thái lỗi (error)
        if (DataUtils.isNullObject(userName)) {
            userDTO.setImportMessage("Sinh viên không được để trống");
            userDTO.setError(true);
            hasError = true;
        }
        if (DataUtils.isNullObject(response)) {
            userDTO.setImportMessage("Sinh viên không tồn tại");
            userDTO.setError(true);
            hasError = true;
        }
        if (DataUtils.isNullObject(listHoney)) {
            userDTO.setImportMessage("Không thể để trống mật ong");
            userDTO.setError(true);
            hasError = true;
        }
        String regexFormat = "^(\\d+\\s+[^-,]+)(,\\s*\\d+\\s+[^-,]+)*$";
        int check = 0;

        if (DataUtils.isNullObject(listHoney)) {
            check++;
        } else {
            if (!listHoney.trim().matches(regexFormat)) {
                userDTO.setImportMessage("Định dạng mật ong không hợp lệ");
                userDTO.setError(true);
                check++;
                hasError = true;
            } else {
                // Xử lý danh sách mật ong và kiểm tra
                String[] partsHoney = listHoney.split(", ");
                Map<String, Integer> honeyMap = new HashMap<>();
                Map<String, Integer> nameToNumberMap = new HashMap();
                for (String part : partsHoney) {
                    String[] subParts = part.split(" ", 2);
                    if (subParts.length == 2) {
                        String numberPointStr = subParts[0].trim();
                        String categoryName = subParts[1].trim().replace("-", "");
                        Integer numberPoint = Integer.parseInt(numberPointStr);
                        if (numberPoint < 1) {
                            userDTO.setImportMessage("Số lượng mật ong không được nhỏ hơn 1");
                            userDTO.setError(true);
                            check++;
                            hasError = true;
                            break;
                        }
                        // Lưu trữ số lượng mật ong dựa trên loại mật ong
                        honeyMap.put(categoryName, numberPoint);
                        nameToNumberMap.put(categoryName, numberPoint);
                    }
                }
                System.out.println(honeyMap.keySet());
                List<TeacherCategoryResponse> categories = categoryRepository.getCategoriesByNames(honeyMap.keySet());

                // Kiểm tra sự không tồn tại của mỗi loại mật ong trong honeyMap
                for (String honeyType : honeyMap.keySet()) {
                    boolean found = false;
                    for (TeacherCategoryResponse category : categories) {
                        String categoryName = category.getName().toLowerCase();
                        if (categoryName.equals(honeyType.toLowerCase())) {
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        userDTO.setImportMessage("Loại mật ong " + honeyType + " không tồn tại");
                        userDTO.setError(true);
                        check++;
                        hasError = true;
                    }
                }

            }

//        userDTO.setStudentName(name);
//        userDTO.setNote(note);
//
//        if (DataUtils.isNullObject(email)) {
//            userDTO.setImportMessageStudent("Sinh viên không được để trống với Email: " + email);
//            userDTO.setError(true);
//        } else if (DataUtils.isNullObject(categoryName)) {
//            userDTO.setImportMessageCategory("Loại mật ong không được để trống với Email: " + email);
//            userDTO.setError(true);
//        } else if (DataUtils.isNullObject(poin)) {
//            userDTO.setImportMessagePoint("Mật ong không được để trống");
//            userDTO.setError(true);
//        } else if (!email.matches("^[^@]+@[^@]+$")) {
//            userDTO.setImportMessageStudent("sai định dạng email tại: " + email);
//            userDTO.setError(true);
//        } else {
//            SimpleResponse response = convertRequestApiidentity.handleCallApiGetUserByEmail(email);
//            Category category = categoryRepository.getCategoryByName(categoryName);
//            if (DataUtils.isNullObject(response)) {
//                userDTO.setImportMessageStudent("Sinh viên không tồn tại với Email: " + email);
//                userDTO.setError(true);
//            } else if (category == null) {
//                userDTO.setImportMessageCategory("Loại mật ong không tồn tại với Email: " + email);
//                userDTO.setError(true);
//            } else if (poin < 0) {
//                userDTO.setImportMessagePoint("Mật ong phải lớn hơn 0");
//                userDTO.setError(true);
//            } else {
//                userDTO.setCategoryName(categoryName);
//                userDTO.setImportMessageCategory("SUCCESS");
//                userDTO.setCategoryId(category.getId());
//                userDTO.setEmail(email);
//                userDTO.setStudentId(response.getId());
//                userDTO.setImportMessageStudent("SUCCESS");
//                userDTO.setHoneyPoint(Integer.valueOf(poin.toString()));
//                userDTO.setImportMessagePoint("SUCCESS");
//                userDTO.setError(false);
//            }
//
//        }
        }
        // Xác định trạng thái thành công hoặc lỗi và cung cấp thông báo
        if (!hasError) {
            userDTO.setImportMessage("SUCCESS");
            userDTO.setError(false);
        }
        // Đặt các thuộc tính của đối tượng AdminAddItemDTO
        userDTO.setId(response != null ? response.getId() : null);
        userDTO.setUserName(userName != null ? userName : null);
        userDTO.setLstHoney(listHoney != null ? listHoney : null);
        userDTO.setNote(note != null ? note : null);
        return userDTO;
    }
    @Override
    public TeacherExcelAddPoinBO saveData(TeacherExcelAddPoinBO teacherExcelAddPoinBO) {
//        String idTeacher = udpmHoney.getIdUser();
//        try {
//            for (TeacherAddPoinExcelResponse response : teacherExcelAddPoinBO.getResponseList()) {
//                if (response.getStudentId() == null || response.getCategoryId() == null) {
//                    return null;
//                } else {
//                    TeacherGetPointRequest getPointRequest = new TeacherGetPointRequest();
//                    getPointRequest.setStudentId(response.getStudentId());
//                    getPointRequest.setCategoryId(response.getCategoryId());
//                    Long dateNow = Calendar.getInstance().getTimeInMillis();
//                    TeacherPointResponse teacherPointResponse = honeyRepository.getPoint(getPointRequest);
//
//                    History history = new History();
//                    history.setStatus(HoneyStatus.CHO_PHE_DUYET);
//                    history.setTeacherId(idTeacher);
//                    history.setHoneyPoint(response.getHoneyPoint());
//                    history.setNote(response.getNote());
//                    history.setType(TypeHistory.CONG_DIEM);
//                    history.setCreatedAt(dateNow);
//                    if (teacherPointResponse == null) {
//                        Honey honey = new Honey();
//                        honey.setStatus(Status.HOAT_DONG);
//                        honey.setHoneyPoint(0);
//                        honey.setStudentId(response.getStudentId());
//                        honey.setHoneyCategoryId(response.getCategoryId());
//                        history.setHoneyId(honeyRepository.save(honey).getId());
//                    } else {
//                        Honey honey = honeyRepository.findById(teacherPointResponse.getId()).orElseThrow();
//                        history.setHoneyId(honey.getId());
//                    }
//                    history.setStudentId(response.getStudentId());
//                    historyRepository.save(history);
//                }
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }

        return teacherExcelAddPoinBO;
    }
}
