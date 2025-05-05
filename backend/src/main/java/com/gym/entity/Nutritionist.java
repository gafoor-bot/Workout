package com.gym.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "nutritionists")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Nutritionist {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nutritionist_id")
    private Long nutritionistId;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
    @Column(unique = true, length = 15)
    private String phone;
    
    @Column(length = 255)
    private String qualifications;
    
    @Column(columnDefinition = "DECIMAL(2,1)")
    private Double ratings;

    // Default constructor
    public Nutritionist() {
    }

    // Getters and Setters
    public Long getNutritionistId() {
        return nutritionistId;
    }

    public void setNutritionistId(Long nutritionistId) {
        this.nutritionistId = nutritionistId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getQualifications() {
        return qualifications;
    }

    public void setQualifications(String qualifications) {
        this.qualifications = qualifications;
    }

    public Double getRatings() {
        return ratings;
    }

    public void setRatings(Double ratings) {
        this.ratings = ratings;
    }

    @Override
    public String toString() {
        return "Nutritionist{" +
                "nutritionistId=" + nutritionistId +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", qualifications='" + qualifications + '\'' +
                ", ratings=" + ratings +
                '}';
    }
} 