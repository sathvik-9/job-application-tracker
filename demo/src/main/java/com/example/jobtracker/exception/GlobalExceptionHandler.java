package com.example.jobtracker.exception;

import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ApplicationNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleApplicationNotFound(ApplicationNotFoundException ex) {
        return ResponseEntity.status(404).body(Map.of(
            "error", "Not Found",
            "status", 404,
            "message", ex.getMessage()
        ));
    }
}
