package com.gym.service;

import com.gym.entity.NutritionPlan;
import com.gym.repository.NutritionPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NutritionPlanService {

    @Autowired
    private NutritionPlanRepository nutritionPlanRepository;

    public List<NutritionPlan> getAllNutritionPlans() {
        return nutritionPlanRepository.findAll();
    }

    public Optional<NutritionPlan> getNutritionPlanById(Long id) {
        return nutritionPlanRepository.findById(id);
    }

    public NutritionPlan createNutritionPlan(NutritionPlan nutritionPlan) {
        if (nutritionPlan.getName() == null || nutritionPlan.getName().trim().isEmpty()) {
            throw new RuntimeException("Name is required");
        }

        if (nutritionPlanRepository.existsByName(nutritionPlan.getName())) {
            throw new RuntimeException("Nutrition plan name already exists");
        }

        try {
            return nutritionPlanRepository.save(nutritionPlan);
        } catch (Exception e) {
            throw new RuntimeException("Error saving nutrition plan: " + e.getMessage());
        }
    }

    public NutritionPlan updateNutritionPlan(Long id, NutritionPlan nutritionPlanDetails) {
        NutritionPlan nutritionPlan = nutritionPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nutrition plan not found"));

        if (!nutritionPlan.getName().equals(nutritionPlanDetails.getName()) && 
            nutritionPlanRepository.existsByName(nutritionPlanDetails.getName())) {
            throw new RuntimeException("Nutrition plan name already exists");
        }

        nutritionPlan.setName(nutritionPlanDetails.getName());
        nutritionPlan.setDescription(nutritionPlanDetails.getDescription());
        nutritionPlan.setMeals(nutritionPlanDetails.getMeals());
        nutritionPlan.setIngredients(nutritionPlanDetails.getIngredients());

        return nutritionPlanRepository.save(nutritionPlan);
    }

    public void deleteNutritionPlan(Long id) {
        NutritionPlan nutritionPlan = nutritionPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nutrition plan not found"));
        nutritionPlanRepository.delete(nutritionPlan);
    }
} 