package com.openclassrooms.mddapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.services.SubscriptionService;

@RestController
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping("/api/subscription/{id}")
    public ResponseEntity<?> subscribe(@PathVariable("id") Long topic_id) {

        this.subscriptionService.create(topic_id);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(null);
    }

    @DeleteMapping("/api/subscription/{id}")
    public ResponseEntity<?> unsubscribe(@PathVariable("id") Long topic_id) {

        this.subscriptionService.delete(topic_id);

        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(null);
    }
}
