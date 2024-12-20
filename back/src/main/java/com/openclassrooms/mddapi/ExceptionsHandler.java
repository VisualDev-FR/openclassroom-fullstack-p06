package com.openclassrooms.mddapi;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.openclassrooms.mddapi.Exceptions.DuplicateUserException;
import com.openclassrooms.mddapi.Exceptions.ResourceNotFoundException;
import com.openclassrooms.mddapi.dto.ExceptionDto;

@ControllerAdvice
public class ExceptionsHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionDto> handleGlobalException(Exception e, WebRequest request) {
        return new ResponseEntity<ExceptionDto>(
                new ExceptionDto(e),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(io.jsonwebtoken.JwtException.class)
    public ResponseEntity<ExceptionDto> handleJwtException(Exception e, WebRequest request) {
        return new ResponseEntity<ExceptionDto>(
                new ExceptionDto("invalid token", e.getClass().toString()),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(jakarta.validation.ValidationException.class)
    public ResponseEntity<ExceptionDto> handleConstraintViolation(Exception e, WebRequest request) {
        return new ResponseEntity<ExceptionDto>(
                new ExceptionDto(e),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ExceptionDto> handleDataIntegrityViolationException(Exception e, WebRequest request) {
        return new ResponseEntity<ExceptionDto>(
                new ExceptionDto(e),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ExceptionDto> handleResourceNotFoundException(Exception e, WebRequest request) {
        return new ResponseEntity<ExceptionDto>(
                new ExceptionDto(e),
                HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionDto> handleMethodArgumentNotValidException(Exception e, WebRequest request) {
        return new ResponseEntity<ExceptionDto>(
                new ExceptionDto(e),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DuplicateUserException.class)
    public ResponseEntity<ExceptionDto> handleDuplicateUserException(Exception e, WebRequest request) {
        return new ResponseEntity<ExceptionDto>(
                new ExceptionDto(e),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ExceptionDto> handleAuthenticationException(Exception e, WebRequest request) {
        return new ResponseEntity<ExceptionDto>(
                new ExceptionDto("Bad credentials", e.getClass().getName()),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ExceptionDto> handleAccessDeniedException(Exception e, WebRequest request) {
        return new ResponseEntity<ExceptionDto>(
                new ExceptionDto(e),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ExceptionDto> handleHttpMessageNotReadableException(Exception e, WebRequest request) {
        return new ResponseEntity<ExceptionDto>(
                new ExceptionDto(e),
                HttpStatus.BAD_REQUEST);
    }

}
