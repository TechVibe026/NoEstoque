package br.com.techvibe.noestoque.exception;

public class ResourceNotFoundException extends RuntimeException {
   
    public ResourceNotFoundException(String message) {
        super(message);
    }
}