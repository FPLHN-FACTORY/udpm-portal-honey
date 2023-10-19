package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminCreateArchiveGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateHoneyRequest;
import com.honeyprojects.core.admin.model.request.AdminNotificationRandomRequest;
import com.honeyprojects.core.admin.model.request.AdminRandomPointRequest;
import com.honeyprojects.core.admin.model.response.*;
import com.honeyprojects.core.admin.repository.*;
import com.honeyprojects.core.admin.service.AdRandomAddPointService;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.entity.*;
import com.honeyprojects.infrastructure.contant.Constants;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.NotificationType;
import com.honeyprojects.util.ConvertRequestApiidentity;
import com.honeyprojects.util.DataUtils;
import com.honeyprojects.util.DateUtils;
import com.honeyprojects.util.ExcelUtils;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
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
                            adminCreateHoneyRequest.setSemesterId(null);
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
                            adminCreateHoneyRequest.setSemesterId(null);
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
                honey.setHoneyPoint(honey.getHoneyPoint() + randomPoint);
                adRandomAddPointRepository.save(honey);
                Optional<Category> categoryOptional = adminCategoryRepository.findById(honey.getHoneyCategoryId());
                if (!categoryOptional.isPresent()) {
                    continue;
                } else {
                    Category category = categoryOptional.get();
                    String title = Constants.TITLE_NOTIFICATION_SYSTEM;
                    String content = Constants.CONTENT_NOTIFICATION_SYSTEM + randomPoint + "mật ong loại " + category.getName();
                    AdminNotificationRandomRequest request = new AdminNotificationRandomRequest(title, content, honey.getStudentId(), null, NotificationType.PHAT_QUA_HONEY, NotificationStatus.CHUA_DOC);
                    Notification notification = request.createNotification(new Notification());
                    adNotificationRespository.save(notification);
                }
            }

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean createRandomItem(AdminRandomPointRequest req) {
        Random random = new Random();
        try {
            if (req.getListStudentPoint().isEmpty()) {
                // Truy xuất danh sách tất cả sinh viên và gọi API để lấy thông tin
                List<String> allStudent = adRandomAddPointRepository.getAllIdStudentInHoney();
                List<SimpleResponse> simpleResponseList = convertRequestApiidentity.handleCallApiGetListUserByListId(allStudent);

                // Duyệt qua danh sách sinh viên và tạo vật phẩm ngẫu nhiên cho từng sinh viên
                for (SimpleResponse simple : simpleResponseList) {
                    int indexRandom = random.nextInt(req.getListItem().size());
                    String itemRandom = req.getListItem().get(indexRandom);
                    String chestGiftId = adRandomAddPointRepository.getOptionalChestGift(req.getChestId(), itemRandom);
                    Optional<ChestGift> optionalChestGift = adChestGiftRepository.findById(chestGiftId);
                    System.out.println("NEXT");
                    if (optionalChestGift.isPresent()) {
                        ChestGift chestGift = optionalChestGift.get();
                        String idChest = chestGift.getChestId();
                        String idGift = chestGift.getGiftId();
                        AdminCreateArchiveGiftRequest adminCreateArchiveGiftRequest = new AdminCreateArchiveGiftRequest(idChest, idGift);
                        ArchiveGift archiveGift = adminCreateArchiveGiftRequest.createArchivegift(new ArchiveGift());
                        adArchiveGiftRepository.save(archiveGift);
                        Gift gift = adGiftRepository.findById(idGift).get();
                        String title = Constants.TITLE_NOTIFICATION_SYSTEM;
                        String content = Constants.CONTENT_NOTIFICATION_SYSTEM + "Vật phẩm - " + gift.getName() + " - Số lương: 1";
                        AdminNotificationRandomRequest request = new AdminNotificationRandomRequest(title, content, simple.getId(), gift.getId(), NotificationType.PHAT_QUA_ITEM, NotificationStatus.CHUA_DOC);
                        Notification notification = request.createNotification(new Notification());
                        adNotificationRespository.save(notification);
                    } else {
                        continue;
                    }
                }
            } else {
                // Trường hợp có danh sách sinh viên cụ thể được chỉ định
                for (String idStudent : req.getListStudentPoint()) {
                    int indexRandom = random.nextInt(req.getListItem().size());
                    String itemRandom = req.getListItem().get(indexRandom);
                    String chestGiftId = adRandomAddPointRepository.getOptionalChestGift(req.getChestId(), itemRandom);
                    Optional<ChestGift> optionalChestGift = adChestGiftRepository.findById(chestGiftId);
                    System.out.println("NEXT");
                    if (optionalChestGift.isPresent()) {
                        ChestGift chestGift = optionalChestGift.get();
                        String idChest = chestGift.getChestId();
                        String idGift = chestGift.getGiftId();
                        AdminCreateArchiveGiftRequest adminCreateArchiveGiftRequest = new AdminCreateArchiveGiftRequest(idChest, idGift);
                        ArchiveGift archiveGift = adminCreateArchiveGiftRequest.createArchivegift(new ArchiveGift());
                        adArchiveGiftRepository.save(archiveGift);
                        Gift gift = adGiftRepository.findById(idGift).get();
                        String title = Constants.TITLE_NOTIFICATION_SYSTEM;
                        String content = Constants.CONTENT_NOTIFICATION_SYSTEM + "Vật phẩm - " + gift.getName() + " - Số lượng: 1";
                        AdminNotificationRandomRequest request = new AdminNotificationRandomRequest(title, content, idStudent, gift.getId(), NotificationType.PHAT_QUA_ITEM, NotificationStatus.CHUA_DOC);
                        Notification notification = request.createNotification(new Notification());
                        adNotificationRespository.save(notification);
                    } else {
                        continue;
                    }
                }
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Boolean exportExcel() {
        // Lấy đường dẫn thư mục "Downloads" trong hệ thống
        String userHome = System.getProperty("user.home");
        String outputPath = userHome + File.separator + "Downloads" + File.separator + "file_random.xlsx";

        File outputFile = new File(outputPath);

        // Kiểm tra nếu tệp đã tồn tại, thì thêm số thứ tự vào tên tệp để tránh ghi đè tệp cũ
        int count = 1;
        while (outputFile.exists()) {
            outputPath = userHome + File.separator + "Downloads" + File.separator + "file_random" + "(" + count + ")" + ".xlsx";
            outputFile = new File(outputPath);
            count++;
        }

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
        String[] headers = {"STT", "Tên đăng nhập", "Email"};
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
    public Boolean previewDataExportExcel() {
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
            formatGiftCell.setCellValue("Định dạng vật phẩm: số-lượng tên-vật-phẩm, ..., số-lượng tên-vật-phẩm");

            // Dòng thứ 3 - cách viết đúng định dạng mật ong
            Row formatHoneyRow = sheet.createRow(2);
            Cell formatHoneyCell = formatHoneyRow.createCell(1);
            formatHoneyCell.setCellValue("Định dạng mật ong: số-lượng - loại-điểm,..., số-lượng - loại-điểm");

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
            formatHoneyCell.setCellStyle(formatStyle);

            // Tạo hàng tiêu đề và đặt các tiêu đề cột
            Row headerRow = sheet.createRow(4);
            String[] headers = {"STT", "Mã sinh viên", "Vật phẩm", "Mật ong", "Danh sách tên vật phẩm", "Danh sách loại mật ong"};
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

            // Danh sách tên vật phẩm
            List<String> lstGift = adGiftRepository.getAllNameByStatus();

            // Danh sách tên thể loại mật ong
            List<String> lstCategoryHoney = adminCategoryRepository.getAllNameCategoryByStatus();

            // Ghi danh sách tên vật phẩm và danh sách tên thể loại mật ong cùng lúc
            int rowIndex = 5; // Bắt đầu từ hàng thứ hai cho dữ liệu

            int maxItemCount = Math.max(lstGift.size(), lstCategoryHoney.size());

            for (int i = 0; i < maxItemCount; i++) {
                Row dataRow = sheet.createRow(rowIndex);

                if (i < lstGift.size()) {
                    dataRow.createCell(columnCount - 2).setCellValue(lstGift.get(i)); // Cột trước cuối là danh sách tên vật phẩm
                }

                if (i < lstCategoryHoney.size()) {
                    dataRow.createCell(columnCount - 1).setCellValue(lstCategoryHoney.get(i)); // Cột cuối là danh sách loại mật ong
                }

                rowIndex++;
            }

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
    public List<String> importExcel(MultipartFile file) {
        List<String> simpleResponseList = new ArrayList<>();
        try {
            // Đọc tệp Excel từ đối tượng MultipartFile
            InputStream inputStream = file.getInputStream();
            Workbook workbook = new XSSFWorkbook(inputStream);

            // Lấy bảng tính đầu tiên từ tệp Excel (ở đây giả sử chỉ có một bảng tính)
            Sheet sheet = workbook.getSheetAt(0);

            // Xác định cột chứa địa chỉ email (ví dụ: cột "Email")
            Row headerRow = sheet.getRow(0);
            int emailColumnIndex = -1;
            for (Cell cell : headerRow) {
                String columnName = cell.getStringCellValue();
                if ("Email".equalsIgnoreCase(columnName)) {
                    emailColumnIndex = cell.getColumnIndex();
                    break;
                }
            }

            // Duyệt qua từng dòng của bảng tính (bỏ qua hàng đầu tiên chứa tiêu đề)
            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    continue; // Bỏ qua hàng đầu tiên (tiêu đề)
                }

                // Trích xuất giá trị địa chỉ email từ cột tương ứng
                Cell emailCell = row.getCell(emailColumnIndex);
                String email = (emailCell != null) ? emailCell.getStringCellValue() : "";

                // Tìm sinh viên bằng email và thêm vào list
                if (email.equals("")) {
                    continue;
                } else {
                    SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserByEmail(email);
                    simpleResponseList.add(simpleResponse.getId());
                }
            }

            // Đóng tệp Excel và trả về danh sách địa chỉ email
            workbook.close();
            inputStream.close();
            return simpleResponseList;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
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
                .skip(1) // Bỏ qua 2 dòng đầu tiên
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
        for (AdminAddItemDTO userDTO : lstImportUser) {
            // Duyệt qua danh sách đối tượng AdminAddItemDTO đã được kiểm tra lỗi
            if (userDTO.isError() == true) {
                // Nếu đối tượng có lỗi, bỏ qua và tiếp tục với đối tượng tiếp theo trong danh sách
                continue;
            } else {
                // Nếu không có lỗi, tiến hành xử lý và lưu dữ liệu vào cơ sở dữ liệu

                // Gọi API để lấy thông tin người dùng bằng địa chỉ email
                SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserByEmail(userDTO.getEmail());

                if (userDTO.getLstGift() == null) {
                    continue;
                } else {
                    // Xử lý vật phẩm (gift)
                    String[] partsGift = userDTO.getLstGift().split(", ");
                    for (String part : partsGift) {
                        String[] subParts = part.split(" ", 2);
                        if (subParts.length == 2) {
                            String numberItemStr = subParts[0];
                            String nameItem = subParts[1];
                            Integer numberItem = Integer.parseInt(numberItemStr);

                            // Lấy id của vật phẩm từ cơ sở dữ liệu
                            String idGift = adRandomAddPointRepository.getIdGiftByName(nameItem);
                            if (idGift == null) {
                                continue;
                            } else {
                                for (int i = 0; i < numberItem; i++) {
                                    // Tạo một bản ghi ArchiveGift mới và lưu vào cơ sở dữ liệu
                                    AdminCreateArchiveGiftRequest adminCreateArchiveGiftRequest = new AdminCreateArchiveGiftRequest(null, idGift);
                                    ArchiveGift archiveGift = adminCreateArchiveGiftRequest.createArchivegift(new ArchiveGift());
                                    adArchiveGiftRepository.save(archiveGift);
                                }
                                Optional<Gift> giftOptional = adGiftRepository.findById(idGift);
                                if (giftOptional.isPresent()) {
                                    Gift gift = giftOptional.get();
                                    createNotificationItem(gift.getName(), numberItemStr, simpleResponse, gift.getId());
                                } else {
                                    continue;
                                }
                            }
                        }
                    }
                }

                // Xử lý điểm mật ong (honey)
                if (userDTO.getLstHoney() == null) {
                    continue;
                } else {
                    String[] partsHoney = userDTO.getLstHoney().split(", ");
                    for (String part : partsHoney) {
                        String[] subParts = part.split(" ", 2);
                        if (subParts.length == 2) {
                            String numberPoint = subParts[0].trim();
                            String categoryPoint = subParts[1].trim().replace("-", "");

                            // Lấy thông tin về loại điểm mật ong từ cơ sở dữ liệu
                            AdminCategoryResponse categoryResponse = adRandomAddPointRepository.getCategoryByName(categoryPoint.trim());

                            // Kiểm tra xem đã có bản ghi Honey cho người dùng và loại điểm mật ong này chưa
                            Optional<Honey> honeyOptional = adRandomAddPointRepository.getHoneyByIdStudent(simpleResponse.getId(), categoryResponse.getId());
                            if (honeyOptional.isPresent()) {
                                // Nếu đã có, cập nhật điểm mật ong cho bản ghi tồn tại
                                Honey honey = honeyOptional.get();
                                honey.setHoneyPoint(honey.getHoneyPoint() + Integer.parseInt(numberPoint));
                                adminHoneyRepository.save(honey);
                            } else {
                                // Nếu chưa có, tạo một bản ghi Honey mới và lưu vào cơ sở dữ liệu
                                AdminCreateHoneyRequest adminCreateHoneyRequest = new AdminCreateHoneyRequest();
                                adminCreateHoneyRequest.setSemesterId(null);
                                adminCreateHoneyRequest.setStudentId(simpleResponse.getId());
                                adminCreateHoneyRequest.setCategoryId(categoryResponse.getId());
                                adminCreateHoneyRequest.setHoneyPoint(Integer.parseInt(numberPoint));
                                Honey newHoney = adminCreateHoneyRequest.createHoney(new Honey());
                                adminHoneyRepository.save(newHoney);
                            }
                            createNotificationHoney(categoryPoint, numberPoint, simpleResponse, null);
                        }
                    }
                }
            }
        }
    }

    private void createNotificationHoney(String categoryPoint, String numberPoint, SimpleResponse simpleResponse, String giftId) {
        String title = Constants.TITLE_NOTIFICATION_SYSTEM;
        String content = Constants.CONTENT_NOTIFICATION_SYSTEM + "Honey - " + categoryPoint + " - Số lượng: " + numberPoint;
        AdminNotificationRandomRequest request = new AdminNotificationRandomRequest(title, content, simpleResponse.getId(), giftId, NotificationType.PHAT_QUA_HONEY, NotificationStatus.CHUA_DOC);
        Notification notification = request.createNotification(new Notification());
        adNotificationRespository.save(notification);
    }

    private void createNotificationItem(String itemName, String numberItem, SimpleResponse simpleResponse, String giftId) {
        String title = Constants.TITLE_NOTIFICATION_SYSTEM;
        String content = Constants.CONTENT_NOTIFICATION_SYSTEM + "Vật phẩm - " + itemName + " - Số lượng: " + numberItem;
        AdminNotificationRandomRequest request = new AdminNotificationRandomRequest(title, content, simpleResponse.getId(), giftId, NotificationType.PHAT_QUA_ITEM, NotificationStatus.CHUA_DOC);
        Notification notification = request.createNotification(new Notification());
        adNotificationRespository.save(notification);
    }

    private AdminAddItemDTO processRow(Row row) {
        AdminAddItemDTO userDTO = new AdminAddItemDTO();
        String userName = ExcelUtils.getCellString(row.getCell(1));
        String listGift = ExcelUtils.getCellString(row.getCell(2));
        String listHoney = ExcelUtils.getCellString(row.getCell(3));

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

        int check = 0;
        if (DataUtils.isNullObject(listGift)) {
            check++;
        } else {
            String regexGift = "^\\d+\\s+[^,]*(,\\s*\\d+\\s+[^,]*)?$";
            if (!listGift.trim().matches(regexGift)) {
                userDTO.setImportMessage("Định dạng vật phẩm không hợp lệ. Phải là 'số-lượng tên-vật-phẩm,..., số-lượng tên-vật-phẩm");
                userDTO.setError(true);
                hasError = true;
            } else {
                // Xử lý danh sách vật phẩm và kiểm tra
                String[] partsGift = listGift.split(", ");
                for (String part : partsGift) {
                    String[] subParts = part.split(" ", 2);
                    if (subParts.length == 2) {
                        String numberItemStr = subParts[0];
                        String nameItem = subParts[1];
                        Integer numberItem = Integer.parseInt(numberItemStr);
                        String idGift = adRandomAddPointRepository.getIdGiftByName(nameItem);
                        if (numberItem < 1) {
                            userDTO.setImportMessage("Số lượng Vật phẩm không được nhỏ hơn 1");
                            userDTO.setError(true);
                            hasError = true;
                            break;
                        }
                        if (DataUtils.isNullObject(idGift)) {
                            userDTO.setImportMessage("Vật phẩm " + nameItem + " không tồn tại");
                            userDTO.setError(true);
                            hasError = true;
                            break;
                        }
                    }
                }
            }
        }

        if (DataUtils.isNullObject(listHoney)) {
            check++;
        } else {
            String regexHoney = "^(\\d+\\s*-\\s*[a-zA-Z]+)(,\\s*\\d+\\s*-\\s*[a-zA-Z]+)*$";
            if (!listHoney.trim().matches(regexHoney)) {
                userDTO.setImportMessage("Định dạng mật ong không hợp lệ. Phải là 'số-lượng - loại-điểm,..., số-lượng - loại-điểm");
                userDTO.setError(true);
                hasError = true;
            } else {
                // Xử lý danh sách mật ong và kiểm tra
                String[] partsHoney = listHoney.split(", ");
                for (String part : partsHoney) {
                    String[] subParts = part.split(" ", 2);
                    if (subParts.length == 2) {
                        String numberPoint = subParts[0].trim();
                        String categoryPoint = subParts[1].trim().replace("-", "");
                        AdminCategoryResponse categoryResponse = adRandomAddPointRepository.getCategoryByName(categoryPoint.trim());
                        if (DataUtils.isNullObject(categoryResponse) || DataUtils.isNullObject(categoryResponse.getId())) {
                            userDTO.setImportMessage("Loại mật ong " + categoryPoint + " không tồn tại");
                            userDTO.setError(true);
                            hasError = true;
                            break;
                        }
                    }
                }
            }
        }

        if (check == 2) {
            userDTO.setImportMessage("Vật phẩm và mật ong không được để trống");
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
    public Boolean deleteChestGidt(String idChest, String idGift) {
        String chestGift = adRandomAddPointRepository.getOptionalChestGift(idChest, idGift);

        if (chestGift != null) {
            adChestGiftRepository.deleteById(chestGift);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<String> getAllNameChest() {
        return adRandomAddPointRepository.getAllNameChest();
    }
}
