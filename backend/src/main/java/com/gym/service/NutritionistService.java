package com.gym.service;

import com.gym.entity.Nutritionist;
import com.gym.repository.NutritionistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NutritionistService {

    @Autowired
    private NutritionistRepository nutritionistRepository;

    public List<Nutritionist> getAllNutritionists() {
        return nutritionistRepository.findAll();
    }

    public Optional<Nutritionist> getNutritionistById(Long id) {
        return nutritionistRepository.findById(id);
    }

    public Nutritionist createNutritionist(Nutritionist nutritionist) {
        if (nutritionist.getName() == null || nutritionist.getName().trim().isEmpty()) {
            throw new RuntimeException("Name is required");
        }
        if (nutritionist.getEmail() == null || nutritionist.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        // Validate email format
        if (!nutritionist.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new RuntimeException("Invalid email format");
        }

        // Check for existing email
        if (nutritionistRepository.existsByEmail(nutritionist.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Check for existing phone if provided
        if (nutritionist.getPhone() != null && !nutritionist.getPhone().trim().isEmpty() && 
            nutritionistRepository.existsByPhone(nutritionist.getPhone())) {
            throw new RuntimeException("Phone number already exists");
        }

        // Validate ratings range if provided
        if (nutritionist.getRatings() != null && (nutritionist.getRatings() < 0 || nutritionist.getRatings() > 5)) {
            throw new RuntimeException("Ratings must be between 0 and 5");
        }

        try {
            return nutritionistRepository.save(nutritionist);
        } catch (Exception e) {
            throw new RuntimeException("Error saving nutritionist: " + e.getMessage());
        }
    }

    public Nutritionist updateNutritionist(Long id, Nutritionist nutritionistDetails) {
        Nutritionist nutritionist = nutritionistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nutritionist not found"));

        if (!nutritionist.getEmail().equals(nutritionistDetails.getEmail()) && 
            nutritionistRepository.existsByEmail(nutritionistDetails.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (nutritionistDetails.getPhone() != null && !nutritionistDetails.getPhone().equals(nutritionist.getPhone()) && 
            nutritionistRepository.existsByPhone(nutritionistDetails.getPhone())) {
            throw new RuntimeException("Phone number already exists");
        }

        nutritionist.setName(nutritionistDetails.getName());
        nutritionist.setEmail(nutritionistDetails.getEmail());
        nutritionist.setPhone(nutritionistDetails.getPhone());
        nutritionist.setQualifications(nutritionistDetails.getQualifications());
        nutritionist.setRatings(nutritionistDetails.getRatings());

        return nutritionistRepository.save(nutritionist);
    }

    public void deleteNutritionist(Long id) {
        Nutritionist nutritionist = nutritionistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nutritionist not found"));
        nutritionistRepository.delete(nutritionist);
    }
} 