package com.honeyprojects.core.teacher.service.impl;

import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.core.teacher.model.response.TeacherExcelMessageResponse;
import com.honeyprojects.core.teacher.model.response.TeacherGiftStudentResponse;
import com.honeyprojects.core.teacher.repository.TeacherArchiveGiftRepository;
import com.honeyprojects.core.teacher.repository.TeacherClubRepository;
import com.honeyprojects.core.teacher.repository.TeacherGiftRepository;
import com.honeyprojects.core.teacher.service.TeacherExcelStudentGiftService;
import com.honeyprojects.entity.Archive;
import com.honeyprojects.entity.ArchiveGift;
import com.honeyprojects.entity.Gift;
import com.honeyprojects.infrastructure.contant.Status;
import com.honeyprojects.infrastructure.contant.StatusGift;
import com.honeyprojects.infrastructure.contant.TypeGift;
import com.honeyprojects.repository.ArchiveGiftRepository;
import com.honeyprojects.repository.ArchiveRepository;
import com.honeyprojects.util.ConvertRequestApiidentity;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Service
public class TeacherExcelStudentGiftServiceImpl implements TeacherExcelStudentGiftService {


    @Autowired
    private ConvertRequestApiidentity convertRequestApiidentity;

    @Autowired
    private TeacherGiftRepository teacherGiftRepository;

    @Autowired
    private TeacherArchiveGiftRepository archiveGiftRepository;

    @Autowired
    private ArchiveRepository archiveRepository;

    @Autowired
    private TeacherClubRepository teacherClubRepository;


    @Override
    public byte[] generateTeacherTemplate() {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Template import quà sinh viên");

            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);
            headerStyle.setFillForegroundColor(IndexedColors.ORANGE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setAlignment(HorizontalAlignment.CENTER);
            headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);

            sheet.setColumnWidth(0, 1500);
            sheet.setColumnWidth(1, 4500);
            sheet.setColumnWidth(2, 10000);
            sheet.setColumnWidth(3, 7000);
            sheet.setColumnWidth(4, 5000);

            Row headerRow = sheet.createRow(0);
            Cell headerCell0 = headerRow.createCell(0);
            headerCell0.setCellValue("STT");
            headerCell0.setCellStyle(headerStyle);

            Cell headerCell1 = headerRow.createCell(1);
            headerCell1.setCellValue("Mã sinh viên");
            headerCell1.setCellStyle(headerStyle);

            Cell headerCell2 = headerRow.createCell(2);
            headerCell2.setCellValue("Tên sinh viên");
            headerCell2.setCellStyle(headerStyle);

            Cell headerCell3 = headerRow.createCell(3);
            headerCell3.setCellValue("Email");
            headerCell3.setCellStyle(headerStyle);

            Cell headerCell4 = headerRow.createCell(4);
            headerCell4.setCellValue("Câu lạc bộ");
            headerCell4.setCellStyle(headerStyle);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);

            return outputStream.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public TeacherExcelMessageResponse importFromExcel(MultipartFile file) {
        TeacherExcelMessageResponse teacherExcelMessageResponse = new TeacherExcelMessageResponse();
        List<TeacherGiftStudentResponse> dataList = new ArrayList<>();


        try (InputStream inputStream = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(inputStream)) {

            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();

            if (rowIterator.hasNext()) {
                rowIterator.next();
            }
            if (!rowIterator.hasNext()) {
                teacherExcelMessageResponse.setMessage("File excel trống, vui lòng export lại excel để sử dụng import !");
                teacherExcelMessageResponse.setStatus(false);
                return teacherExcelMessageResponse;
            }

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                TeacherGiftStudentResponse response = new TeacherGiftStudentResponse();

                response.setCode(row.getCell(1).getStringCellValue());
                response.setName(row.getCell(2).getStringCellValue());
                response.setEmail(row.getCell(3).getStringCellValue());
                response.setClub(row.getCell(4).getStringCellValue());

                dataList.add(response);
            }
            for (TeacherGiftStudentResponse response : dataList) {

                SimpleResponse simpleResponse = convertRequestApiidentity.handleCallApiGetUserByEmail(response.getEmail());
                System.out.println(response.getEmail());
                String idClub = teacherClubRepository.getIdGiftByCode(response.getClub());
                Archive archive = new Archive();
                archive.setStudentId(simpleResponse.getId());
                archive.setClubId(idClub);
                archiveRepository.save(archive);
                System.out.println(archive);
                Gift gift = teacherGiftRepository.getIdClubByCode("G4");
                Gift newGift = new Gift();
                newGift.setCode("G" + (teacherGiftRepository.findAll().size() + 1));
                newGift.setName(gift.getName());
                newGift.setStatus(StatusGift.FREE);
                newGift.setType(TypeGift.DUNG_CU);
                Date currentDate = new Date();
                Long fromDateLong = currentDate.getTime();
                newGift.setFromDate(fromDateLong);
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(currentDate);
                calendar.add(Calendar.DAY_OF_MONTH, 30);
                Date toDate = calendar.getTime();
                Long toDateLong = toDate.getTime();
                newGift.setToDate(toDateLong);

                teacherGiftRepository.save(newGift);
                ArchiveGift archiveGift = new ArchiveGift();
                archiveGift.setArchiveId(archive.getId());
                archiveGift.setGiftId(newGift.getId());
                archiveGiftRepository.save(archiveGift);
            }
            teacherExcelMessageResponse.setMessage("Import điểm thành công !");
            teacherExcelMessageResponse.setStatus(true);
            return teacherExcelMessageResponse;

        } catch (IOException e) {
            e.printStackTrace();
        }
        teacherExcelMessageResponse.setMessage("Import điểm thất bại.");
        teacherExcelMessageResponse.setStatus(false);
        return teacherExcelMessageResponse;
    }

    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void cronJobCheckArchiveGift() {
        boolean flag = true;
        long dateNow = Calendar.getInstance().getTimeInMillis();
        List<Gift> giftList = teacherGiftRepository.getAllGiftWrong(dateNow);
        for (Gift gift : giftList) {
            if (gift.getToDate() < dateNow && gift.getStatus() != StatusGift.KHONG_HOAT_DONG) {
                gift.setStatus(StatusGift.KHONG_HOAT_DONG);
                flag = true;
            }
        }
        if (flag) {
            teacherGiftRepository.saveAll(giftList);
        }
    }
}
