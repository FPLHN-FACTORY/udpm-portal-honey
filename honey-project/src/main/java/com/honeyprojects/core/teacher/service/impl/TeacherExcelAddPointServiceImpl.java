package com.honeyprojects.core.teacher.service.impl;

import com.honeyprojects.core.admin.model.response.AdminExportCategoryResponse;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.president.model.request.PresidentCreateNotificationDetailAddItemRequest;
import com.honeyprojects.core.president.model.request.PresidentNotificationAddItemRequest;
import com.honeyprojects.core.teacher.model.response.TeacherAddPointDTO;
import com.honeyprojects.core.teacher.model.response.TeacherCategoryResponse;
import com.honeyprojects.core.teacher.model.response.TeacherExcelAddPointBO;
import com.honeyprojects.core.teacher.repository.TeacherCategoryRepository;
import com.honeyprojects.core.teacher.repository.TeacherHistoryRepository;
import com.honeyprojects.core.teacher.repository.TeacherHoneyRepository;
import com.honeyprojects.core.teacher.repository.TeacherNotificationDetailRepository;
import com.honeyprojects.core.teacher.repository.TeacherNotificationRepository;
import com.honeyprojects.core.teacher.service.TeacherAddPointExcelService;
import com.honeyprojects.entity.Category;
import com.honeyprojects.entity.Notification;
import com.honeyprojects.entity.NotificationDetail;
import com.honeyprojects.infrastructure.contant.Constants;
import com.honeyprojects.infrastructure.contant.NotificationDetailType;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.NotificationType;
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
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class TeacherExcelAddPointServiceImpl implements TeacherAddPointExcelService {


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
//        List<TeacherAddPointDTO> dataList = new ArrayList<>();
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
//                TeacherAddPointDTO response = new TeacherAddPointDTO();
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
//            for (TeacherAddPointDTO response : dataList) {
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

    private static final int COLUMN_WIDTH = 25 * 256;

    @Override
    public Boolean exportExcel() {
        String userHome = System.getProperty("user.home");
        String outputPath = userHome + File.separator + "Downloads" + File.separator + "file_template_add_point" + DateUtils.date2yyyyMMddHHMMssNoSlash(new Date()) + ".xlsx";

        Workbook workbook = new XSSFWorkbook();
        // Sheet 1
        Sheet sheet = workbook.createSheet("Danh sách import");

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

        // Sheet 2
        Sheet sheet2 = workbook.createSheet("Danh sách mật ong");
        createSheetContent(sheet2, workbook);

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

    private void createSheetContent(Sheet sheet2, Workbook workbook) {
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

        // Đoạn mã thêm dữ liệu category vào sheet "Trang 2"
        List<AdminExportCategoryResponse> categories = getCategoryData(); // Lấy dữ liệu category từ database hoặc từ nguồn dữ liệu khác

        Row headerRowSheet2 = sheet2.createRow(0);
        String[] headersSheet2 = {"Loại mật ong", "Yêu cầu phê duyệt"};
        int columnCountSheet2 = headersSheet2.length;

        for (int i = 0; i < columnCountSheet2; i++) {
            Cell headerCell = headerRowSheet2.createCell(i);
            headerCell.setCellValue(headersSheet2[i]);
            headerCell.setCellStyle(headerStyle);
            sheet2.setColumnWidth(i, COLUMN_WIDTH); // Thiết lập cỡ cột
        }

        int rowNum = 1;
        for (AdminExportCategoryResponse category : categories) {
            Row row = sheet2.createRow(rowNum++);
            row.createCell(0).setCellValue(category.getName());
            row.createCell(1).setCellValue(category.getStatus().equals("1") ? "Không" : "Có");
        }
    }

    private List<AdminExportCategoryResponse> getCategoryData() {
        return categoryRepository.getCategoryToExport();
    }

    @Override
    public TeacherExcelAddPointBO previewDataImportExcel(MultipartFile file) throws IOException {
        InputStream inputStream = file.getInputStream();
        Workbook workbook = new XSSFWorkbook(inputStream);

        Sheet sheet = workbook.getSheetAt(0);

        List<TeacherAddPointDTO> lstUserImportDTO = StreamSupport.stream(sheet.spliterator(), false)
                .skip(3) // Bỏ qua 4 dòng đầu tiên
                .filter(row -> !ExcelUtils.checkNullLCells(row, 1))
                .map(row -> processRow(row))
                .collect(Collectors.toList());

        Map<Boolean, Long> importStatusCounts = lstUserImportDTO.stream()
                .collect(Collectors.groupingBy(TeacherAddPointDTO::isError, Collectors.counting()));

        // set tổng số bản ghi lỗi, tổng số bản ghi thành công, tổng số bản ghi
        TeacherExcelAddPointBO teacherExcelAddPoinBO = new TeacherExcelAddPointBO();
        teacherExcelAddPoinBO.setResponseList(lstUserImportDTO);
        teacherExcelAddPoinBO.setTotal(Long.parseLong(String.valueOf(lstUserImportDTO.size())));
        teacherExcelAddPoinBO.setTotalError(importStatusCounts.getOrDefault(true, 0L));
        teacherExcelAddPoinBO.setTotalSuccess(importStatusCounts.getOrDefault(false, 0L));
        return teacherExcelAddPoinBO;
    }

    private TeacherAddPointDTO processRow(Row row) {
        TeacherAddPointDTO userDTO = new TeacherAddPointDTO();
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
    public void importExcel(List<TeacherAddPointDTO> lstTeacherAddPointDTO) {
        if (!DataUtils.isNullObject(lstTeacherAddPointDTO)) {
            List<TeacherAddPointDTO> lstImportUser = lstTeacherAddPointDTO.stream()
                    .filter(e -> !e.isError())
                    .collect(Collectors.toList());
            saveImportData(lstImportUser);
        }
    }

    private void saveImportData(List<TeacherAddPointDTO> lstImportUser) {
         String idTeacher = udpmHoney.getIdUser();
        try {
            for (TeacherAddPointDTO userDTO : lstImportUser) {
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
                String emailSimple = userDTO.getUserName() + "@fpt.edu.vn";
                SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserByEmail(emailSimple);
                if (!DataUtils.isNullObject(userDTO.getLstHoney())) {
                    String[] partsHoney = userDTO.getLstHoney().split(", ");
                    Map<String, Integer> honeyMap = new HashMap<>();
                    for (String part : partsHoney) {
                        String[] subParts = part.split(" ", 2);
                        if (subParts.length == 2) {
                            String numberPointStr = subParts[0].trim();
                            String categoryPoint = subParts[1].trim().replace("-", "");
                            Integer numberPoint = Integer.parseInt(numberPointStr);
                            // Lưu trữ số lượng điểm mật ong dựa trên tên loại điểm
                            honeyMap.put(categoryPoint, numberPoint);
                        }
                    }
                    List<TeacherCategoryResponse> categories = categoryRepository.getCategoriesByNames(honeyMap.keySet());
                    for (TeacherCategoryResponse category : categories) {
                        String categoryPoint = category.getName();
                        if (honeyMap.containsKey(categoryPoint)) {
                            //tạo lịch sử detail
//                            stringBuilder.append("Sinh viên " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + " được hệ thống tặng: " + honeyMap.get(categoryPoint) + " " + category.getName() + ", ");
//                            createNotificationDetailHoney(category, notification.getId(), honeyMap.get(categoryPoint));
                        }
                    }
                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
