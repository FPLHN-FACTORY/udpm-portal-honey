package com.honeyprojects.infrastructure.logger.service;

import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunction;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunctionMain;

import java.util.List;

public interface LoggerConnectService {
    PageableObject readFileFunction(LoggerFunction filter, Long orderBy, int page, int size);

    PageableObject readFileFunctionMain(LoggerFunctionMain filter, Long orderBy, int page, int size);

    List<LoggerFunction> readFileFunctionAll(LoggerFunction filter, Long orderBy);

    List<LoggerFunctionMain> readFileFunctionMainAll(LoggerFunctionMain filter, Long orderBy);
}
