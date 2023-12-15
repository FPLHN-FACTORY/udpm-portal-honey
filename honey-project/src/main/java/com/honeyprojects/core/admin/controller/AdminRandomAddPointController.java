package com.honeyprojects.core.admin.controller;

import com.honeyprojects.core.admin.model.request.AdminRandomPointRequest;
import com.honeyprojects.core.admin.model.response.AdminAddItemDTO;
import com.honeyprojects.core.admin.service.AdRandomAddPointService;
import com.honeyprojects.core.common.base.ResponseObject;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/censor/random-add-point")
public class AdminRandomAddPointController {

    @Autowired
    private AdRandomAddPointService adRandomAddPointService;

    @GetMapping("/get-all-category")
    public ResponseObject getAllCategory() {
        return new ResponseObject(adRandomAddPointService.getAllCategory());
    }

    @GetMapping("/get-list-student")
    public ResponseObject getListStudent(final String emailSearch) {
        return new ResponseObject(adRandomAddPointService.getListStudent(emailSearch));
    }

    @PostMapping("/create/random/point")
    public ResponseObject createRandomPoint(@RequestBody AdminRandomPointRequest adminRandomPointRequest) {
        return new ResponseObject(adRandomAddPointService.createRandomPoint(adminRandomPointRequest));
    }

    @PostMapping("/create/random/item")
    public ResponseObject createRandomItem(@RequestBody AdminRandomPointRequest adminRandomPointRequest) {
        return new ResponseObject(adRandomAddPointService.createRandomItem(adminRandomPointRequest));
    }

//    @PostMapping("/create/export")
//    public ResponseObject createExportRandomPoint() {
//        return new ResponseObject(adRandomAddPointService.exportExcel());
//    }

    @GetMapping("/create/export")
    public ResponseEntity<byte[]> createExportRandomPoint(HttpServletResponse response) {
        try {
            ByteArrayOutputStream file = adRandomAddPointService.exportExcel(response);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "sample.xlsx");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(file.toByteArray());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create/preview-data-random")
    public ResponseObject previewDataRandom(@RequestParam("file") MultipartFile file) throws IOException {
        return new ResponseObject(adRandomAddPointService.previewDataRandomExcel(file));
    }

    // màn cộng mật ong
    @PostMapping("/create/preview-data")
    public ResponseObject createPreviewImportPoint(@RequestParam("file") MultipartFile file) throws IOException {
        return new ResponseObject(adRandomAddPointService.previewDataImportExcel(file));
    }

    // màn cộng mật ong
    @GetMapping("/export/data")
    public ResponseEntity<byte[]> exportExcel(HttpServletResponse response) {
        try {
            ByteArrayOutputStream file = adRandomAddPointService.previewDataExportExcel(response);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "sample.xlsx");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(file.toByteArray());
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // màn cộng mật ong
    @PostMapping("/create/import-data")
    public void createImportPoint(@RequestBody List<AdminAddItemDTO> lstAdminAddItemDTO) throws IOException {
        adRandomAddPointService.importData(lstAdminAddItemDTO);
    }

    @GetMapping("/get-all-chest")
    public ResponseObject getAllChest() {
        return new ResponseObject(adRandomAddPointService.getAllChest());
    }

    @GetMapping("/get-all-gift-by-chest/{idChest}")
    public ResponseObject getAllGiftByChest(@PathVariable String idChest) {
        return new ResponseObject(adRandomAddPointService.getAllGiftByChest(idChest));
    }

    @GetMapping("/get-chest-by-id/{idChest}")
    public ResponseObject getChestById(@PathVariable String idChest) {
        return new ResponseObject(adRandomAddPointService.getChestById(idChest));
    }

    @DeleteMapping("/delete/chest-gift")
    public ResponseObject deleteChestGift(@RequestParam("idChest") String idChest, @RequestParam("idGift") String idGift) {
        return new ResponseObject(adRandomAddPointService.deleteChestGift(idChest, idGift));
    }

    @GetMapping("/get-all-name-chest")
    public ResponseObject getAllNameChest() {
        return new ResponseObject(adRandomAddPointService.getAllNameChest());
    }

    @PostMapping("/add/chest/{name}")
    public ResponseObject addChest(@PathVariable String name) {
        return new ResponseObject(adRandomAddPointService.addChest(name));
    }
}
