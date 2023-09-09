package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminCreateConversionRequest;
import com.honeyprojects.entity.Conversion;

import java.util.List;

public interface AdminConversionService {

    List<Conversion> getAllConversion();
    Conversion addConversion(AdminCreateConversionRequest request);
}
