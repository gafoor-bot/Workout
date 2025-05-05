package com.gym.controller;

import com.gym.entity.NutritionPlan;
import com.gym.service.NutritionPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nutrition-plans")
@CrossOrigin(origins = "http://localhost:3000")
public class NutritionPlanController {

    @Autowired
    private NutritionPlanService nutritionPlanService;

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
    public List<NutritionPlan> getAllNutritionPlans() {
        return nutritionPlanService.getAllNutritionPlans();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NutritionPlan> getNutritionPlanById(@PathVariable Long id) {
        return nutritionPlanService.getNutritionPlanById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createNutritionPlan(@RequestBody NutritionPlan nutritionPlan) {
        try {
            System.out.println("Received nutrition plan data: " + nutritionPlan);
            NutritionPlan createdNutritionPlan = nutritionPlanService.createNutritionPlan(nutritionPlan);
            return ResponseEntity.ok(createdNutritionPlan);
        } catch (RuntimeException e) {
            System.err.println("Error creating nutrition plan: " + e.getMessage());
            return ResponseEntity.badRequest()
                .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("An unexpected error occurred: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNutritionPlan(@PathVariable Long id, @RequestBody NutritionPlan nutritionPlanDetails) {
        try {
            NutritionPlan updatedNutritionPlan = nutritionPlanService.updateNutritionPlan(id, nutritionPlanDetails);
            return ResponseEntity.ok(updatedNutritionPlan);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNutritionPlan(@PathVariable Long id) {
        try {
            nutritionPlanService.deleteNutritionPlan(id);
            return ResponseEntity.ok()
                .body(new SuccessResponse("Nutrition plan deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(e.getMessage()));
        }
    }
} 