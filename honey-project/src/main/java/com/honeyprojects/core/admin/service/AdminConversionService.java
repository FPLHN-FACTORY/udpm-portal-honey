package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminCreateConversionRequest;
import com.honeyprojects.core.admin.model.request.AdminSearchConversionRequest;
import com.honeyprojects.core.admin.model.response.AdminConversionResponse;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.entity.Conversion;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AdminConversionService {

    List<AdminConversionResponse> getAllConversion();
    Conversion addConversion(AdminCreateConversionRequest request);

    Conversion getOneConversion(String id);

   Page<AdminConversionResponse> searchConversion(Integer page, String name);

    PageableObject<AdminConversionResponse> getPage(AdminSearchConversionRequest request);

   Conversion updateConversion(AdminCreateConversionRequest request, String id);

}
