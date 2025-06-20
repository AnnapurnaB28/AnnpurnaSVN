package com.example.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;
import java.time.Duration;
import java.util.Map;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String openAiApiKey;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://api.openai.com")
            .build();

    public Mono<String> getAIResponse(Map<String, Object> requestBody) {
        return webClient.post()
                .uri("/v1/chat/completions")
                .headers(headers -> {
                    headers.setBearerAuth(openAiApiKey);
                    headers.setContentType(MediaType.APPLICATION_JSON);
                })
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .retryWhen(Retry.backoff(3, Duration.ofSeconds(2)) // Retry max 3 times with 2s delay
                        .filter(throwable -> throwable instanceof org.springframework.web.reactive.function.client.WebClientResponseException.TooManyRequests))
                .onErrorResume(e -> {
                    e.printStackTrace(); // Optional: log the error
                    return Mono.just("Rate limit exceeded or an error occurred.");
                });
    }
}
