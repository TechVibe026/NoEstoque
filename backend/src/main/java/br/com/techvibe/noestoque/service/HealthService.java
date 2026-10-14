package br.com.techvibe.noestoque.service;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class HealthService {

    public Map<String, String> getStatus() {
        return Map.of(
                "status", "UP",
                "application", "NoEstoque API"
        );
    }
}