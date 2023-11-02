package com.honeyprojects.infrastructure.logger.service.impl;


import com.google.gson.Gson;
import com.honeyprojects.core.common.base.PageableObject;
import com.honeyprojects.infrastructure.contant.ConfigurationsConstant;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunction;
import com.honeyprojects.infrastructure.logger.entity.LoggerFunctionMain;
import com.honeyprojects.infrastructure.logger.service.LoggerConnectService;
import com.honeyprojects.infrastructure.session.HoneySession;
import com.honeyprojects.util.LoggerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class LoggerConnectServiceImpl implements LoggerConnectService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${domain.rabbit.listen}")
    private String domainRabbit;

    @Autowired
    private LoggerUtil loggerUtil;

    @Autowired
    private HoneySession honeySession;

    @Override
    public PageableObject readFileFunction(LoggerFunction filter, Long orderBy, int page, int size) {
        String apiUrl = domainRabbit + "/api/rabbit-consumer/read-log/page";
        // Tạo đối tượng HttpHeaders để cấu hình HTTP Headers nếu cần
        HttpHeaders headers = new HttpHeaders();
        String authorizationToken = "Bearer " + honeySession.getToken();
        headers.set("Authorization", authorizationToken);
        headers.setContentType(MediaType.APPLICATION_JSON); // Thiết lập kiểu dữ liệu của requestBody
        filter.setPathFile(loggerUtil.getPathFileInProperties(ConfigurationsConstant.PATH_FILE_CSV) + filter.getPathFile());

        // Đối tượng HttpEntity chứa requestBody và headers
        HttpEntity<LoggerFunction> requestEntity = new HttpEntity<>(filter, headers);

        ResponseEntity<String> responseEntity =
                restTemplate.exchange(apiUrl + "?orderBy=" + orderBy + "&page=" + page + "&size=" + size, HttpMethod.POST, requestEntity,
                        new ParameterizedTypeReference<String>() {
                        });

        return new Gson().fromJson(responseEntity.getBody(), PageableObject.class);
    }

    @Override
    public PageableObject readFileFunctionMain(LoggerFunctionMain filter, Long orderBy, int page, int size) {
        String apiUrl = domainRabbit + "/api/rabbit-consumer/read-log/page";
        filter.setPathFile(loggerUtil.getPathFileInProperties(ConfigurationsConstant.PATH_FILE_CSV) + filter.getPathFile());
        // Tạo đối tượng HttpHeaders để cấu hình HTTP Headers nếu cần
        HttpHeaders headers = new HttpHeaders();
        String authorizationToken = "Bearer " + honeySession.getToken();
        headers.set("Authorization", authorizationToken);
        headers.setContentType(MediaType.APPLICATION_JSON); // Thiết lập kiểu dữ liệu của requestBody

        // Đối tượng HttpEntity chứa requestBody và headers
        HttpEntity<LoggerFunctionMain> requestEntity = new HttpEntity<>(filter, headers);

        ResponseEntity<String> responseEntity =
                restTemplate.exchange(apiUrl + "?orderBy=" + orderBy + "&page=" + page + "&size=" + size, HttpMethod.POST, requestEntity,
                        new ParameterizedTypeReference<String>() {
                        });

        return new Gson().fromJson(responseEntity.getBody(), PageableObject.class);
    }

    @Override
    public List<LoggerFunction> readFileFunctionAll(LoggerFunction filter, Long orderBy) {
        String apiUrl = domainRabbit + "/api/rabbit-consumer/read-log/all";
        filter.setPathFile(loggerUtil.getPathFileInProperties(ConfigurationsConstant.PATH_FILE_CSV) + filter.getPathFile());
        // Tạo đối tượng HttpHeaders để cấu hình HTTP Headers nếu cần
        HttpHeaders headers = new HttpHeaders();
        String authorizationToken = "Bearer " + honeySession.getToken();
        headers.set("Authorization", authorizationToken);
        headers.setContentType(MediaType.APPLICATION_JSON); // Thiết lập kiểu dữ liệu của requestBody

        // Đối tượng HttpEntity chứa requestBody và headers
        HttpEntity<LoggerFunction> requestEntity = new HttpEntity<>(filter, headers);

        ResponseEntity<List<LoggerFunction>> responseEntity =
                restTemplate.exchange(apiUrl + "?orderBy=" + orderBy, HttpMethod.POST, requestEntity,
                        new ParameterizedTypeReference<List<LoggerFunction>>() {
                        });

        return responseEntity.getBody();
    }

    @Override
    public List<LoggerFunctionMain> readFileFunctionMainAll(LoggerFunctionMain filter, Long orderBy) {
        String apiUrl = domainRabbit + "/api/rabbit-consumer/read-log/all";
        filter.setPathFile(loggerUtil.getPathFileInProperties(ConfigurationsConstant.PATH_FILE_CSV) + filter.getPathFile());
        // Tạo đối tượng HttpHeaders để cấu hình HTTP Headers nếu cần
        HttpHeaders headers = new HttpHeaders();
        String authorizationToken = "Bearer " + honeySession.getToken();
        headers.set("Authorization", authorizationToken);
        headers.setContentType(MediaType.APPLICATION_JSON); // Thiết lập kiểu dữ liệu của requestBody

        // Đối tượng HttpEntity chứa requestBody và headers
        HttpEntity<LoggerFunctionMain> requestEntity = new HttpEntity<>(filter, headers);

        ResponseEntity<List<LoggerFunctionMain>> responseEntity =
                restTemplate.exchange(apiUrl + "?orderBy=" + orderBy, HttpMethod.POST, requestEntity,
                        new ParameterizedTypeReference<List<LoggerFunctionMain>>() {
                        });

        return responseEntity.getBody();
    }
}
