package com.gym.service;

import com.gym.entity.Trainer;
import com.gym.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TrainerService {

    @Autowired
    private TrainerRepository trainerRepository;

    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    public Optional<Trainer> getTrainerById(Long id) {
        return trainerRepository.findById(id);
    }

    public Trainer createTrainer(Trainer trainer) {
        // Validate required fields
        if (trainer.getName() == null || trainer.getName().trim().isEmpty()) {
            throw new RuntimeException("Name is required");
        }
        if (trainer.getEmail() == null || trainer.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        // Validate email format
        if (!trainer.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new RuntimeException("Invalid email format");
        }

        // Check for existing email
        if (trainerRepository.existsByEmail(trainer.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Check for existing phone if provided
        if (trainer.getPhone() != null && !trainer.getPhone().trim().isEmpty() && 
            trainerRepository.existsByPhone(trainer.getPhone())) {
            throw new RuntimeException("Phone number already exists");
        }

        // Validate ratings range if provided
        if (trainer.getRatings() != null && (trainer.getRatings() < 0 || trainer.getRatings() > 5)) {
            throw new RuntimeException("Ratings must be between 0 and 5");
        }

        try {
            return trainerRepository.save(trainer);
        } catch (Exception e) {
            throw new RuntimeException("Error saving trainer: " + e.getMessage());
        }
    }

    public Trainer updateTrainer(Long id, Trainer trainerDetails) {
        Trainer trainer = trainerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainer not found"));

        if (!trainer.getEmail().equals(trainerDetails.getEmail()) && 
            trainerRepository.existsByEmail(trainerDetails.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (trainerDetails.getPhone() != null && !trainerDetails.getPhone().equals(trainer.getPhone()) && 
            trainerRepository.existsByPhone(trainerDetails.getPhone())) {
            throw new RuntimeException("Phone number already exists");
        }

        trainer.setName(trainerDetails.getName());
        trainer.setEmail(trainerDetails.getEmail());
        trainer.setPhone(trainerDetails.getPhone());
        trainer.setQualifications(trainerDetails.getQualifications());
        trainer.setRatings(trainerDetails.getRatings());

        return trainerRepository.save(trainer);
    }

    public void deleteTrainer(Long id) {
        Trainer trainer = trainerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainer not found"));
        trainerRepository.delete(trainer);
    }
} 