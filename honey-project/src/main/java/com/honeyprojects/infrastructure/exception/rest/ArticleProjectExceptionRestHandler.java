//package com.honeyprojects.infrastructure.exception.rest;
//
//import com.honeyprojects.infrastructure.exception.ArticleProjectExceptionHandler;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//public abstract class ArticleProjectExceptionRestHandler<Z extends Exception>
//        extends ArticleProjectExceptionHandler<ResponseEntity<?>,Z> {
//
//    @Override
//    protected ResponseEntity<?> wrap(Z ex) {
//        return new ResponseEntity<>(wrapApi(ex), HttpStatus.BAD_REQUEST);
//    }
//
//    protected abstract Object wrapApi(Z ex);
//}