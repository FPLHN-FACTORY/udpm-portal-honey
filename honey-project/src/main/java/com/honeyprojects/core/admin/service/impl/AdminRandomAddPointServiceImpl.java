package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminCreateHoneyRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateNotificationDetailRandomRequest;
import com.honeyprojects.core.admin.model.request.AdminNotificationRandomRequest;
import com.honeyprojects.core.admin.model.request.AdminRandomPointRequest;
import com.honeyprojects.core.admin.model.response.AdminAddItemBO;
import com.honeyprojects.core.admin.model.response.AdminAddItemDTO;
import com.honeyprojects.core.admin.model.response.AdminAddPointBO;
import com.honeyprojects.core.admin.model.response.AdminAddPointDTO;
import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminChestGiftResponse;
import com.honeyprojects.core.admin.model.response.AdminChestReponse;
import com.honeyprojects.core.admin.model.response.AdminImportCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminImportGiftResponse;
import com.honeyprojects.core.admin.repository.AdArchiveGiftRepository;
import com.honeyprojects.core.admin.repository.AdArchiveRepository;
import com.honeyprojects.core.admin.repository.AdChestGiftRepository;
import com.honeyprojects.core.admin.repository.AdChestRepository;
import com.honeyprojects.core.admin.repository.AdGiftRepository;
import com.honeyprojects.core.admin.repository.AdNotificationRespository;
import com.honeyprojects.core.admin.repository.AdRandomAddPointRepository;
import com.honeyprojects.core.admin.repository.AdminCategoryRepository;
import com.honeyprojects.core.admin.repository.AdminHoneyRepository;
import com.honeyprojects.core.admin.service.AdRandomAddPointService;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.student.repository.StudentNotificationDetailRepository;
import com.honeyprojects.entity.Chest;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.entity.Notification;
import com.honeyprojects.entity.NotificationDetail;
import com.honeyprojects.infrastructure.contant.Constants;
import com.honeyprojects.infrastructure.contant.NotificationDetailType;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.NotificationType;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunction;
import com.honeyprojects.infrastructure.rabbit.RabbitProducer;
import com.honeyprojects.util.ConvertRequestApiidentity;
import com.honeyprojects.util.DataUtils;
import com.honeyprojects.util.DateUtils;
import com.honeyprojects.util.ExcelUtils;
import com.honeyprojects.util.LoggerUtil;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class AdminRandomAddPointServiceImpl implements AdRandomAddPointService {
    @Autowired
    private AdRandomAddPointRepository adRandomAddPointRepository;

    @Autowired
    private AdChestGiftRepository adChestGiftRepository;

    @Autowired
    private AdArchiveGiftRepository adArchiveGiftRepository;

    @Autowired
    private AdminHoneyRepository adminHoneyRepository;

    @Autowired
    private AdGiftRepository adGiftRepository;

    @Autowired
    private AdminCategoryRepository adminCategoryRepository;

    @Autowired
    private AdArchiveRepository adArchiveRepository;

    @Autowired
    private AdNotificationRespository adNotificationRespository;

    @Autowired
    private StudentNotificationDetailRepository studentNotificationDetailRepository;

    @Autowired
    private AdChestRepository chestRepository;

    @Autowired
    private LoggerUtil loggerUtil;

    @Autowired
    private RabbitProducer producer;

    @Autowired
    private ConvertRequestApiidentity convertRequestApiidentity;

    @Override
    public List<AdminCategoryResponse> getAllCategory() {
        return adRandomAddPointRepository.getAllCategory();
    }

    @Override
    public List<SimpleResponse> getListStudent(String emailSearch) {
        if (emailSearch.equals("")) {
            List<Honey> honeyList = adRandomAddPointRepository.findAll();
            if (honeyList.isEmpty()) {
                return null;
            }
            List<String> distinctStudentIds = honeyList.stream().map(Honey::getStudentId).filter(Objects::nonNull).distinct().collect(Collectors.toList());
            List<SimpleResponse> listSimple = convertRequestApiidentity.handleCallApiGetListUserByListId(distinctStudentIds);
            if (listSimple.isEmpty()) {
                return null;
            }
            return listSimple;
        } else {
            List<SimpleResponse> simpleResponseList = new ArrayList<>();
            SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserByEmail(emailSearch + "@fpt.edu.vn");
            simpleResponseList.add(simpleResponse);
            return simpleResponseList;
        }
    }

    @Override
    public Boolean createRandomPoint(AdminRandomPointRequest adminRandomPointRequest) {
        Random random = new Random();
        StringBuilder stringBuilder = new StringBuilder();
        try {
            List<Honey> honeyList = new ArrayList<>();

            // Kiểm tra nếu không có danh sách sinh viên được chỉ định
            if (adminRandomPointRequest.getListStudentPoint().isEmpty()) {
                // Truy xuất danh sách tất cả sinh viên và gọi API để lấy thông tin
                List<String> allStudent = adRandomAddPointRepository.getAllIdStudentInHoney();
                List<SimpleResponse> simpleResponseList = convertRequestApiidentity.handleCallApiGetListUserByListId(allStudent);

                // Duyệt qua danh sách sinh viên và danh mục điểm
                for (SimpleResponse idS : simpleResponseList) {
                    for (String idCategory : adminRandomPointRequest.getListCategoryPoint()) {
                        Optional<Honey> honey = adRandomAddPointRepository.getHoneyByIdStudent(idS.getId(), idCategory);
                        if (honey.isPresent()) {
                            Honey student = honey.get();
                            honeyList.add(student);
                        } else {
                            // Tạo một bản ghi Honey mới nếu không tìm thấy
                            AdminCreateHoneyRequest adminCreateHoneyRequest = new AdminCreateHoneyRequest();
                            adminCreateHoneyRequest.setStudentId(idS.getId());
                            adminCreateHoneyRequest.setCategoryId(idCategory);
                            adminCreateHoneyRequest.setHoneyPoint(0);
                            Honey newHoney = adminCreateHoneyRequest.createHoney(new Honey());
                            honeyList.add(newHoney);
                        }
                    }
                }
            } else {
                // Trường hợp có danh sách sinh viên cụ thể được chỉ định
                for (String student : adminRandomPointRequest.getListStudentPoint()) {
                    for (String idCategory : adminRandomPointRequest.getListCategoryPoint()) {
                        Optional<Honey> honey = adRandomAddPointRepository.getHoneyByIdStudent(student, idCategory);
                        if (honey.isPresent()) {
                            Honey honey1 = honey.get();
                            honeyList.add(honey1);
                        } else {
                            // Tạo một bản ghi Honey mới nếu không tìm thấy
                            AdminCreateHoneyRequest adminCreateHoneyRequest = new AdminCreateHoneyRequest();
                            adminCreateHoneyRequest.setStudentId(student);
                            adminCreateHoneyRequest.setCategoryId(idCategory);
                            adminCreateHoneyRequest.setHoneyPoint(0);
                            Honey newHoney = adminCreateHoneyRequest.createHoney(new Honey());
                            honeyList.add(newHoney);
                        }
                    }
                }
            }

            // Xáo trộn danh sách honeyList
            Collections.shuffle(honeyList);

            // Lặp qua danh sách và cập nhật điểm ngẫu nhiên cho mỗi Honey
            for (int i = 0; i < honeyList.size(); i++) {
                Honey honey = honeyList.get(i);
                Integer randomPoint = random.nextInt(adminRandomPointRequest.getMaxPoint() - adminRandomPointRequest.getMinPoint() + 1) + adminRandomPointRequest.getMinPoint();
                AdminImportCategoryResponse categoryResponse = adminCategoryRepository.getOneCategoryResponse(honey.getHoneyCategoryId());
                if (DataUtils.isNullObject(categoryResponse)) {
                    continue;
                } else {
                    SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserById(honey.getStudentId());
                    Notification notification = createNotification(honey.getStudentId());
                    stringBuilder.append("Sinh viên " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + " được hệ thống tặng: " + randomPoint + " " + categoryResponse.getName());
                    createNotificationDetailHoney(categoryResponse, notification.getId(), randomPoint);
                }
            }
            createLogBug(stringBuilder);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean createRandomItem(AdminRandomPointRequest req) {
        Random random = new Random();
        StringBuilder stringBuilder = new StringBuilder();
        try {
            if (req.getListStudentPoint().isEmpty()) {
                // Truy xuất danh sách tất cả sinh viên và gọi API để lấy thông tin
                List<String> allStudent = adRandomAddPointRepository.getAllIdStudentInHoney();
                List<SimpleResponse> simpleResponseList = convertRequestApiidentity.handleCallApiGetListUserByListId(allStudent);
                // Duyệt qua danh sách sinh viên và tạo vật phẩm ngẫu nhiên cho từng sinh viên
                for (SimpleResponse simple : simpleResponseList) {
                    Optional<Chest> optionalChest = chestRepository.findById(req.getChestId());
                    if (optionalChest.isPresent()) {
                        Chest chest = optionalChest.get();
                        Notification notification = createNotification(simple.getId());
                        stringBuilder.append("Sinh viên " + simple.getName() + " - " + simple.getUserName() + " được hệ thống tặng: 1 rương " + chest.getName() + ", ");
                        createNotificationDetailChest(chest, notification.getId(), 1);
                    } else {
                        continue;
                    }
                }
            } else {
                // Trường hợp có danh sách sinh viên cụ thể được chỉ định
                for (String idStudent : req.getListStudentPoint()) {
                    Optional<Chest> optionalChest = chestRepository.findById(req.getChestId());
                    SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserById(idStudent);
                    if (optionalChest.isPresent()) {
                        Chest chest = optionalChest.get();
                        Notification notification = createNotification(idStudent);
                        stringBuilder.append("Sinh viên " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + " được hệ thống tặng: 1 rương " + chest.getName() + ", ");
                        createNotificationDetailChest(chest, notification.getId(), 1);
                    } else {
                        continue;
                    }
                }
            }
            createLogBug(stringBuilder);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean exportExcel() {
        // Lấy đường dẫn thư mục "Downloads" trong hệ thống
        String userHome = System.getProperty("user.home");
        String outputPath = userHome + File.separator + "Downloads" + File.separator + "file_template_import" + DateUtils.date2yyyyMMddHHMMssNoSlash(new Date()) + ".xlsx";

        // Tạo một workbook (bảng tính) mới cho tệp Excel
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Trang 1");
        // Thiết lập kiểu cho phần tiêu đề của bảng tính
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
        // Tạo hàng tiêu đề và đặt các tiêu đề cột
        Row headerRow = sheet.createRow(0);
        String[] headers = {"STT", "Tên đăng nhập"};
        for (int i = 0; i < headers.length; i++) {
            Cell headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headers[i]);
            headerCell.setCellStyle(headerStyle);
        }
        // Tự động điều chỉnh kích thước cột cho tiêu đề
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }
        try {
            // Lưu workbook vào tệp Excel tại đường dẫn đã xác định
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
    public Boolean previewDataExportExcel() {// màn cộng mật ong
        try {
            // Lấy đường dẫn thư mục "Downloads" trong hệ thống
            String userHome = System.getProperty("user.home");
            String outputPath = userHome + File.separator + "Downloads" + File.separator + "file_template_add_item" + DateUtils.date2yyyyMMddHHMMssNoSlash(new Date()) + ".xlsx";

            // Tạo một workbook (bảng tính) mới cho bản xem trước dữ liệu
            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("Trang 1");
            // Thiết lập kiểu cho phần tiêu đề của bảng tính
            CellStyle headerStyle = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setBold(true);
            font.setFontHeightInPoints((short) 13);
            headerStyle.setFont(font);
            font.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFillForegroundColor(IndexedColors.RED.getIndex());
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
            formatGiftCell.setCellValue("Định dạng vật phẩm và mật ong:  <số lượng> <tên vật phẩm>, ..., <số lượng> <loại mật ong> VD: " +
                    "Cột vật phẩm: 10 Tinh hoa lam, ... - Cột mật ong: 10 GOLD, ...");

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
            String[] headers = {"Mã sinh viên", "Vật phẩm", "Mật ong"};
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
            // Lưu workbook vào tệp Excel tại đường dẫn đã xác định
            try (FileOutputStream outputStream = new FileOutputStream(outputPath)) {
                workbook.write(outputStream);
                return true;
            } catch (IOException e) {
                e.printStackTrace();
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // Đặt một constant cho cỡ cột
    private static final int COLUMN_WIDTH = 15 * 256;

    @Override
    public AdminAddPointBO previewDataRandomExcel(MultipartFile file) throws IOException {
        // Lấy đối tượng InputStream từ tệp Excel được tải lên
        InputStream inputStream = file.getInputStream();
        // Tạo một Workbook (bảng tính) từ InputStream sử dụng thư viện Apache POI
        Workbook workbook = new XSSFWorkbook(inputStream);
        // Lấy bảng tính đầu tiên từ Workbook
        Sheet sheet = workbook.getSheetAt(0);
        // Đọc dữ liệu từ bảng tính và tạo danh sách các đối tượng AdminAddItemDTO
        List<AdminAddPointDTO> lstUserImportDTO = StreamSupport.stream(sheet.spliterator(), false)
                .skip(1) // Bỏ qua 2 dòng đầu tiên
                .filter(row -> !ExcelUtils.checkNullLCells(row, 1))
                .map(row -> processRowPoint(row))
                .collect(Collectors.toList());
        // Nhóm dữ liệu theo trạng thái lỗi (error) và đếm số lượng mỗi trạng thái
        Map<Boolean, Long> importStatusCounts = lstUserImportDTO.stream()
                .collect(Collectors.groupingBy(AdminAddPointDTO::isError, Collectors.counting()));
        // Tạo đối tượng AdminAddItemBO để lưu trữ thông tin bản xem trước
        AdminAddPointBO adminAddPointBO = new AdminAddPointBO();
        adminAddPointBO.setLstAdminAddPointDTO(lstUserImportDTO);
        adminAddPointBO.setTotal(Long.parseLong(String.valueOf(lstUserImportDTO.size())));
        adminAddPointBO.setTotalError(importStatusCounts.getOrDefault(true, 0L));
        adminAddPointBO.setTotalSuccess(importStatusCounts.getOrDefault(false, 0L));
        return adminAddPointBO;
    }

    @Override
    public AdminAddItemBO previewDataImportExcel(MultipartFile file) throws IOException {
        // Lấy đối tượng InputStream từ tệp Excel được tải lên
        InputStream inputStream = file.getInputStream();
        // Tạo một Workbook (bảng tính) từ InputStream sử dụng thư viện Apache POI
        Workbook workbook = new XSSFWorkbook(inputStream);
        // Lấy bảng tính đầu tiên từ Workbook
        Sheet sheet = workbook.getSheetAt(0);
        // Đọc dữ liệu từ bảng tính và tạo danh sách các đối tượng AdminAddItemDTO
        List<AdminAddItemDTO> lstUserImportDTO = StreamSupport.stream(sheet.spliterator(), false)
                .skip(3) // Bỏ qua 4 dòng đầu tiên
                .filter(row -> !ExcelUtils.checkNullLCells(row, 1))
                .map(row -> processRow(row))
                .collect(Collectors.toList());
        // Nhóm dữ liệu theo trạng thái lỗi (error) và đếm số lượng mỗi trạng thái
        Map<Boolean, Long> importStatusCounts = lstUserImportDTO.stream()
                .collect(Collectors.groupingBy(AdminAddItemDTO::isError, Collectors.counting()));
        // Tạo đối tượng AdminAddItemBO để lưu trữ thông tin bản xem trước
        AdminAddItemBO adminAddItemBO = new AdminAddItemBO();
        adminAddItemBO.setLstAdminAddItemDTO(lstUserImportDTO);
        adminAddItemBO.setTotal(Long.parseLong(String.valueOf(lstUserImportDTO.size())));
        adminAddItemBO.setTotalError(importStatusCounts.getOrDefault(true, 0L));
        adminAddItemBO.setTotalSuccess(importStatusCounts.getOrDefault(false, 0L));
        return adminAddItemBO;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void importData(List<AdminAddItemDTO> lstAddItemDTO) throws IOException {
        if (!DataUtils.isNullObject(lstAddItemDTO)) {
            List<AdminAddItemDTO> lstImportUser = lstAddItemDTO.stream()
                    .filter(e -> !e.isError())
                    .collect(Collectors.toList());
            saveImportData(lstImportUser);
        }
    }

    private void saveImportData(List<AdminAddItemDTO> lstImportUser) throws IOException {
        StringBuilder stringBuilder = new StringBuilder();
        for (AdminAddItemDTO userDTO : lstImportUser) {
            // Duyệt qua danh sách đối tượng AdminAddItemDTO đã được kiểm tra lỗi
            if (userDTO.isError()) {
                // Nếu đối tượng có lỗi, bỏ qua và tiếp tục với đối tượng tiếp theo trong danh sách
                continue;
            }

            // Gọi API để lấy thông tin người dùng bằng địa chỉ email
            String emailSimple = userDTO.getUserName() + "@fpt.edu.vn";
            SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserByEmail(emailSimple);
            Notification notification = createNotification(simpleResponse.getId());

            // Xử lý vật phẩm (gift)
            if (!DataUtils.isNullObject(userDTO.getLstGift())) {
                String[] partsGift = userDTO.getLstGift().split(", ");
                Map<String, Integer> giftMap = new HashMap<>();

                for (String part : partsGift) {
                    String[] subParts = part.split(" ", 2);
                    if (subParts.length == 2) {
                        String numberItemStr = subParts[0];
                        String nameItem = subParts[1];
                        Integer numberItem = Integer.parseInt(numberItemStr);
                        // Lưu trữ số lượng quà dựa trên tên quà
                        giftMap.put(nameItem, numberItem);
                    }
                }
                List<AdminImportGiftResponse> gifts = adRandomAddPointRepository.getGiftsByNames(giftMap.keySet());

                for (AdminImportGiftResponse gift : gifts) {
                    String nameItem = gift.getName();
                    stringBuilder.append("Sinh viên " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + " được hệ thống tặng: " + giftMap.get(nameItem) + " " + gift.getName() + ", ");
                    createNotificationDetailItem(gift, notification.getId(), giftMap.get(nameItem));
                }
            }

            // Xử lý điểm mật ong (honey)
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
                List<AdminImportCategoryResponse> categories = adRandomAddPointRepository.getCategoriesByNames(honeyMap.keySet());
                for (AdminImportCategoryResponse category : categories) {
                    String categoryPoint = category.getName();
                    if (honeyMap.containsKey(categoryPoint)) {
                        stringBuilder.append("Sinh viên " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + " được hệ thống tặng: " + honeyMap.get(categoryPoint) + " " + category.getName() + ", ");
                        createNotificationDetailHoney(category, notification.getId(), honeyMap.get(categoryPoint));
                    }
                }
            }
        }
        createLogBug(stringBuilder);
    }


    private Notification createNotification(String idStudent) {
        String title = Constants.TITLE_NOTIFICATION_SYSTEM;
        AdminNotificationRandomRequest request = new AdminNotificationRandomRequest(title, idStudent, NotificationType.HE_THONG, NotificationStatus.CHUA_DOC);
        Notification notification = request.createNotification(new Notification());
        return adNotificationRespository.save(notification);
    }

    private NotificationDetail createNotificationDetailHoney(AdminImportCategoryResponse category, String idNotification, Integer quantity) {
        String content = Constants.CONTENT_NOTIFICATION_SYSTEM + " Mật ong - " + category.getName() + " - Số lượng: " + quantity;
        AdminCreateNotificationDetailRandomRequest detailRandomRequest = new AdminCreateNotificationDetailRandomRequest(content, category.getId(), idNotification, NotificationDetailType.NOTIFICATION_DETAIL_HONEY, quantity);
        NotificationDetail notificationDetail = detailRandomRequest.createNotificationDetail(new NotificationDetail());
        return studentNotificationDetailRepository.save(notificationDetail);
    }

    private NotificationDetail createNotificationDetailItem(AdminImportGiftResponse gift, String idNotification, Integer quantity) {
        String content = Constants.CONTENT_NOTIFICATION_SYSTEM + "Vật phẩm - " + gift.getName() + " - số lượng: " + quantity;
        AdminCreateNotificationDetailRandomRequest detailRandomRequest = new AdminCreateNotificationDetailRandomRequest(content, gift.getId(), idNotification, NotificationDetailType.NOTIFICATION_DETAIL_GIFT, quantity);
        NotificationDetail notificationDetail = detailRandomRequest.createNotificationDetail(new NotificationDetail());
        return studentNotificationDetailRepository.save(notificationDetail);
    }

    private NotificationDetail createNotificationDetailChest(Chest chest, String idNotification, Integer quantity) {
        String content = Constants.CONTENT_NOTIFICATION_SYSTEM + "Rương đồ: " + chest.getName() + " - số lượng: " + quantity;
        AdminCreateNotificationDetailRandomRequest detailRandomRequest = new AdminCreateNotificationDetailRandomRequest(content, chest.getId(), idNotification, NotificationDetailType.NOTIFICATION_DETAIL_CHEST, quantity);
        NotificationDetail notificationDetail = detailRandomRequest.createNotificationDetail(new NotificationDetail());
        return studentNotificationDetailRepository.save(notificationDetail);
    }

    private LoggerFunction createLogBug(StringBuilder stringBuilder) {
        LoggerFunction loggerObject = new LoggerFunction();
        loggerObject.setPathFile(loggerUtil.getPathFileAdmin());
        loggerObject.setContent(stringBuilder.toString());
        try {
            producer.sendLogMessageFunction(loggerUtil.genLoggerFunction(loggerObject));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return loggerObject;
    }

    private AdminAddPointDTO processRowPoint(Row row) {
        AdminAddPointDTO userDTO = new AdminAddPointDTO();
        String userName = ExcelUtils.getCellString(row.getCell(1));
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
        // Xác định trạng thái thành công hoặc lỗi và cung cấp thông báo
        if (!hasError) {
            userDTO.setImportMessage("SUCCESS");
            userDTO.setError(false);
        }
        // Đặt các thuộc tính của đối tượng AdminAddItemDTO
        userDTO.setId(response != null ? response.getId() : null);
        userDTO.setUserName(userName != null ? userName : null);
        userDTO.setEmail(response != null ? response.getEmail() : null);
        return userDTO;
    }

    private AdminAddItemDTO processRow(Row row) {
        AdminAddItemDTO userDTO = new AdminAddItemDTO();
        String userName = ExcelUtils.getCellString(row.getCell(0));
        String listGift = ExcelUtils.getCellString(row.getCell(1));
        String listHoney = ExcelUtils.getCellString(row.getCell(2));
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
        if (DataUtils.isNullObject(listGift) && DataUtils.isNullObject(listHoney)) {
            userDTO.setImportMessage("Không thể để trống vật phẩm và mật ong");
            userDTO.setError(true);
            hasError = true;
        }
        String regexFormat = "^(\\d+\\s+[^-,]+)(,\\s*\\d+\\s+[^-,]+)*$";
        int check = 0;
        if (DataUtils.isNullObject(listGift)) {
            check++;
        } else {
            if (!listGift.trim().matches(regexFormat)) {
                userDTO.setImportMessage("Định dạng vật phẩm không hợp lệ");
                userDTO.setError(true);
                check++;
                hasError = true;
            } else {
                String[] partsGift = listGift.split(", ");
                Map<String, Integer> giftMap = new HashMap<>();
                Map<String, Integer> nameToNumberMap = new HashMap();

                for (String part : partsGift) {
                    String[] subParts = part.split(" ", 2);
                    if (subParts.length == 2) {
                        String numberItemStr = subParts[0];
                        String nameItem = subParts[1];
                        Integer numberItem = Integer.parseInt(numberItemStr);

                        if (numberItem < 1) {
                            userDTO.setImportMessage("Số lượng vật phẩm không được nhỏ hơn 1");
                            userDTO.setError(true);
                            check++;
                            hasError = true;
                            break;
                        }
                        // Lưu trữ số lượng quà dựa trên tên quà
                        giftMap.put(nameItem, numberItem);
                        nameToNumberMap.put(nameItem, numberItem);
                    }
                }
                List<AdminImportGiftResponse> gifts = adRandomAddPointRepository.getGiftsByNames(giftMap.keySet());
                for (AdminImportGiftResponse gift : gifts) {
                    String nameItem = gift.getName();
                    if (!giftMap.containsKey(nameItem)) {
                        userDTO.setImportMessage("Vật phẩm " + nameItem + " không tồn tại");
                        userDTO.setError(true);
                        check++;
                        hasError = true;
                        break;
                    }
                    Integer numberItem = nameToNumberMap.get(nameItem);
                    if (numberItem < 1) {
                        userDTO.setImportMessage("Số lượng vật phẩm không được nhỏ hơn 1");
                        userDTO.setError(true);
                        check++;
                        hasError = true;
                        break;
                    }
                }
            }
        }
        if (DataUtils.isNullObject(listHoney)) {
            check++;
        } else {
            if (!listHoney.trim().matches(regexFormat)) {
                userDTO.setImportMessage("Định dạng mật ong không hợp lệ");
                userDTO.setError(true);
                check++;
                hasError = true;
            } else {
                String[] partsHoney = listHoney.split(", ");
                Map<String, Integer> honeyMap = new HashMap<>();
                Map<String, Integer> nameToNumberMap = new HashMap();
                for (String part : partsHoney) {
                    String[] subParts = part.split(" ", 2);
                    if (subParts.length == 2) {
                        String numberPointStr = subParts[0].trim();
                        String categoryPoint = subParts[1].trim().replace("-", "");
                        Integer numberPoint = Integer.parseInt(numberPointStr);
                        if (numberPoint < 1) {
                            userDTO.setImportMessage("Số lượng mật ong không được nhỏ hơn 1");
                            userDTO.setError(true);
                            check++;
                            hasError = true;
                            break;
                        }
                        // Lưu trữ số lượng mật ong dựa trên loại mật ong
                        honeyMap.put(categoryPoint, numberPoint);
                        nameToNumberMap.put(categoryPoint, numberPoint);
                    }
                }
                List<AdminImportCategoryResponse> categories = adRandomAddPointRepository.getCategoriesByNames(honeyMap.keySet());
                for (AdminImportCategoryResponse category : categories) {
                    String categoryPoint = category.getName();
                    if (!honeyMap.containsKey(categoryPoint)) {
                        userDTO.setImportMessage("Loại mật ong " + categoryPoint + " không tồn tại");
                        userDTO.setError(true);
                        check++;
                        hasError = true;
                        break;
                    }
                    Integer numberPoint = nameToNumberMap.get(categoryPoint);
                    if (numberPoint < 1) {
                        userDTO.setImportMessage("Số lượng mật ong không được nhỏ hơn 1");
                        userDTO.setError(true);
                        check++;
                        hasError = true;
                        break;
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
        userDTO.setEmail(response != null ? response.getEmail() : null);
        userDTO.setLstGift(listGift != null ? listGift : null);
        userDTO.setLstHoney(listHoney != null ? listHoney : null);
        return userDTO;
    }

    @Override
    public List<AdminChestReponse> getAllChest() {
        return adRandomAddPointRepository.getAllChest();
    }

    @Override
    public List<AdminChestGiftResponse> getAllGiftByChest(String idChest) {
        return adRandomAddPointRepository.getAllGiftByChest(idChest);
    }

    @Override
    public AdminChestReponse getChestById(String idChest) {
        return adRandomAddPointRepository.getChestById(idChest);
    }

    @Override
    public Boolean deleteChestGift(String idChest, String idGift) {
        String chestGift = adRandomAddPointRepository.getOptionalChestGift(idChest, idGift);
        StringBuilder stringBuilder = new StringBuilder();
        Gift gift = adGiftRepository.findById(idGift).orElse(null);
        Chest chest = chestRepository.findById(idChest).orElse(null);

        if (chestGift != null) {
            stringBuilder.append("Vật phẩm: " + gift.getName() + " được bỏ ra khỏi rương " + chest.getName());
            adChestGiftRepository.deleteById(chestGift);
            createLogBug(stringBuilder);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<String> getAllNameChest() {
        return adRandomAddPointRepository.getAllNameChest();
    }

    @Override
    @Transactional
    public Chest addChest(String name) {
        Chest chest = new Chest();
        chest.setName(name);
        return chestRepository.save(chest);
    }
}
