package com.gym.service;

import com.gym.entity.Workout;
import com.gym.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {

    @Autowired
    private WorkoutRepository workoutRepository;

    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAll();
    }

    public Optional<Workout> getWorkoutById(Long id) {
        return workoutRepository.findById(id);
    }

    public Workout createWorkout(Workout workout) {
        if (workout.getName() == null || workout.getName().trim().isEmpty()) {
            throw new RuntimeException("Name is required");
        }

        if (workout.getDuration() == null || workout.getDuration() <= 0) {
            throw new RuntimeException("Duration must be greater than 0");
        }

        if (workoutRepository.existsByName(workout.getName())) {
            throw new RuntimeException("Workout name already exists");
        }

        try {
            return workoutRepository.save(workout);
        } catch (Exception e) {
            throw new RuntimeException("Error saving workout: " + e.getMessage());
        }
    }

    public Workout updateWorkout(Long id, Workout workoutDetails) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout not found"));

        if (!workout.getName().equals(workoutDetails.getName()) && 
            workoutRepository.existsByName(workoutDetails.getName())) {
            throw new RuntimeException("Workout name already exists");
        }

        workout.setName(workoutDetails.getName());
        workout.setDescription(workoutDetails.getDescription());
        workout.setDuration(workoutDetails.getDuration());

        return workoutRepository.save(workout);
    }

    public void deleteWorkout(Long id) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout not found"));
        workoutRepository.delete(workout);
    }
} 