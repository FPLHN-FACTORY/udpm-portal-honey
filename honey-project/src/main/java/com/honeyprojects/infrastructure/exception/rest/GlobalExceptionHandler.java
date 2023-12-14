package com.honeyprojects.infrastructure.exception.rest;

import com.google.gson.Gson;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Path;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handlerException(Exception ex) {
        Gson gson = new Gson();
        if (ex instanceof RestApiException) {
            ApiError apiError = new ApiError(ex.getMessage());
            System.out.println(gson.toJson(apiError) + "RestApiException nho");
            return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
        } else if (ex instanceof ConstraintViolationException) {
            Set<ConstraintViolation<?>> violations = ((ConstraintViolationException) ex).getConstraintViolations();
            List<ErrorModel> errors = violations.stream()
                    .map(violation ->
                            new ErrorModel(getPropertyName(violation.getPropertyPath()), violation.getMessage()))
                    .collect(Collectors.toList());
            System.out.println(gson.toJson(errors) + "ConstraintViolationException nho");
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        } else if (ex instanceof CustomException) {
            ApiError apiError = new ApiError(ex.getMessage());
            System.out.println(gson.toJson(apiError) + "CustomException nho");
            return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
        } else if (ex instanceof NoSuchElementException) {
            return ResponseEntity.notFound().build();
        } else {
            System.out.println(gson.toJson(ex.getMessage()) + "INTERNAL_SERVER_ERROR nho");
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @MessageExceptionHandler(MessageHandlingException.class)
    public void handleMessageException(MessageHandlingException ex, @Header("simpSessionId") String sessionId) {
        System.out.println(sessionId);
        ErrorObject errorObject = new ErrorObject(ex.getMessage());
        simpMessagingTemplate.convertAndSend("/portal-honey/error/" + sessionId, errorObject);
    }

    @MessageExceptionHandler
    public void handleException(Exception ex, @Header("simpSessionId") String sessionId) {
        System.out.println("Exception handled for session ID {" + sessionId +"}: {" + ex.getMessage() +"}");
        if (ex instanceof ConstraintViolationException) {
            ConstraintViolationException cve = (ConstraintViolationException) ex;
            Set<ConstraintViolation<?>> violations = cve.getConstraintViolations();
            List<ErrorModel> errors = violations.stream()
                    .map(violation -> new ErrorModel(getPropertyName(violation.getPropertyPath()), violation.getMessage()))
                    .collect(Collectors.toList());
            simpMessagingTemplate.convertAndSend("/portal-honey/error/" + sessionId, errors);
        }
    }

    public String getPropertyName(Path path) {
        String pathStr = path.toString();
        String[] comps = pathStr.split("\\.");
        if (comps.length > 0) {
            return comps[comps.length - 1];
        } else {
            return pathStr;
        }
    }

    private void log(Exception ex) {
        System.out.println(ex.getMessage());
    }

}
