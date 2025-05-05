package com.gym.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "nutrition_plans")
public class NutritionPlan {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nutritionplan_id")
    private Long nutritionPlanId;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(length = 255)
    private String description;
    
    @Column(length = 255)
    private String meals;
    
    @Column(length = 255)
    private String ingredients;

    // Default constructor
    public NutritionPlan() {
    }

    // Getters and Setters
    public Long getNutritionPlanId() {
        return nutritionPlanId;
    }

    public void setNutritionPlanId(Long nutritionPlanId) {
        this.nutritionPlanId = nutritionPlanId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMeals() {
        return meals;
    }

    public void setMeals(String meals) {
        this.meals = meals;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    @Override
    public String toString() {
        return "NutritionPlan{" +
                "nutritionPlanId=" + nutritionPlanId +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", meals='" + meals + '\'' +
                ", ingredients='" + ingredients + '\'' +
                '}';
    }
} 