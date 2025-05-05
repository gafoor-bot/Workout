package com.gym.controller;

import com.gym.entity.Nutritionist;
import com.gym.service.NutritionistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nutritionists")
@CrossOrigin(origins = "http://localhost:3000")
public class NutritionistController {

    @Autowired
    private NutritionistService nutritionistService;

    // Inner classes for responses
    private static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    private static class SuccessResponse {
        private String message;

        public SuccessResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    @GetMapping
    public List<Nutritionist> getAllNutritionists() {
        return nutritionistService.getAllNutritionists();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nutritionist> getNutritionistById(@PathVariable Long id) {
        return nutritionistService.getNutritionistById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createNutritionist(@RequestBody Nutritionist nutritionist) {
        try {
            System.out.println("Received nutritionist data: " + nutritionist);
            Nutritionist createdNutritionist = nutritionistService.createNutritionist(nutritionist);
            return ResponseEntity.ok(createdNutritionist);
        } catch (RuntimeException e) {
            System.err.println("Error creating nutritionist: " + e.getMessage());
            return ResponseEntity.badRequest()
                .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("An unexpected error occurred: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNutritionist(@PathVariable Long id, @RequestBody Nutritionist nutritionistDetails) {
        try {
            Nutritionist updatedNutritionist = nutritionistService.updateNutritionist(id, nutritionistDetails);
            return ResponseEntity.ok(updatedNutritionist);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNutritionist(@PathVariable Long id) {
        try {
            nutritionistService.deleteNutritionist(id);
            return ResponseEntity.ok()
                .body(new SuccessResponse("Nutritionist deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(e.getMessage()));
        }
    }
} 