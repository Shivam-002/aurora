package com.thunder.aurora.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
public class MainController {
    
    @GetMapping("/test")
    public String index() {
        return "Welcome to Aurora!";
    }
}
