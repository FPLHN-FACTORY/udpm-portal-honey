package com.honeyprojects.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.honeyprojects.core.common.response.SimpleResponse;
import com.honeyprojects.infrastructure.apiconstants.ApiConstants;
import com.honeyprojects.infrastructure.apiconstants.HonneyConstants;
import com.honeyprojects.infrastructure.session.HoneySession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class ConvertRequestApiidentity {
    @Autowired
    private HoneySession honeySession;

    @Autowired
    private RestTemplate restTemplate;

    public List<SimpleResponse> handleCallApiGetListUserByListId(List<String> listIdUser) {
        String apiUrl = ApiConstants.API_GET_USER_BY_LIST_ID;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String authorizationToken = "Bearer " + honeySession.getToken();
        headers.set("Authorization", authorizationToken);

        ObjectMapper objectMapper = new ObjectMapper();
        String jsonList = null;
        try {
            jsonList = objectMapper.writeValueAsString(listIdUser);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }

        HttpEntity<String> httpEntity = new HttpEntity<>(jsonList, headers);

        ResponseEntity<List<SimpleResponse>> responseEntity =
                restTemplate.exchange(apiUrl, HttpMethod.POST, httpEntity,
                        new ParameterizedTypeReference<List<SimpleResponse>>() {
                        });

        List<SimpleResponse> response = responseEntity.getBody();
        return response;
    }

    public List<SimpleResponse> handleCallApiGetUserByRoleAndModule(String roleCode) {
        String apiUrl = ApiConstants.API_GET_ALL_USER_BY_ROLE_AND_MODULE;

        HttpHeaders headers = new HttpHeaders();
        String authorizationToken = "Bearer " + honeySession.getToken();
        headers.set("Authorization", authorizationToken);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Object> httpEntity = new HttpEntity<>(headers);

        ResponseEntity<List<SimpleResponse>> responseEntity =
                restTemplate.exchange(apiUrl + "?roleCode=" + roleCode + "&moduleCode=" + HonneyConstants.MODULE_CODE, HttpMethod.GET, httpEntity,
                        new ParameterizedTypeReference<List<SimpleResponse>>() {
                        });

        List<SimpleResponse> response = responseEntity.getBody();
        return response;
    }

    public SimpleResponse handleCallApiGetUserById(String idUSer) {
        String apiUrl = ApiConstants.API_GET_USER_BY_ID;
        HttpHeaders headers = new HttpHeaders();
        String authorizationToken = "Bearer " + honeySession.getToken();
        headers.set("Authorization", authorizationToken);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Object> httpEntity = new HttpEntity<>(headers);
        ResponseEntity<SimpleResponse> responseEntity =
                restTemplate.exchange(apiUrl + "/" + idUSer, HttpMethod.GET, httpEntity,
                        new ParameterizedTypeReference<SimpleResponse>() {
                        });

        SimpleResponse response = responseEntity.getBody();
        return response;
    }
}
