package com.honeyprojects.core.teacher.service.impl;

import com.honeyprojects.core.common.base.UdpmHoney;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.teacher.model.request.TeacherGetPointRequest;
import com.honeyprojects.core.teacher.model.response.TeacherAddPoinExcelResponse;
import com.honeyprojects.core.teacher.model.response.TeacherPointResponse;
import com.honeyprojects.core.teacher.repository.TeacherCategoryRepository;
import com.honeyprojects.core.teacher.repository.TeacherHistoryRepository;
import com.honeyprojects.core.teacher.repository.TeacherHoneyRepository;
import com.honeyprojects.core.teacher.repository.TeacherSemesterRepository;
import com.honeyprojects.core.teacher.service.TeacherExcelAddPointService;
import com.honeyprojects.entity.Category;
import com.honeyprojects.entity.History;
import com.honeyprojects.entity.Honey;
import com.honeyprojects.infrastructure.contant.HoneyStatus;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.contant.TypeHistory;
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
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;

@Service
public class TeacherExcelAddPointServiceImpl implements TeacherExcelAddPointService {


    @Autowired
    private ConvertRequestApiidentity convertRequestApiidentity;

    @Autowired
    private TeacherCategoryRepository categoryRepository;

    @Autowired
    private TeacherHoneyRepository honeyRepository;

    @Autowired
    private TeacherSemesterRepository usRepository;

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
                //    System.out.println("====================");
                //  dataList.forEach(s -> System.out.println(s.toString()));
            }

            for (TeacherAddPoinExcelResponse response : dataList) {
                SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserByEmail(response.getEmail());
                Category category = categoryRepository.getCategoryByName(response.getCategoryName());

                TeacherGetPointRequest getPointRequest = new TeacherGetPointRequest();
                getPointRequest.setStudentId(simpleResponse.getId());
                getPointRequest.setCategoryId(category.getId());
                Long dateNow = Calendar.getInstance().getTimeInMillis();
                TeacherPointResponse teacherPointResponse = honeyRepository.getPoint(getPointRequest, dateNow);
                //     System.out.println("====================");

                History history = new History();
                history.setStatus(HoneyStatus.CHO_PHE_DUYET);
                history.setTeacherId(idTeacher);
                history.setHoneyPoint(response.getHoneyPoint());
                history.setNote(response.getNote());
                history.setType(TypeHistory.CONG_DIEM);
                history.setCreatedAt(dateNow);
                if (teacherPointResponse == null) {
                    String idUs = usRepository.getUsByStudent(dateNow);
                    if (idUs == null) return null;
                    Honey honey = new Honey();
                    honey.setStatus(Status.HOAT_DONG);
                    honey.setHoneyPoint(0);
                    honey.setStudentId(simpleResponse.getId());
                    honey.setHoneyCategoryId(category.getId());
                    honey.setUserSemesterId(idUs);
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
}
