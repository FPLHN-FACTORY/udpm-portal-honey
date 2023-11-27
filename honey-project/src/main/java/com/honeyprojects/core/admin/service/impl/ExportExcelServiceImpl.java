package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.model.response.AdminExportCategoryResponse;
import com.honeyprojects.core.admin.service.ExportExcelServiceService;
import com.honeyprojects.core.president.model.response.PresidentExportGiftResponse;
import com.honeyprojects.infrastructure.contant.Constants;
import com.honeyprojects.util.DataUtils;
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
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class ExportExcelServiceImpl implements ExportExcelServiceService {

    public ByteArrayOutputStream export(HttpServletResponse response
            , List<AdminExportCategoryResponse> lstCategory
            , List<PresidentExportGiftResponse> lstGift, String format, String[] headers) {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Danh sách import");

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
            formatGiftCell.setCellValue(format);

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

            if (!DataUtils.isNullObject(lstCategory)) {
                // Sheet 2
                Sheet sheet2 = workbook.createSheet("Danh sách mật ong");
                createSheet2Content(sheet2, workbook, lstCategory);
            }

            if (!DataUtils.isNullObject(lstGift)) {
                // Sheet 3
                Sheet sheet3 = workbook.createSheet("Danh sách vật phẩm");
                createSheet3Content(sheet3, workbook, lstGift);
            }

            workbook.write(outputStream);
            return outputStream;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    private void createSheet2Content(Sheet sheet2, Workbook workbook
            , List<AdminExportCategoryResponse> lstCategory) {
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

        // Lấy dữ liệu category từ database hoặc từ nguồn dữ liệu khác

        Row headerRowSheet2 = sheet2.createRow(0);
        String[] headersSheet2 = {"Loại mật ong", "Yêu cầu phê duyệt"};
        int columnCountSheet2 = headersSheet2.length;

        for (int i = 0; i < columnCountSheet2; i++) {
            Cell headerCell = headerRowSheet2.createCell(i);
            headerCell.setCellValue(headersSheet2[i]);
            headerCell.setCellStyle(headerStyle);
            sheet2.setColumnWidth(i, Constants.COLUMN_WIDTH); // Thiết lập cỡ cột
        }

        int rowNum = 1;
        for (AdminExportCategoryResponse category : lstCategory) {
            Row row = sheet2.createRow(rowNum++);
            row.createCell(0).setCellValue(category.getName());
            row.createCell(1).setCellValue(category.getStatus().equals("1") ? "Không" : "Có");
        }
    }
    private void createSheet3Content(Sheet sheet3, Workbook workbook, List<PresidentExportGiftResponse> gifts) {
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

        Row headerRowSheet2 = sheet3.createRow(0);
        String[] headersSheet2 = {"Tên vật phẩm", "Yêu cầu phê duyệt"};
        int columnCountSheet2 = headersSheet2.length;

        for (int i = 0; i < columnCountSheet2; i++) {
            Cell headerCell = headerRowSheet2.createCell(i);
            headerCell.setCellValue(headersSheet2[i]);
            headerCell.setCellStyle(headerStyle);
            sheet3.setColumnWidth(i, Constants.COLUMN_WIDTH); // Thiết lập cỡ cột
        }

        int rowNum = 1;
        for (PresidentExportGiftResponse gift : gifts) {
            Row row = sheet3.createRow(rowNum++);
            row.createCell(0).setCellValue(gift.getName());
            row.createCell(1).setCellValue(gift.getStatus().equals("0") ? "Không" : "Có");
        }
    }
}