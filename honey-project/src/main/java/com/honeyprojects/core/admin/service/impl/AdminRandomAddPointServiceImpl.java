package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminCreateArchiveGiftRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateHoneyRequest;
import com.honeyprojects.core.admin.model.request.AdminRandomPointRequest;
import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminChestGiftResponse;
import com.honeyprojects.core.admin.model.response.AdminChestReponse;
import com.honeyprojects.core.admin.repository.AdArchiveGiftRepository;
import com.honeyprojects.core.admin.repository.AdChestGiftRepository;
import com.honeyprojects.core.admin.repository.AdRandomAddPointRepository;
import com.honeyprojects.core.admin.service.AdRandomAddPointService;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.entity.ChestGift;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.util.ConvertRequestApiidentity;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdminRandomAddPointServiceImpl implements AdRandomAddPointService {
    @Autowired
    private AdRandomAddPointRepository adRandomAddPointRepository;

    @Autowired
    private AdChestGiftRepository adChestGiftRepository;

    @Autowired
    private AdArchiveGiftRepository adArchiveGiftRepository;

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
            if (adminRandomPointRequest.getListStudentPoint().size() < 1) {
                List<String> allStudent = adRandomAddPointRepository.getAllIdStudentInHoney();
                List<SimpleResponse> simpleResponseList = convertRequestApiidentity.handleCallApiGetListUserByListId(allStudent);
                for (SimpleResponse idS : simpleResponseList) {
                    for (String idCategory : adminRandomPointRequest.getListCategoryPoint()) {
                        Optional<Honey> honey = adRandomAddPointRepository.getHoneyByIdStudent(idS.getId(), idCategory);
                        if (honey.isPresent()) {
                            Honey student = honey.get();
                            honeyList.add(student);
                        } else {
                            AdminCreateHoneyRequest adminCreateHoneyRequest = new AdminCreateHoneyRequest();
                            adminCreateHoneyRequest.setSemesterId(null);
                            adminCreateHoneyRequest.setStudentId(idS.getId());
                            adminCreateHoneyRequest.setCategoryId(idCategory);
                            adminCreateHoneyRequest.setHoneyPoint(0);
                            Honey newHoney = adminCreateHoneyRequest.createHoney(new Honey());
                            System.out.println("=======" + newHoney);
                            honeyList.add(newHoney);
                        }
                    }
                }
            } else {
                for (String student : adminRandomPointRequest.getListStudentPoint()) {
                    for (String idCategory : adminRandomPointRequest.getListCategoryPoint()) {
                        Optional<Honey> honey = adRandomAddPointRepository.getHoneyByIdStudent(student, idCategory);
                        if (honey.isPresent()) {
                            Honey honey1 = honey.get();
                            honeyList.add(honey1);
                        } else {
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
            Collections.shuffle(honeyList); // Xáo trộn danh sách honeyList
//            int numStudentsToProcess = Math.min(adminRandomPointRequest.getNumberStudent(), honeyList.size());
            for (int i = 0; i < honeyList.size(); i++) {
                Honey honey = honeyList.get(i);
                Integer randomPoint = random.nextInt(adminRandomPointRequest.getMaxPoint() - adminRandomPointRequest.getMinPoint() + 1) + adminRandomPointRequest.getMinPoint();
                honey.setHoneyPoint(honey.getHoneyPoint() + randomPoint);
                adRandomAddPointRepository.save(honey);
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
            if (req.getListStudentPoint().size() < 1) {
                List<String> allStudent = adRandomAddPointRepository.getAllIdStudentInHoney();
                List<SimpleResponse> simpleResponseList = convertRequestApiidentity.handleCallApiGetListUserByListId(allStudent);
                for (SimpleResponse simple : simpleResponseList) {
                    String archiveId = adRandomAddPointRepository.getArchiveByIdStudent(simple.getId());
                    int indexRandom = random.nextInt(req.getListItem().size());
                    String itemRandom = req.getListItem().get(indexRandom);
                    String chestGiftId = adRandomAddPointRepository.getOptionalChestGift(req.getChestId(), itemRandom);
                    Optional<ChestGift> optionalChestGift = adChestGiftRepository.findById(chestGiftId);
                    System.out.println("NEXT");
                    if (optionalChestGift.isPresent()) {
                        ChestGift chestGift = optionalChestGift.get();
                        String idChest = chestGift.getChestId();
                        String idGift = chestGift.getGiftId();
                        AdminCreateArchiveGiftRequest adminCreateArchiveGiftRequest = new AdminCreateArchiveGiftRequest(archiveId, idChest, idGift);
                        ArchiveGift archiveGift = adminCreateArchiveGiftRequest.createArchivegift(new ArchiveGift());
                        adArchiveGiftRepository.save(archiveGift);
                    } else {
                        continue;
                    }
                }
            } else {
                for (String idStudent : req.getListStudentPoint()) {
                    String archiveId = adRandomAddPointRepository.getArchiveByIdStudent(idStudent);
                    int indexRandom = random.nextInt(req.getListItem().size());
                    String itemRandom = req.getListItem().get(indexRandom);
                    String chestGiftId = adRandomAddPointRepository.getOptionalChestGift(req.getChestId(), itemRandom);
                    Optional<ChestGift> optionalChestGift = adChestGiftRepository.findById(chestGiftId);
                    System.out.println("NEXT");
                    if (optionalChestGift.isPresent()) {
                        ChestGift chestGift = optionalChestGift.get();
                        String idChest = chestGift.getChestId();
                        String idGift = chestGift.getGiftId();
                        AdminCreateArchiveGiftRequest adminCreateArchiveGiftRequest = new AdminCreateArchiveGiftRequest(archiveId, idChest, idGift);
                        ArchiveGift archiveGift = adminCreateArchiveGiftRequest.createArchivegift(new ArchiveGift());
                        adArchiveGiftRepository.save(archiveGift);
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
        String userHome = System.getProperty("user.home");
        String outputPath = userHome + File.separator + "Downloads" + File.separator + "file_random.xlsx";

        File outputFile = new File(outputPath);

        int count = 1;
        while (outputFile.exists()) {
            outputPath = userHome + File.separator + "Downloads" + File.separator + "file_random" + "(" + count + ")" + ".xlsx";
            outputFile = new File(outputPath);
            count++;
        }
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

        Row headerRow = sheet.createRow(0);
        String[] headers = {"STT", "Tên đăng nhập", "Email"};
        for (int i = 0; i < headers.length; i++) {
            Cell headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headers[i]);
            headerCell.setCellStyle(headerStyle);
        }

        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }

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
    public List<String> importExcel(MultipartFile file) {
        List<String> simpleResponseList = new ArrayList<>();
        try {
            InputStream inputStream = file.getInputStream();
            Workbook workbook = new XSSFWorkbook(inputStream);

            Sheet sheet = workbook.getSheetAt(0);

            Row headerRow = sheet.getRow(0);

            int emailColumnIndex = -1;

            for (Cell cell : headerRow) {
                String columnName = cell.getStringCellValue();
                if ("Email".equalsIgnoreCase(columnName)) {
                    emailColumnIndex = cell.getColumnIndex();
                }
            }

            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    continue;
                }

                Cell emailCell = row.getCell(emailColumnIndex);

                String email = (emailCell != null) ? emailCell.getStringCellValue() : "";

                SimpleResponse response = convertRequestApiidentity.handleCallApiGetUserByEmail(email);
                simpleResponseList.add(response.getId());
            }

            // Đóng tệp Excel
            workbook.close();
            inputStream.close();
            return simpleResponseList;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
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
}
