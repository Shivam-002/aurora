    package com.thunder.aurora;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<String> handleResponseStatusException(ResponseStatusException ex) {
        if (ex.getReason() != null && ex.getReason().startsWith("User already exists with email:")) {
            return new ResponseEntity<>(ex.getReason(), HttpStatus.BAD_REQUEST);
        }

        if (ex.getReason() != null && ex.getReason().startsWith("User not found")) {
            return new ResponseEntity<>(ex.getReason(), HttpStatus.NOT_FOUND);
        }

        if (ex.getReason() != null && ex.getReason().startsWith("Bad credentials")) {
            return new ResponseEntity<>(ex.getReason(), HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>("An error occurred", ex.getStatusCode());
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<String> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

}