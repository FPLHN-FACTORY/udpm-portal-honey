package com.honeyprojects.core.admin.service;

import com.honeyprojects.core.admin.model.request.AdminConversionRequest;
import com.honeyprojects.core.admin.model.request.AdminCreateConversionHistoryRequest;
import com.honeyprojects.core.admin.model.response.AdminRequestConversionHistoryResponse;
import com.honeyprojects.core.common.base.PageableObject;

public interface AdminRequestConversionService {

    PageableObject<AdminRequestConversionHistoryResponse> getHistoryConversionAdmin(AdminCreateConversionHistoryRequest request);
    PageableObject<AdminRequestConversionHistoryResponse> getHistoryBuyGiftAdmin(AdminCreateConversionHistoryRequest request);
}
