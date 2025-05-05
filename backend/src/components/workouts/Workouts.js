import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

// Dummy data for demonstration
const initialWorkouts = [
  { 
    id: 1, 
    name: 'Full Body Strength',
    description: 'Complete body workout focusing on major muscle groups',
    duration: '60 minutes',
    difficulty: 'Intermediate',
    equipment: 'Dumbbells, Barbell, Bench',
  },
  { 
    id: 2, 
    name: 'HIIT Cardio',
    description: 'High-intensity interval training for maximum calorie burn',
    duration: '30 minutes',
    difficulty: 'Advanced',
    equipment: 'Jump rope, Kettlebell',
  },
];

const Workouts = () => {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [open, setOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    difficulty: '',
    equipment: '',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingWorkout(null);
    setFormData({
      name: '',
      description: '',
      duration: '',
      difficulty: '',
      equipment: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (editingWorkout) {
      setWorkouts(workouts.map((workout) =>
        workout.id === editingWorkout.id ? { ...formData, id: workout.id } : workout
      ));
    } else {
      setWorkouts([...workouts, { ...formData, id: workouts.length + 1 }]);
    }
    handleClose();
  };

  const handleEdit = (workout) => {
    setEditingWorkout(workout);
    setFormData(workout);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h2">
          Workouts Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Workout
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Equipment</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workouts.map((workout) => (
              <TableRow key={workout.id}>
                <TableCell>{workout.name}</TableCell>
                <TableCell>{workout.description}</TableCell>
                <TableCell>{workout.duration}</TableCell>
                <TableCell>{workout.difficulty}</TableCell>
                <TableCell>{workout.equipment}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(workout)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(workout.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingWorkout ? 'Edit Workout' : 'Add New Workout'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              name="duration"
              label="Duration"
              value={formData.duration}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="difficulty"
              label="Difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="equipment"
              label="Equipment"
              value={formData.equipment}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingWorkout ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Workouts; 