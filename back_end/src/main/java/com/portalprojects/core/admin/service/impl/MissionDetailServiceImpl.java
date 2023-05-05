package com.portalprojects.core.admin.service.impl;

import com.portalprojects.core.admin.repository.AdDocumentRepository;
import com.portalprojects.core.admin.repository.AdMissionDetailRepostiory;
import com.portalprojects.core.admin.repository.AdMissionRepository;
import com.portalprojects.core.admin.repository.AdStudentRepository;
import com.portalprojects.core.admin.service.MissionDetailService;
import com.portalprojects.core.common.base.ResponseObject;
import com.portalprojects.entity.Document;
import com.portalprojects.entity.Mission;
import com.portalprojects.entity.MissionDetail;
import com.portalprojects.entity.Student;
import com.portalprojects.infrastructure.contant.TrangThaiNhiemVu;
import com.portalprojects.repository.MissionDetailRepository;
import com.portalprojects.repository.MissionRepository;
import com.portalprojects.repository.StudentRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;


@Service
public class MissionDetailServiceImpl implements MissionDetailService {

    @Autowired
    private AdMissionDetailRepostiory missionDetailRepostiory;

    @Autowired
    private AdMissionRepository missionRepository;

    @Autowired
    private AdStudentRepository studentRepository;

    @Autowired
    private AdDocumentRepository documentRepository;

    @Override
    public Document uploadFile(MultipartFile file, String studentCode, String missionCode) {

        try {
            MissionDetail missionDetail = this.missionDetailRepostiory.getMissionDetailByStudentCodeAndMissionCode(studentCode, missionCode);
            Document doc = new Document();
            doc.setDocName(file.getOriginalFilename());
            doc.setSize(file.getSize());
            doc.setData(file.getBytes());
            doc.setMissionDetailId(missionDetail.getId());
            doc.setUploadTime(new Date());
            doc.setDocType(file.getContentType());
            this.documentRepository.save(doc);
            this.missionDetailRepostiory.updateStatusByMissionDetailId(missionDetail.getId(), TrangThaiNhiemVu.DA_HOAN_THANH);
            return doc;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ArrayList<MissionDetail> findAll() {
        return (ArrayList<MissionDetail>) missionDetailRepostiory.findAll();
    }

    @Override
    public Document deleteMission(String id, String studentCode) {
        Optional<Document> document = documentRepository.findById(id);
        documentRepository.delete(document.get());
        if (this.documentRepository.findCountOfDocument(document.get().getMissionDetailId()) == 0)
            this.missionDetailRepostiory.updateStatusByMissionDetailId(document.get().getMissionDetailId(), TrangThaiNhiemVu.CHUA_HOAN_THANH);
        return document.get();
    }

    @Override
    public MissionDetail findOne(String id) {
        return missionDetailRepostiory.findById(id).get();
    }

    @Override
    public MissionDetail addMissionDetail(String missionId) {
        String studentCode = "SV1";
        Student student = this.studentRepository.findByCode(studentCode);
        if (this.missionDetailRepostiory.getMissionDetailByStudentIdAndMissionId(student.getId(), missionId) != null) {
            return null;
        } else {
            MissionDetail missionDetail = new MissionDetail();
            missionDetail.setMissionId(missionId);
            missionDetail.setStudentId(student.getId());
            missionDetail.setStatus(TrangThaiNhiemVu.CHUA_HOAN_THANH);
            this.missionDetailRepostiory.save(missionDetail);
            return missionDetail;
        }
    }


    public void checkTrangThaiNhiemvu() {
        Thread t1 = new Thread() {
            @Override
            public void run() {
                while (true) {

                }

            }
        };
    }
}
