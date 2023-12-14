package com.honeyprojects.core.president.service.impl;

import com.honeyprojects.core.admin.model.request.AdminCreateArchiveGiftRequest;
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
import com.honeyprojects.core.president.repository.PresidentHistoryRepository;
import com.honeyprojects.core.president.repository.PresidentHoneyRepository;
import com.honeyprojects.core.president.repository.PresidentNotificationRepository;
import com.honeyprojects.core.president.service.PresidentAddItemToStudentService;
import com.honeyprojects.core.president.service.PresidentNotificationDetailService;
import com.honeyprojects.core.president.service.PresidentNotificationService;
import com.honeyprojects.core.student.repository.StudentNotificationDetailRepository;
import com.honeyprojects.core.teacher.model.request.TeacherGetPointRequest;
import com.honeyprojects.core.teacher.model.response.TeacherPointResponse;
import com.honeyprojects.core.teacher.repository.TeacherCategoryRepository;
import com.honeyprojects.entity.Archive;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.HistoryDetail;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.entity.Notification;
import com.honeyprojects.entity.NotificationDetail;
import com.honeyprojects.infrastructure.contant.CategoryStatus;
import com.honeyprojects.infrastructure.contant.Constants;
import com.honeyprojects.infrastructure.contant.HistoryStatus;
import com.honeyprojects.infrastructure.contant.NotificationDetailType;
import com.honeyprojects.infrastructure.contant.NotificationStatus;
import com.honeyprojects.infrastructure.contant.NotificationType;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.contant.StatusGift;
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
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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
    private TeacherCategoryRepository categoryRepository;

    @Autowired
    private PresidentGiftRepository giftRepository;

    @Autowired
    private PresidentHistoryDetailRepository historyDetailRepository;

    @Autowired
    private PresidentHoneyRepository honeyRepository;

    @Autowired
    private PresidentHistoryRepository historyRepository;

    @Autowired
    private ExportExcelServiceService exportExcelService;

    @Autowired
    private UdpmHoney udpmHoney;

    @Autowired
    private PresidentNotificationService presidentNotificationService;

    @Autowired
    private PresidentNotificationDetailService presidentNotificationDetailService;

    @Autowired
    private PresidentArchiveGiftRepository presidentArchiveGiftRepository;

    @Autowired
    private PresidentArchiveRepository presidentArchiveRepository;

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
        String emailSimple = userName;

        // Gọi API để kiểm tra sự tồn tại của người dùng
        SimpleResponse response = convertRequestApiidentity.handleCallApiGetUserByEmailOrUsername(emailSimple);

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
        StringBuilder stringBuilder = new StringBuilder();
        for (PresidentAddItemDTO userDTO : lstImportUser) {
            // Duyệt qua danh sách đối tượng AdminAddItemDTO đã được kiểm tra lỗi
            if (userDTO.isError()) {
                // Nếu đối tượng có lỗi, bỏ qua và tiếp tục với đối tượng tiếp theo trong danh sách
                continue;
            }

            // Gọi API để lấy thông tin người dùng bằng địa chỉ email
            String emailSimple = userDTO.getUserName();
            SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserByEmailOrUsername(emailSimple);

            // tạo rương cho sinh viên
            String idArchive = null;
            String archiveId = presidentArchiveRepository.getIdArchiveByIdStudent(simpleResponse.getId());
            if (archiveId == null) {
                Archive archive = createArchive(simpleResponse.getId());
                idArchive = archive.getId();
            } else {
                idArchive = archiveId;
            }

            // Xử lý vật phẩm (gift)
            if (!DataUtils.isNullObject(userDTO.getLstGift())) {
                String[] partsGift = userDTO.getLstGift().split(", ");
                Map<String, List<Integer>> giftMap = new HashMap<>();

                for (String part : partsGift) {
                    String[] subParts = part.split(" ", 2);
                    if (subParts.length == 2) {
                        String numberItemStr = subParts[0];
                        String nameItem = subParts[1];
                        Integer numberItem = Integer.parseInt(numberItemStr);

                        giftMap.computeIfAbsent(nameItem, k -> new ArrayList<>()).add(numberItem);
                    }
                }

                List<PresidentGiftResponse> gifts = presidentAddItemRepository.getGiftsByNames(giftMap.keySet());

                Map<String, History> historyMap = new HashMap<>();

                for (PresidentGiftResponse gift : gifts) {
                    String nameItem = gift.getName();
                    String status = gift.getStatus();

                    String enumStatusFREE = String.valueOf(StatusGift.FREE.ordinal());
                    Long dateNow = Calendar.getInstance().getTimeInMillis();

                    List<Integer> quantities = giftMap.get(nameItem);

                    for (Integer quantity : quantities) {
                        History history = historyMap.computeIfAbsent(status, k -> {
                            History newHistory = new History();
                            newHistory.setChangeDate(dateNow);
                            newHistory.setPresidentName(udpmHoney.getUserName());
                            newHistory.setPresidentId(udpmHoney.getIdUser());
                            newHistory.setStudentName(simpleResponse.getUserName());
                            newHistory.setType(TypeHistory.CONG_VAT_PHAM);
                            return newHistory;
                        });

                        if (status.equals(enumStatusFREE)) {
                            // gửi thẳng cho sinh viên
                            // gửi thông báo cho sinh viên
                            stringBuilder.append("Sinh viên " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + " được chủ tịch câu lạc bộ tặng: " + quantity + " " + gift.getName() + ", ");
                            Notification notification = createNotification(simpleResponse.getId());
                            createNotificationDetailItem(gift, notification.getId(), quantity);
                            history.setStatus(HistoryStatus.PRESIDENT_DA_THEM);

                            // thêm vào rương cho sinh viên
                            createArchiveGift(idArchive, null, gift.getId(), quantity);

                        } else {
                            // gửi yêu cầu phê duyệt cho admin
                            // gửi thông báo cho admin
                            stringBuilder.append("Đã gửi yêu cầu phê duyệt tới admin " + "Sinh viên " + simpleResponse.getName() + " - " + simpleResponse.getUserName() + ": " + quantity + " " + gift.getName() + ", ");
                            history.setStatus(HistoryStatus.CHO_PHE_DUYET);
                        }

                        historyRepository.save(history);

                        HistoryDetail historyDetail = new HistoryDetail();
                        historyDetail.setHistoryId(history.getId());
                        historyDetail.setGiftId(gift.getId());
                        historyDetail.setQuantityGift(quantity);
                        historyDetail.setStudentId(simpleResponse.getId());
                        historyDetail.setNameGift(nameItem);
                        historyDetailRepository.save(historyDetail);
                    }
                }

            }

            // Xử lý điểm mật ong (honey)
            if (!DataUtils.isNullObject(userDTO.getLstHoney())) {
                String[] partsHoney = userDTO.getLstHoney().split(", ");
                Map<String, List<Integer>> honeyMap = new HashMap<>();

                for (String part : partsHoney) {
                    String[] subParts = part.split(" ", 2);
                    if (subParts.length == 2) {
                        String numberPointStr = subParts[0].trim();
                        String categoryPoint = subParts[1].trim().replace("-", "");
                        Integer numberPoint = Integer.parseInt(numberPointStr);

                        honeyMap.computeIfAbsent(categoryPoint, k -> new ArrayList<>()).add(numberPoint);
                    }
                }

                List<PresidentCategoryResponse> categories = presidentAddItemRepository.getCategoriesByNames(honeyMap.keySet());

                Map<String, History> historyMap = new HashMap<>();

                for (PresidentCategoryResponse category : categories) {
                    String categoryPoint = category.getName();
                    String categoryId = category.getId();
                    String enumCategoryACCEPT = String.valueOf(CategoryStatus.ACCEPT.ordinal());

                    if (honeyMap.containsKey(categoryPoint)) {
                        List<Integer> honeyPoints = honeyMap.get(categoryPoint);

                        for (Integer honeyPoint : honeyPoints) {
                            TeacherGetPointRequest getPointRequest = new TeacherGetPointRequest();
                            getPointRequest.setStudentId(simpleResponse.getId());
                            getPointRequest.setCategoryId(categoryId);
                            TeacherPointResponse teacherPointResponse = honeyRepository.getPoint(getPointRequest);
                            Long dateNow = Calendar.getInstance().getTimeInMillis();

                            History history = historyMap.computeIfAbsent(category.getStatus(), k -> {
                                History newHistory = new History();
                                newHistory.setPresidentName(udpmHoney.getUserName());
                                newHistory.setPresidentId(udpmHoney.getIdUser());
                                newHistory.setStudentName(simpleResponse.getUserName());
                                newHistory.setType(TypeHistory.CONG_DIEM);
                                newHistory.setChangeDate(dateNow);
                                historyRepository.save(newHistory);
                                return newHistory;
                            });

                            history.setStatus(category.getStatus().equals(enumCategoryACCEPT) ? HistoryStatus.CHO_PHE_DUYET : HistoryStatus.PRESIDENT_DA_THEM);
                            history.setStudentId(simpleResponse.getId());
                            historyRepository.save(history);

                            HistoryDetail historyDetail = new HistoryDetail();
                            historyDetail.setHistoryId(history.getId());
                            historyDetail.setHoneyPoint(honeyPoint);
                            historyDetail.setStudentId(getPointRequest.getStudentId());

                            if (teacherPointResponse == null) {
                                Honey honey = new Honey();
                                honey.setStatus(Status.HOAT_DONG);
                                honey.setHoneyPoint(0);
                                honey.setStudentId(simpleResponse.getId());
                                honey.setHoneyCategoryId(categoryId);
                                historyDetail.setHoneyId(honeyRepository.save(honey).getId());
                            } else {
                                Honey honey = honeyRepository.findById(teacherPointResponse.getId()).orElseThrow();
                                historyDetail.setHoneyId(honey.getId());
                            }
                            historyDetailRepository.save(historyDetail);
                        }
                    }
                }
            }
        }
    }


    private Notification createNotification(String idStudent) {
        String title = Constants.TITLE_NOTIFICATION_PRESIDENT;
        PresidentNotificationAddItemRequest request = new PresidentNotificationAddItemRequest(title, idStudent, NotificationType.HE_THONG, NotificationStatus.CHUA_DOC);
        Notification notification = request.createNotification(new Notification());
        return presidentNotificationRepository.save(notification);
    }

    private NotificationDetail createNotificationDetailHoney(PresidentCategoryResponse categoryResponse, String idNotification, Integer quantity) {
        String content = Constants.CONTENT_NOTIFICATION_PRESIDENT + " Mật ong - " + categoryResponse.getName() + " - Số lượng: " + quantity;
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

    private Archive createArchive(String idStudent) {
        Archive archive = new Archive();
        archive.setStudentId(idStudent);
        archive.setStatus(Status.HOAT_DONG);
        return presidentArchiveRepository.save(archive);
    }

    private ArchiveGift createArchiveGift(String archive, String idChest, String idGift, Integer quantity) {
        Optional<ArchiveGift> existingArchiveGift = presidentArchiveGiftRepository.findByArchiveIdAndGiftId(archive, idGift);
        if (!existingArchiveGift.isEmpty()) {
            existingArchiveGift.get().setQuantity(existingArchiveGift.get().getQuantity() + quantity);
            return presidentArchiveGiftRepository.save(existingArchiveGift.get());
        } else {
            AdminCreateArchiveGiftRequest adminCreateArchiveGiftRequest = new AdminCreateArchiveGiftRequest(archive, idChest, idGift, quantity);
            ArchiveGift newArchiveGift = adminCreateArchiveGiftRequest.createArchivegift(new ArchiveGift());
            return presidentArchiveGiftRepository.save(newArchiveGift);
        }
    }
}
