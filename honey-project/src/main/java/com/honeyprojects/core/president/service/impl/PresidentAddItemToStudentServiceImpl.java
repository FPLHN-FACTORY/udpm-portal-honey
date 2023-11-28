package com.honeyprojects.core.president.service.impl;

import com.honeyprojects.core.admin.model.request.AdminCreateArchiveGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminHistoryRandomDetailRequest;
import com.honeyprojects.core.admin.model.request.AdminHistoryRandomRequest;
import com.honeyprojects.core.admin.model.response.AdminExportCategoryResponse;
import com.honeyprojects.core.admin.service.ExportExcelServiceService;
import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.president.model.request.PresidentCreateNotificationDetailAddItemRequest;
import com.honeyprojects.core.president.model.request.PresidentNotificationAddItemRequest;
import com.honeyprojects.core.president.model.response.PresidentAddItemBO;
import com.honeyprojects.core.president.model.response.PresidentAddItemDTO;
import com.honeyprojects.core.president.model.response.PresidentCategoryResponse;
import com.honeyprojects.core.president.model.response.PresidentExportGiftResponse;
import com.honeyprojects.core.president.model.response.PresidentGiftResponse;
import com.honeyprojects.core.president.repository.PresidentAddItemRepository;
import com.honeyprojects.core.president.repository.PresidentArchiveGiftRepository;
import com.honeyprojects.core.president.repository.PresidentArchiveRepository;
import com.honeyprojects.core.president.repository.PresidentGiftRepository;
import com.honeyprojects.core.president.repository.PresidentHistoryDetailRepository;
import com.honeyprojects.core.president.repository.PresidentNotificationRepository;
import com.honeyprojects.core.president.service.PresidentAddItemToStudentService;
import com.honeyprojects.core.president.repository.PresidentHistoryRepository;
import com.honeyprojects.core.president.repository.PresidentHoneyRepository;
import com.honeyprojects.core.student.repository.StudentNotificationDetailRepository;
import com.honeyprojects.core.teacher.model.request.TeacherGetPointRequest;
import com.honeyprojects.core.teacher.model.response.TeacherPointResponse;
import com.honeyprojects.core.teacher.repository.TeacherCategoryRepository;
import com.honeyprojects.core.teacher.repository.TeacherHistoryRepository;
import com.honeyprojects.entity.Archive;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.entity.Gift;
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
import com.honeyprojects.infrastructure.contant.StatusGift;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.infrastructure.rabbit.RabbitProducer;
import com.honeyprojects.util.ConvertRequestApiidentity;
import com.honeyprojects.util.DataUtils;
import com.honeyprojects.util.DateUtils;
import com.honeyprojects.util.ExcelUtils;
import com.honeyprojects.util.LoggerUtil;
import jakarta.servlet.http.HttpServletResponse;
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

import java.io.ByteArrayOutputStream;
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
public class PresidentAddItemToStudentServiceImpl implements PresidentAddItemToStudentService {

    @Autowired
    private ConvertRequestApiidentity convertRequestApiidentity;

    @Autowired
    private PresidentAddItemRepository presidentAddItemRepository;

    @Autowired
    private PresidentNotificationRepository presidentNotificationRepository;

    @Autowired
    private StudentNotificationDetailRepository studentNotificationDetailRepository;

    @Autowired
    private LoggerUtil loggerUtil;

    @Autowired
    private RabbitProducer producer;

    @Autowired
    private TeacherCategoryRepository categoryRepository;

    @Autowired
    private PresidentGiftRepository giftRepository;

    @Autowired
    private ExportExcelServiceService exportExcelService;

    @Autowired
    private PresidentArchiveRepository presidentArchiveRepository;

    @Autowired
    private PresidentHistoryDetailRepository presidentHistoryDetailRepository;

    @Autowired
    private PresidentHistoryRepository presidentHistoryRepository;

    @Autowired
    private PresidentArchiveGiftRepository premierArchiveGiftRepository;

    @Autowired
    private PresidentHoneyRepository honeyRepository;

    @Autowired
    private UdpmHoney udpmHoney;

    @Override
    public ByteArrayOutputStream exportExcel(HttpServletResponse response) {

        List<AdminExportCategoryResponse> categories = getCategoryData();
        List<PresidentExportGiftResponse> gifts = getGiftData();

        return exportExcelService.export(response, categories, gifts,
                "Định dạng vật phẩm và mật ong:  <số lượng> <tên vật phẩm>, ..., <số lượng> <loại mật ong> VD: Cột vật phẩm: 10 Tinh hoa lam, ... - Cột mật ong: 10 GOLD, ..."
                , new String[]{"Mã sinh viên", "Vật phẩm", "Mật ong"});
    }

    private List<AdminExportCategoryResponse> getCategoryData() {
        return categoryRepository.getCategoryToExport();
    }

    private List<PresidentExportGiftResponse> getGiftData() {
        return giftRepository.getGiftToExport();
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
                .skip(3) // Bỏ qua 4 dòng đầu tiên
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

                // Kiểm tra sự không tồn tại của mỗi loại mật ong trong honeyMap
                for (String honeyType : honeyMap.keySet()) {
                    boolean found = false;
                    for (PresidentCategoryResponse category : categories) {
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
        String idPresident = udpmHoney.getIdUser();
        StringBuilder stringBuilder = new StringBuilder();
        for (PresidentAddItemDTO userDTO : lstImportUser) {
            // Duyệt qua danh sách đối tượng AdminAddItemDTO đã được kiểm tra lỗi
            if (userDTO.isError()) {
                // Nếu đối tượng có lỗi, bỏ qua và tiếp tục với đối tượng tiếp theo trong danh sách
                continue;
            }

            // Gọi API để lấy thông tin người dùng bằng địa chỉ email
            String emailSimple = userDTO.getUserName() + "@fpt.edu.vn";
            SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserByEmail(emailSimple);

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
                List<PresidentGiftResponse> gifts = presidentAddItemRepository.getGiftsByNames(giftMap.keySet());

                // tạo lịch sử
                History history = new History();
                for (PresidentGiftResponse gift : gifts) {
                    String nameItem = gift.getName();
                    String status = gift.getStatus();

                    String enumStatusFREE = String.valueOf(StatusGift.FREE.ordinal());
                    String enumStatusACCEPT = String.valueOf(StatusGift.ACCEPT.ordinal());

                    if (status.equals(enumStatusFREE)) {
                        createHistory(simpleResponse.getId(), TypeHistory.MAT_ONG_VA_VAT_PHAM);
                        String idArchive = null;
                        String archiveId = presidentArchiveRepository.getIdArchiveByIdStudent(simpleResponse.getId());
                        if (DataUtils.isNullObject(archiveId)) {
                            Archive archive = createArchive(simpleResponse.getId());
                            idArchive = archive.getId();
                        } else {
                            idArchive = archiveId;
                        }
                        // gửi thẳng cho sinh viên
                        createArchiveGift(idArchive, null, gift.getId(), giftMap.get(nameItem));
                        // tạo lịch sử detail
                        createHistoryDetailGift(simpleResponse, gift, history, giftMap.get(nameItem), stringBuilder);
                        // gửi thông báo cho sinh viên
                        stringBuilder.append("Sinh viên " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + " được chủ tịch câu lạc bộ tặng: " + giftMap.get(nameItem) + " " + gift.getName() + ", ");
                        Notification notification = createNotification(simpleResponse.getId());
                        createNotificationDetailItem(gift, notification.getId(), giftMap.get(nameItem));
                    }

                    if(status.equals(enumStatusACCEPT)){
                        // gửi yêu cầu phê duyệt cho admin
                        // gửi thông báo cho admin
                        stringBuilder.append("Đã gửi yêu cầu phê duyệt tới admin " + "Sinh viên " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + ": " + giftMap.get(nameItem) + " " + gift.getName() + ", ");
                        history.setStatus(HoneyStatus.CHO_PHE_DUYET);
                        history.setType(TypeHistory.CONG_VAT_PHAM);
                        history.setCreatedAt(new Date().getTime());
                        history.setPresidentId(idPresident);
                        history.setNote(null);
                        history.setStudentId(simpleResponse.getId());
                        presidentHistoryRepository.save(history);
                        createHistoryDetailGift(simpleResponse, gift, history, giftMap.get(nameItem), stringBuilder);
                    }
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
                List<PresidentCategoryResponse> categories = presidentAddItemRepository.getCategoriesByNames(honeyMap.keySet());
                for (PresidentCategoryResponse category : categories) {
                    String categoryPoint = category.getName();
                    String categoryId = category.getId();
                    String enumCategoryFREE = String.valueOf(CategoryStatus.FREE.ordinal());
                    String enumCategoryACCEPT = String.valueOf(CategoryStatus.ACCEPT.ordinal());

                    TeacherGetPointRequest getPointRequest = new TeacherGetPointRequest();
                    getPointRequest.setStudentId(simpleResponse.getId());
                    getPointRequest.setCategoryId(categoryId);
                    TeacherPointResponse teacherPointResponse = honeyRepository.getPoint(getPointRequest);

                    HistoryDetail historyDetail = new HistoryDetail();
                    History history = new History();
                    history.setPresidentId(idPresident);
                    history.setType(TypeHistory.CONG_DIEM);
                    history.setChangeDate(new Date().getTime());

                    if (honeyMap.containsKey(categoryPoint)) {
                        if(category.getStatus().equals(enumCategoryFREE)){
                            // gủi cho sinh viên
                            history.setStatus(HoneyStatus.DA_PHE_DUYET);
                            if (DataUtils.isNullObject(teacherPointResponse)) {
                                Honey honey = new Honey();
                                honey.setStatus(Status.HOAT_DONG);
                                honey.setHoneyPoint(honeyMap.get(categoryPoint));
                                honey.setStudentId(simpleResponse.getId());
                                honey.setHoneyCategoryId(categoryId);
                                honeyRepository.save(honey);
                                historyDetail.setHoneyId(honey.getId());
                            } else {
                                Honey honey = honeyRepository.findById(teacherPointResponse.getId()).orElseThrow();
                                honey.setHoneyPoint(honeyMap.get(categoryPoint) + honey.getHoneyPoint());
                                honeyRepository.save(honey);
                                historyDetail.setHoneyId(honey.getId());
                            }
                            // thông báo cho sinh viên
                            Notification notification = createNotification(simpleResponse.getId());
                            createNotificationDetailHoney(category, notification.getId(), honeyMap.get(categoryPoint));
                        }
                        if(category.getStatus().equals(enumCategoryACCEPT)){
                            // gửi cho admin phê duyệt
                            // gửi thông báo cho admin
                            if (DataUtils.isNullObject(teacherPointResponse)) {
                                Honey honey = new Honey();
                                honey.setStatus(Status.KHONG_HOAT_DONG);
                                honey.setHoneyPoint(0);
                                honey.setStudentId(simpleResponse.getId());
                                honey.setHoneyCategoryId(categoryId);
                                honeyRepository.save(honey);
                                historyDetail.setHoneyId(honey.getId());
                            } else {
                                Honey honey = honeyRepository.findById(teacherPointResponse.getId()).orElseThrow();
                                historyDetail.setHoneyId(honey.getId());
                            }
                            history.setStatus(HoneyStatus.CHO_PHE_DUYET);
                            Notification notification = new Notification();
                            notification.setTitle("Yêu cầu cộng " + honeyMap.get(categoryPoint) + " mật ong loại " + categoryPoint + " cho sinh viên");
                            notification.setStatus(NotificationStatus.CHUA_DOC);
                            notification.setType(NotificationType.CHO_PHE_DUYET);
                            notification.setStudentId(history.getId());
                            presidentNotificationRepository.save(notification);
                        }
                        presidentHistoryRepository.save(history);
                        historyDetail.setHistoryId(history.getId());
                        historyDetail.setHoneyPoint(honeyMap.get(categoryPoint));
                        historyDetail.setStudentId(simpleResponse.getId());
                        presidentHistoryDetailRepository.save(historyDetail);
                    }
                }
            }
        }
    }
    private ArchiveGift createArchiveGift(String archive, String idChest, String idGift, Integer quantity) {
        AdminCreateArchiveGiftRequest adminCreateArchiveGiftRequest = new AdminCreateArchiveGiftRequest(archive, idChest, idGift, quantity);
        ArchiveGift archiveGift = adminCreateArchiveGiftRequest.createArchivegift(new ArchiveGift());
        return premierArchiveGiftRepository.save(archiveGift);
    }

    private HistoryDetail createHistoryDetailGift(SimpleResponse simpleResponse, PresidentGiftResponse gift, History history, Integer quantity, StringBuilder stringBuilder) {
        stringBuilder.append("Sinh viên " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + " được hệ thống tặng: " + quantity + " vật phẩm: " + gift.getName() + " ,");
        return createHistoryDetail(simpleResponse.getId(), null, gift.getId(), null, history.getId(), quantity, null, gift.getName());
    }

    private History createHistory(String idStudent, TypeHistory typeHistory) {
        AdminHistoryRandomRequest request = new AdminHistoryRandomRequest(idStudent, typeHistory);
        History history = request.createHistory(new History());
        return presidentHistoryRepository.save(history);
    }

    private HistoryDetail createHistoryDetail(String idStudent, String idHoney, String idGift, String idChest, String idHistory, Integer giftQuantity, Integer quantityHoney, String nameGift) {
        AdminHistoryRandomDetailRequest request = new AdminHistoryRandomDetailRequest(idStudent, idHoney, idGift, idChest, idHistory, giftQuantity, quantityHoney, nameGift);
        HistoryDetail historyDetail = request.createHistoryDetail(new HistoryDetail());
        return presidentHistoryDetailRepository.save(historyDetail);
    }

    private Archive createArchive(String idStudent) {
        Archive archive = new Archive();
        archive.setStudentId(idStudent);
        archive.setStatus(Status.HOAT_DONG);
        return presidentArchiveRepository.save(archive);
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
