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
const initialNutritionPlans = [
  { 
    id: 1, 
    name: 'Weight Loss Plan',
    description: 'Balanced nutrition plan for healthy weight loss',
    calories: '1800-2000',
    meals: '5 meals per day',
    duration: '12 weeks',
    restrictions: 'No processed sugar',
  },
  { 
    id: 2, 
    name: 'Muscle Gain Plan',
    description: 'High protein diet for muscle building',
    calories: '2500-3000',
    meals: '6 meals per day',
    duration: '16 weeks',
    restrictions: 'None',
  },
];

const NutritionPlans = () => {
  const [nutritionPlans, setNutritionPlans] = useState(initialNutritionPlans);
  const [open, setOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    calories: '',
    meals: '',
    duration: '',
    restrictions: '',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPlan(null);
    setFormData({
      name: '',
      description: '',
      calories: '',
      meals: '',
      duration: '',
      restrictions: '',
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
    if (editingPlan) {
      setNutritionPlans(nutritionPlans.map((plan) =>
        plan.id === editingPlan.id ? { ...formData, id: plan.id } : plan
      ));
    } else {
      setNutritionPlans([...nutritionPlans, { ...formData, id: nutritionPlans.length + 1 }]);
    }
    handleClose();
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setFormData(plan);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setNutritionPlans(nutritionPlans.filter((plan) => plan.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h2">
          Nutrition Plans Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Nutrition Plan
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Meals</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Restrictions</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nutritionPlans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell>{plan.name}</TableCell>
                <TableCell>{plan.description}</TableCell>
                <TableCell>{plan.calories}</TableCell>
                <TableCell>{plan.meals}</TableCell>
                <TableCell>{plan.duration}</TableCell>
                <TableCell>{plan.restrictions}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(plan)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(plan.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingPlan ? 'Edit Nutrition Plan' : 'Add New Nutrition Plan'}</DialogTitle>
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
              name="calories"
              label="Calories"
              value={formData.calories}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="meals"
              label="Meals"
              value={formData.meals}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="duration"
              label="Duration"
              value={formData.duration}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="restrictions"
              label="Restrictions"
              value={formData.restrictions}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingPlan ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NutritionPlans; 