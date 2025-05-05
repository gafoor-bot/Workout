package com.gym.repository;

import com.gym.entity.Nutritionist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NutritionistRepository extends JpaRepository<Nutritionist, Long> {
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
} 