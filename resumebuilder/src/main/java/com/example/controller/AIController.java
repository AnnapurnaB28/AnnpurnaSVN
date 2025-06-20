package com.example.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.dto.ResumeRequest;
import com.example.service.OpenAIService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AIController {

    @Autowired
    private OpenAIService openAIService;

    @PostMapping("/suggest")
    public Mono<Map<String, String>> getSuggestion(@RequestBody ResumeRequest resume) {
        // Convert ResumeRequest to Map<String, Object> to pass to OpenAI API
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", new Object[] {
            Map.of("role", "system", "content", "You are an expert resume reviewer."),
            Map.of("role", "user", "content", generatePrompt(resume))
        });

        return openAIService.getAIResponse(requestBody)
                .map(response -> Map.of("suggestion", response))
                .onErrorResume(e -> {
                    e.printStackTrace();
                    return Mono.just(Map.of("suggestion", "Error: Unable to fetch suggestions at this time."));
                });
    }

    // Helper method to create the prompt string
    private String generatePrompt(ResumeRequest resume) {
        return String.format(
            "Here is a resume:\nName: %s\nEmail: %s\nSkills: %s\nExperience: %s\n\nPlease provide suggestions to improve it.",
            resume.getName(),
            resume.getEmail(),
            resume.getSkills(),
            resume.getExperience()
        );
    }
}
