package com.honeyprojects.core.admin.service.impl;

import com.honeyprojects.core.admin.repository.CensorGetListStudentRepository;
import com.honeyprojects.core.admin.service.CensorGetListStudentService;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.util.ConvertRequestApiidentity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CensorGetListStudentServiceImpl implements CensorGetListStudentService {

    @Autowired
    private ConvertRequestApiidentity convertRequestApiidentity;
    @Autowired
    private CensorGetListStudentRepository getListStudentRepository;

    @Override
    public List<SimpleResponse> listSimpleResponses() {
        List<String> listId = getListStudentRepository.listId();
        return convertRequestApiidentity.handleCallApiGetListUserByListId(listId);
    }

}
