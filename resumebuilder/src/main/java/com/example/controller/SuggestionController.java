//package com.example.controller;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.dto.ResumeRequest;
//import com.example.service.OpenAIService;
//
//import reactor.core.publisher.Mono;
//
//@RestController
//@RequestMapping("/api/suggestions")
//public class SuggestionController {
//
//    @Autowired
//    private OpenAIService openAIService;
//
//    @PostMapping
//    public Mono<String> getSuggestion(@RequestBody ResumeRequest request) {
//        return openAIService.getSuggestions(request);
//    }
//}
