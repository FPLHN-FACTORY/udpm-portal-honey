package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.request.AdminRandomPointRequest;
import com.honeyprojects.core.admin.model.response.AdminCategoryResponse;
import com.honeyprojects.core.admin.model.response.AdminGiftResponse;
import com.honeyprojects.core.admin.repository.AdArchiveGiftRepository;
import com.honeyprojects.core.admin.repository.AdRandomAddPointRepository;
import com.honeyprojects.core.admin.service.AdRandomAddPointService;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.entity.Archive;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.entity.Chest;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.util.ConvertRequestApiidentity;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
            for (String idStudent : adminRandomPointRequest.getListStudent()) {
                for (String idCategory : adminRandomPointRequest.getListCategoryPoint()) {
                    Optional<Honey> honey = adRandomAddPointRepository.getHoneyByIdStudent(idStudent, idCategory);
                    if (honey.isPresent()) {
                        Honey student = honey.get();
                        honeyList.add(student);
                    } else {
                        continue;
                    }
                }
            }
            for (int i = 0; i < adminRandomPointRequest.getNumberStudent(); i++) {
                for (Honey honey : honeyList) {
                    Integer randomPoint = random.nextInt(adminRandomPointRequest.getMaxPoint() - adminRandomPointRequest.getMinPoint() + 1) + adminRandomPointRequest.getMinPoint();
                    honey.setHoneyPoint(honey.getHoneyPoint() + randomPoint);
                    adRandomAddPointRepository.save(honey);
                }
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean createRandomItem(AdminRandomPointRequest adminRandomPointRequest) {
        Random random = new Random();
        Chest chest = new Chest();
        List<ArchiveGift> archiveGiftList = new ArrayList<>();
        try {
            for (int i = 0; i < adminRandomPointRequest.getNumberChest(); i++) {
                int randomIndex = random.nextInt(adminRandomPointRequest.getListItem().size());
                String randomGiftId = adminRandomPointRequest.getListItem().get(randomIndex);
                ArchiveGift archiveGift = new ArchiveGift();
                archiveGift.setChestId(chest.getId());
                archiveGift.setGiftId(randomGiftId);
                archiveGiftList.add(archiveGift);
            }
            adArchiveGiftRepository.saveAll(archiveGiftList);
            for (String idStudent : adminRandomPointRequest.getListStudent()) {
                int randomIndex = random.nextInt(archiveGiftList.size());
                ArchiveGift randomGiftId = archiveGiftList.get(randomIndex);
                Archive archive = adRandomAddPointRepository.getArchiveByIdStudent(idStudent);
                if (randomGiftId.getArchiveId() != null) {
                    randomGiftId.setArchiveId(archive.getClubId());
                } else {
                    continue;
                }
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<AdminGiftResponse> getGiftByType(Integer typeNumber) {
        return adRandomAddPointRepository.getGiftByType(typeNumber);
    }

    @Override
    public Boolean exportExcel() {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Trang 1");

        Row headerRow = sheet.createRow(0);
        String[] headers = {"STT", "Họ và tên", "Tên đăng nhập", "Email", "Loại mật ong", "Số mật ong"};
        for (int i = 0; i < headers.length; i++) {
            Cell headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headers[i]);
        }

        String outputPath = "D:\\file_export.xlsx";

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
    public Boolean importExcel(MultipartFile file) {
        try {
            InputStream inputStream = file.getInputStream();
            Workbook workbook = new XSSFWorkbook(inputStream);

            Sheet sheet = workbook.getSheetAt(0);

            Row headerRow = sheet.getRow(0);

            int emailColumnIndex = -1;
            int categoryColumnIndex = -1;
            int pointColumnIndex = -1;

            for (Cell cell : headerRow) {
                String columnName = cell.getStringCellValue();
                if ("Email".equalsIgnoreCase(columnName)) {
                    emailColumnIndex = cell.getColumnIndex();
                } else if ("Loại mật ong".equalsIgnoreCase(columnName)) {
                    categoryColumnIndex = cell.getColumnIndex();
                } else if ("Số mật ong".equalsIgnoreCase(columnName)) {
                    pointColumnIndex = cell.getColumnIndex();
                }
            }

            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    continue;
                }

                Cell emailCell = row.getCell(emailColumnIndex);
                Cell categoryCell = row.getCell(categoryColumnIndex);
                Cell pointCell = row.getCell(pointColumnIndex);

                String email = (emailCell != null) ? emailCell.getStringCellValue() : "";
                String category = (categoryCell != null) ? categoryCell.getStringCellValue() : "";
                double point = (pointCell != null) ? pointCell.getNumericCellValue() : 0;

                SimpleResponse response = convertRequestApiidentity.handleCallApiGetUserByEmail(email);
                AdminCategoryResponse optionalCategory = adRandomAddPointRepository.getCategoryByName(category);
                if (optionalCategory == null) {
                    continue;
                }
                Optional<Honey> honey = adRandomAddPointRepository.getHoneyByIdStudent(response.getId(), optionalCategory.getId());
                if (honey.isEmpty()) {
                    continue;
                }
                Honey honeyAddPoint = honey.get();
                honeyAddPoint.setHoneyPoint(honeyAddPoint.getHoneyPoint() + (int) point);
                adRandomAddPointRepository.save(honeyAddPoint);
            }


            // Đóng tệp Excel
            workbook.close();
            inputStream.close();
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Integer> getAllTypeGift() {
        return adRandomAddPointRepository.getAllTypeGift();
    }
}
