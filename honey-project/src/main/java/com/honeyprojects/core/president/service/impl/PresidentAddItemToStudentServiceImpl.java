package com.honeyprojects.core.president.service.impl;

import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.president.model.request.PresidentCreateNotificationDetailAddItemRequest;
import com.honeyprojects.core.president.model.request.PresidentNotificationAddItemRequest;
import com.honeyprojects.core.president.model.response.PresidentAddItemBO;
import com.honeyprojects.core.president.model.response.PresidentAddItemDTO;
import com.honeyprojects.core.president.model.response.PresidentCategoryResponse;
import com.honeyprojects.core.president.model.response.PresidentGiftResponse;
import com.honeyprojects.core.president.repository.PresidentAddItemRepository;
import com.honeyprojects.core.president.repository.PresidentGiftRepository;
import com.honeyprojects.core.president.repository.PresidentNotificationRepository;
import com.honeyprojects.core.president.service.PresidentAddItemToStudentService;
import com.honeyprojects.core.student.repository.StudentNotificationDetailRepository;
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
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class PresidentAddItemToStudentServiceImpl implements PresidentAddItemToStudentService {

    @Autowired
    private ConvertRequestApiidentity convertRequestApiidentity;

    @Autowired
    private PresidentAddItemRepository presidentAddItemRepository;

    @Autowired
    private PresidentGiftRepository presidentGiftRepository;

    @Autowired
    private PresidentNotificationRepository presidentNotificationRepository;

    @Autowired
    private StudentNotificationDetailRepository studentNotificationDetailRepository;


    @Override
    public Boolean exportExcel() {
        try {
            // Lấy đường dẫn thư mục "Downloads" trong hệ thống
            String userHome = System.getProperty("user.home");
            String outputPath = userHome + File.separator + "Downloads" + File.separator + "file_template_data" + DateUtils.date2yyyyMMddHHMMssNoSlash(new Date()) + ".xlsx";

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
            formatGiftCell.setCellValue("Định dạng vật phẩm và mật ong: số-lượng tên-vật-phẩm, ..., số-lượng tên-vật-phẩm");

            // Tạo một kiểu cho các ô định dạng
            CellStyle formatStyle = workbook.createCellStyle();
            Font formatFont = workbook.createFont();
            formatFont.setBold(true);
            formatFont.setFontHeightInPoints((short) 13);
            formatFont.setColor(IndexedColors.BLACK.getIndex());
            formatStyle.setFillForegroundColor(IndexedColors.WHITE.getIndex());
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
                sheet.setColumnWidth(i, Constants.COLUMN_WIDTH); // Sử dụng một constant cho cỡ cột
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

    @Override
    public PresidentAddItemBO previewDataImportExcel(MultipartFile file) throws IOException {
        // Lấy đối tượng InputStream từ tệp Excel được tải lên
        InputStream inputStream = file.getInputStream();

        // Tạo một Workbook (bảng tính) từ InputStream sử dụng thư viện Apache POI
        Workbook workbook = new XSSFWorkbook(inputStream);

        // Lấy bảng tính đầu tiên từ Workbook
        Sheet sheet = workbook.getSheetAt(0);

        // Đọc dữ liệu từ bảng tính và tạo danh sách các đối tượng AdminAddItemDTO
        List<PresidentAddItemDTO> lstUserImportDTO = StreamSupport.stream(sheet.spliterator(), false)
                .skip(3) // Bỏ qua 3 dòng đầu tiên
                .filter(row -> !ExcelUtils.checkNullLCells(row, 1))
                .map(row -> processRow(row))
                .collect(Collectors.toList());

        // Nhóm dữ liệu theo trạng thái lỗi (error) và đếm số lượng mỗi trạng thái
        Map<Boolean, Long> importStatusCounts = lstUserImportDTO.stream()
                .collect(Collectors.groupingBy(PresidentAddItemDTO::isError, Collectors.counting()));

        // Tạo đối tượng AdminAddItemBO để lưu trữ thông tin bản xem trước
        PresidentAddItemBO presidentAddItemBO = new PresidentAddItemBO();
        presidentAddItemBO.setLstPresidentAddItemDTO(lstUserImportDTO);
        presidentAddItemBO.setTotal(Long.parseLong(String.valueOf(lstUserImportDTO.size())));
        presidentAddItemBO.setTotalError(importStatusCounts.getOrDefault(true, 0L));
        presidentAddItemBO.setTotalSuccess(importStatusCounts.getOrDefault(false, 0L));

        return presidentAddItemBO;
    }

    private PresidentAddItemDTO processRow(Row row) {
        PresidentAddItemDTO userDTO = new PresidentAddItemDTO();
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
                // Xử lý danh sách vật phẩm và kiểm tra
//                String[] partsGift = listGift.split(", ");
//                for (String part : partsGift) {
//                    String[] subParts = part.split(" ", 2);
//                    if (subParts.length == 2) {
//                        String numberItemStr = subParts[0];
//                        String nameItem = subParts[1];
//                        Integer numberItem = Integer.parseInt(numberItemStr);
//                        PresidentGiftResponse gift = presidentAddItemRepository.getGiftByName(nameItem);
//                        if (numberItem < 1) {
//                            userDTO.setImportMessage("Số lượng vật phẩm không được nhỏ hơn 1");
//                            userDTO.setError(true);
//                            check++;
//                            hasError = true;
//                            break;
//                        }
//                        if (DataUtils.isNullObject(gift)) {
//                            userDTO.setImportMessage("Vật phẩm " + nameItem + " không tồn tại");
//                            userDTO.setError(true);
//                            check++;
//                            hasError = true;
//                            break;
//                        }
//                    }
//                }
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

                List<PresidentGiftResponse> gifts = presidentAddItemRepository.getGiftsByNames(giftMap.keySet());

                for (PresidentGiftResponse gift : gifts) {
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
                // Xử lý danh sách mật ong và kiểm tra
//                String[] partsHoney = listHoney.split(", ");
//                for (String part : partsHoney) {
//                    String[] subParts = part.split(" ", 2);
//                    if (subParts.length == 2) {
//                        String numberPoint = subParts[0].trim();
//                        String categoryPoint = subParts[1].trim().replace("-", "");
//                        PresidentCategoryResponse categoryResponse = presidentAddItemRepository.getCategoryByName(categoryPoint.trim());
//                        if (DataUtils.isNullObject(categoryResponse) || DataUtils.isNullObject(categoryResponse.getId())) {
//                            userDTO.setImportMessage("Loại mật ong " + categoryPoint + " không tồn tại");
//                            userDTO.setError(true);
//                            check++;
//                            hasError = true;
//                            break;
//                        }
//                    }
//                }
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

                List<PresidentCategoryResponse> categories = presidentAddItemRepository.getCategoriesByNames(honeyMap.keySet());

                for (PresidentCategoryResponse category : categories) {
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

//        if (check > 1) {
//            userDTO.setImportMessage("Vật phẩm và mật ong không được để trống");
//            userDTO.setError(true);
//            hasError = true;
//        }

        // Xác định trạng thái thành công hoặc lỗi và cung cấp thông báo
        if (!hasError) {
            userDTO.setImportMessage("SUCCESS");
            userDTO.setError(false);
        }

        // Đặt các thuộc tính của đối tượng AdminAddItemDTO
        userDTO.setId(response != null ? response.getId() : null);
        userDTO.setUserName(userName != null ? userName : null);
        userDTO.setLstGift(listGift != null ? listGift : null);
        userDTO.setLstHoney(listHoney != null ? listHoney : null);

        return userDTO;
    }

    @Override
    public void importData(List<PresidentAddItemDTO> lstAddItemDTO) throws IOException {
        if (!DataUtils.isNullObject(lstAddItemDTO)) {
            List<PresidentAddItemDTO> lstImportUser = lstAddItemDTO.stream()
                    .filter(e -> !e.isError())
                    .collect(Collectors.toList());
            saveImportData(lstImportUser);
        }
    }

    private void saveImportData(List<PresidentAddItemDTO> lstImportUser) throws IOException {
        for (PresidentAddItemDTO userDTO : lstImportUser) {
            // Duyệt qua danh sách đối tượng AdminAddItemDTO đã được kiểm tra lỗi
            if (userDTO.isError() == true) {
                // Nếu đối tượng có lỗi, bỏ qua và tiếp tục với đối tượng tiếp theo trong danh sách
                continue;
            } else {
                // Nếu không có lỗi, tiến hành xử lý và lưu dữ liệu vào cơ sở dữ liệu, tạo thông báo
                // Gọi API để lấy thông tin người dùng bằng địa chỉ email
                String emailSimple = userDTO.getUserName() + "@fpt.edu.vn";
                SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserByEmail(emailSimple);
                Notification notification = createNotification(simpleResponse.getId());
                if (userDTO.getLstGift() == null) {
                    continue;
                } else {
                    // Xử lý vật phẩm (gift)
//                    String[] partsGift = userDTO.getLstGift().split(", ");
//                    for (String part : partsGift) {
//                        String[] subParts = part.split(" ", 2);
//                        if (subParts.length == 2) {
//                            String numberItemStr = subParts[0];
//                            String nameItem = subParts[1];
//                            Integer numberItem = Integer.parseInt(numberItemStr);
//                            // Lấy id của vật phẩm từ cơ sở dữ liệu
//                            PresidentGiftResponse gift = presidentAddItemRepository.getGiftByName(nameItem);
//                            if (DataUtils.isNullObject(gift)) {
//                                continue;
//                            } else {
//                                createNotificationDetailItem(gift, notification.getId(), numberItem);
//                                continue;
//                            }
//                        }
//                    }
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

                    List<PresidentGiftResponse> gifts = presidentAddItemRepository.getGiftsByNames(giftMap.keySet());

                    for (PresidentGiftResponse gift : gifts) {
                        String nameItem = gift.getName();
                        createNotificationDetailItem(gift, notification.getId(), giftMap.get(nameItem));
                    }

                }

                // Xử lý điểm mật ong (honey)
                if (userDTO.getLstHoney() == null) {
                    continue;
                } else {
//                    String[] partsHoney = userDTO.getLstHoney().split(", ");
//                    for (String part : partsHoney) {
//                        String[] subParts = part.split(" ", 2);
//                        if (subParts.length == 2) {
//                            String numberPoint = subParts[0].trim();
//                            String categoryPoint = subParts[1].trim().replace("-", "");
////                             Lấy thông tin về loại điểm mật ong từ cơ sở dữ liệu
//                            PresidentCategoryResponse categoryResponse = presidentAddItemRepository.getCategoryByName(categoryPoint.trim());
//                            if (!DataUtils.isNullObject(categoryResponse)) {
//                                createNotificationDetailHoney(categoryResponse, notification.getId(), Integer.parseInt(numberPoint));
//                            } else {
//                                continue;
//                            }
//                        }
//                    }
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
                    List<PresidentCategoryResponse> categories = presidentAddItemRepository.getCategoriesByNames(honeyMap.keySet());
                    for (PresidentCategoryResponse category : categories) {
                        String categoryPoint = category.getName();
                        if (honeyMap.containsKey(categoryPoint)) {
                            createNotificationDetailHoney(category, notification.getId(), honeyMap.get(categoryPoint));
                        }
                    }
                }
            }
        }
    }

    private Notification createNotification(String idStudent) {
        String title = Constants.TITLE_NOTIFICATION_SYSTEM;
        PresidentNotificationAddItemRequest request = new PresidentNotificationAddItemRequest(title, idStudent, NotificationType.HE_THONG, NotificationStatus.CHUA_DOC);
        Notification notification = request.createNotification(new Notification());
        return presidentNotificationRepository.save(notification);
    }

    private NotificationDetail createNotificationDetailHoney(PresidentCategoryResponse categoryResponse, String idNotification, Integer quantity) {
        String content = Constants.CONTENT_NOTIFICATION_SYSTEM + " Mật ong - " + categoryResponse.getName() + " - Số lượng: " + quantity;
        PresidentCreateNotificationDetailAddItemRequest detailRandomRequest = new PresidentCreateNotificationDetailAddItemRequest(content, categoryResponse.getId(), idNotification, NotificationDetailType.NOTIFICATION_DETAIL_HONEY, quantity);
        NotificationDetail notificationDetail = detailRandomRequest.createNotificationDetail(new NotificationDetail());
        return studentNotificationDetailRepository.save(notificationDetail);
    }

    private NotificationDetail createNotificationDetailItem(PresidentGiftResponse gift, String idNotification, Integer quantity) {
        String content = Constants.CONTENT_NOTIFICATION_SYSTEM + "Vật phẩm - " + gift.getName() + " - Số lượng: " + quantity;
        PresidentCreateNotificationDetailAddItemRequest detailRandomRequest = new PresidentCreateNotificationDetailAddItemRequest(content, gift.getId(), idNotification, NotificationDetailType.NOTIFICATION_DETAIL_GIFT, quantity);
        NotificationDetail notificationDetail = detailRandomRequest.createNotificationDetail(new NotificationDetail());
        return studentNotificationDetailRepository.save(notificationDetail);
    }
}