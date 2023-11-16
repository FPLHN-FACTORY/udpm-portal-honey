package com.honeyprojects.core.teacher.service.impl;

import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.teacher.model.request.TeacherGetPointRequest;
import com.honeyprojects.core.teacher.model.response.TeacherAddPoinExcelResponse;
import com.honeyprojects.core.teacher.model.response.TeacherExcelAddPoinBO;
import com.honeyprojects.core.teacher.model.response.TeacherPointResponse;
import com.honeyprojects.core.teacher.repository.TeacherCategoryRepository;
import com.honeyprojects.core.teacher.repository.TeacherHistoryRepository;
import com.honeyprojects.core.teacher.repository.TeacherHoneyRepository;
import com.honeyprojects.core.teacher.service.TeacherExcelAddPointService;
import com.honeyprojects.entity.Category;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.contant.TypeHistory;
import com.honeyprojects.util.ConvertRequestApiidentity;
import com.honeyprojects.util.DataUtils;
import com.honeyprojects.util.ExcelUtils;
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
    private UdpmHoney udpmHoney;

    @Override
    public Boolean importFromExcel(MultipartFile file) {
        List<TeacherAddPoinExcelResponse> dataList = new ArrayList<>();

        String idTeacher = udpmHoney.getIdUser();

        try (InputStream inputStream = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(inputStream)) {

            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();

            if (rowIterator.hasNext()) {
                rowIterator.next();
            }

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                TeacherAddPoinExcelResponse response = new TeacherAddPoinExcelResponse();


                String name = row.getCell(1).getStringCellValue();
                String email = row.getCell(2).getStringCellValue();
                String categoryName = row.getCell(3).getStringCellValue();
                Integer poin = (int) row.getCell(4).getNumericCellValue();
                String note = row.getCell(5).getStringCellValue();

                response.setStudentName(name);
                if (!email.matches("^[^@]+@[^@]+$")) {
                    continue;
                } else {
                    response.setEmail(email);
                }
                response.setCategoryName(categoryName);
                if (poin < 0) {
                    continue;
                } else {
                    response.setHoneyPoint(poin);
                }
                response.setNote(note);

                dataList.add(response);
            }

            for (TeacherAddPoinExcelResponse response : dataList) {
                SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserByEmail(response.getEmail());
                Category category = categoryRepository.getCategoryByName(response.getCategoryName());

                TeacherGetPointRequest getPointRequest = new TeacherGetPointRequest();
                getPointRequest.setStudentId(simpleResponse.getId());
                getPointRequest.setCategoryId(category.getId());
                Long dateNow = Calendar.getInstance().getTimeInMillis();
                TeacherPointResponse teacherPointResponse = honeyRepository.getPoint(getPointRequest, dateNow);

                History history = new History();
                history.setStatus(HoneyStatus.CHO_PHE_DUYET);
                history.setTeacherId(idTeacher);
                history.setHoneyPoint(response.getHoneyPoint());
                history.setNote(response.getNote());
                history.setType(TypeHistory.CONG_DIEM);
                history.setCreatedAt(dateNow);
                if (teacherPointResponse == null) {
                    Honey honey = new Honey();
                    honey.setStatus(Status.HOAT_DONG);
                    honey.setHoneyPoint(0);
                    honey.setStudentId(simpleResponse.getId());
                    honey.setHoneyCategoryId(category.getId());
                    history.setHoneyId(honeyRepository.save(honey).getId());
                } else {
                    Honey honey = honeyRepository.findById(teacherPointResponse.getId()).orElseThrow();
                    history.setHoneyId(honey.getId());
                }
                history.setStudentId(simpleResponse.getId());
                historyRepository.save(history);
            }
            return true;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public Boolean exportExcel() {
        String userHome = System.getProperty("user.home");
        String outputPath = userHome + File.separator + "Downloads" + File.separator + "file_add_point.xlsx";

        File outputFile = new File(outputPath);

        int count = 1;
        while (outputFile.exists()) {
            outputPath = userHome + File.separator + "Downloads" + File.separator + "file_add_point" + "(" + count + ")" + ".xlsx";
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
        String[] headers = {"STT", "Họ và tên", "Email", "Loại mật ong", "Mật ong", "Mô tả"};
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
    public TeacherExcelAddPoinBO previewDataImportExcel(MultipartFile file) throws IOException {
        InputStream inputStream = file.getInputStream();
        Workbook workbook = new XSSFWorkbook(inputStream);

        Sheet sheet = workbook.getSheetAt(0);

        List<TeacherAddPoinExcelResponse> lstUserImportDTO = StreamSupport.stream(sheet.spliterator(), false)
                .skip(1) // Bỏ qua 2 dòng đầu tiên
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
        String email = ExcelUtils.getCellString(row.getCell(2));
        String categoryName = ExcelUtils.getCellString(row.getCell(3));
        String name = ExcelUtils.getCellString(row.getCell(1));
        Long poin = ExcelUtils.getCellLong(row.getCell(4));
        String note = ExcelUtils.getCellString(row.getCell(5));


        userDTO.setStudentName(name);
        userDTO.setNote(note);

        if (DataUtils.isNullObject(email)) {
            userDTO.setImportMessageStudent("Sinh viên không được để trống với Email: " + email);
            userDTO.setError(true);
        } else if (DataUtils.isNullObject(categoryName)) {
            userDTO.setImportMessageCategory("Loại mật ong không được để trống với Email: " + email);
            userDTO.setError(true);
        } else if (DataUtils.isNullObject(poin)) {
            userDTO.setImportMessagePoint("Mật ong không được để trống");
            userDTO.setError(true);
        } else if (!email.matches("^[^@]+@[^@]+$")) {
            userDTO.setImportMessageStudent("sai định dạng email tại: " + email);
            userDTO.setError(true);
        } else {
            SimpleResponse response = convertRequestApiidentity.handleCallApiGetUserByEmail(email);
            Category category = categoryRepository.getCategoryByName(categoryName);
            if (DataUtils.isNullObject(response)) {
                userDTO.setImportMessageStudent("Sinh viên không tồn tại với Email: " + email);
                userDTO.setError(true);
            } else if (category == null) {
                userDTO.setImportMessageCategory("Loại mật ong không tồn tại với Email: " + email);
                userDTO.setError(true);
            } else if (poin < 0) {
                userDTO.setImportMessagePoint("Mật ong phải lớn hơn 0");
                userDTO.setError(true);
            } else {
                userDTO.setCategoryName(categoryName);
                userDTO.setImportMessageCategory("SUCCESS");
                userDTO.setCategoryId(category.getId());
                userDTO.setEmail(email);
                userDTO.setStudentId(response.getId());
                userDTO.setImportMessageStudent("SUCCESS");
                userDTO.setHoneyPoint(Integer.valueOf(poin.toString()));
                userDTO.setImportMessagePoint("SUCCESS");
                userDTO.setError(false);
            }

        }

        return userDTO;
    }

    @Override
    public TeacherExcelAddPoinBO saveData(TeacherExcelAddPoinBO teacherExcelAddPoinBO) {
        String idTeacher = udpmHoney.getIdUser();
        try {
            for (TeacherAddPoinExcelResponse response : teacherExcelAddPoinBO.getResponseList()) {
                if (response.getStudentId() == null || response.getCategoryId() == null) {
                    return null;
                } else {
                    TeacherGetPointRequest getPointRequest = new TeacherGetPointRequest();
                    getPointRequest.setStudentId(response.getStudentId());
                    getPointRequest.setCategoryId(response.getCategoryId());
                    Long dateNow = Calendar.getInstance().getTimeInMillis();
                    TeacherPointResponse teacherPointResponse = honeyRepository.getPoint(getPointRequest, dateNow);
                    //     System.out.println(teacherPointResponse.getPoint());

                    History history = new History();
                    history.setStatus(HoneyStatus.CHO_PHE_DUYET);
                    history.setTeacherId(idTeacher);
                    history.setHoneyPoint(response.getHoneyPoint());
                    history.setNote(response.getNote());
                    history.setType(TypeHistory.CONG_DIEM);
                    history.setCreatedAt(dateNow);
                    if (teacherPointResponse == null) {
                        Honey honey = new Honey();
                        honey.setStatus(Status.HOAT_DONG);
                        honey.setHoneyPoint(0);
                        honey.setStudentId(response.getStudentId());
                        honey.setHoneyCategoryId(response.getCategoryId());
                        history.setHoneyId(honeyRepository.save(honey).getId());
                    } else {
                        Honey honey = honeyRepository.findById(teacherPointResponse.getId()).orElseThrow();
                        history.setHoneyId(honey.getId());
                    }
                    history.setStudentId(response.getStudentId());
                    historyRepository.save(history);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return teacherExcelAddPoinBO;
    }
}
