import React, { useState, useEffect } from 'react';
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
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    workoutId: '',    // NUMBER PRIMARY KEY
    name: '',         // VARCHAR2(100) NOT NULL
    description: '',  // VARCHAR2(255)
    duration: ''      // NUMBER CHECK (Duration > 0)
  });

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/workouts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setWorkouts(data);
    } catch (error) {
      setError('Failed to fetch workouts. Please make sure the backend server is running.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setFormData({
      workoutId: '',
      name: '',
      description: '',
      duration: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.workoutId || !formData.name || !formData.duration) {
        setError('Please fill in all required fields');
        return;
      }

      // Validate field lengths
      if (formData.name.length > 100) {
        setError('Name must be less than 100 characters');
        return;
      }
      if (formData.description && formData.description.length > 255) {
        setError('Description must be less than 255 characters');
        return;
      }

      // Validate duration
      if (parseInt(formData.duration) <= 0) {
        setError('Duration must be greater than 0');
        return;
      }

      const payload = {
        workoutId: parseInt(formData.workoutId),
        name: formData.name,
        description: formData.description || null,
        duration: parseInt(formData.duration)
      };

      const url = `http://localhost:8080/api/workouts${isEditing ? `/${formData.workoutId}` : ''}`;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to ${isEditing ? 'update' : 'create'} workout`);
      }

      setSuccess(`Workout ${isEditing ? 'updated' : 'added'} successfully`);
      fetchWorkouts();
      handleClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (workout) => {
    setIsEditing(true);
    setFormData({
      workoutId: workout.workoutId,
      name: workout.name,
      description: workout.description || '',
      duration: workout.duration
    });
    setOpen(true);
  };

  const handleDelete = async (workoutId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/workouts/${workoutId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete workout');
      }

      setSuccess('Workout deleted successfully');
      fetchWorkouts();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Workouts Management</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => {
          setIsEditing(false);
          setFormData({
            workoutId: '',
            name: '',
            description: '',
            duration: ''
          });
          setOpen(true);
        }}>
          Add Workout
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Workout ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Duration (minutes)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workouts.map((workout) => (
              <TableRow key={workout.workoutId}>
                <TableCell>{workout.workoutId}</TableCell>
                <TableCell>{workout.name}</TableCell>
                <TableCell>{workout.description || '-'}</TableCell>
                <TableCell>{workout.duration}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(workout)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(workout.workoutId)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Workout' : 'Add Workout'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="workoutId"
              label="Workout ID *"
              type="number"
              value={formData.workoutId}
              onChange={handleInputChange}
              fullWidth
              required
              disabled={isEditing}
              error={!formData.workoutId}
              helperText={!formData.workoutId ? 'Workout ID is required' : ''}
            />
            <TextField
              name="name"
              label="Name *"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
              error={!formData.name}
              helperText={!formData.name ? 'Name is required' : ''}
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              helperText="Optional (max 255 characters)"
              inputProps={{ maxLength: 255 }}
            />
            <TextField
              name="duration"
              label="Duration (minutes) *"
              type="number"
              value={formData.duration}
              onChange={handleInputChange}
              fullWidth
              required
              error={!formData.duration || parseInt(formData.duration) <= 0}
              helperText={!formData.duration ? 'Duration is required' : 'Must be greater than 0'}
              inputProps={{ min: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!formData.workoutId || !formData.name || !formData.duration || parseInt(formData.duration) <= 0}
          >
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar 
        open={!!success} 
        autoHideDuration={6000} 
        onClose={() => setSuccess('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccess('')}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Workouts; 