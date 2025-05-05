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

const NutritionPlans = () => {
  const [nutritionPlans, setNutritionPlans] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    nutritionPlanId: '',  // NUMBER PRIMARY KEY
    name: '',            // VARCHAR2(100) NOT NULL
    description: '',     // VARCHAR2(255)
    meals: '',          // VARCHAR2(255)
    ingredients: ''     // VARCHAR2(255)
  });

  useEffect(() => {
    fetchNutritionPlans();
  }, []);

  const fetchNutritionPlans = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/nutrition-plans');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNutritionPlans(data);
    } catch (error) {
      setError('Failed to fetch nutrition plans. Please make sure the backend server is running.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setFormData({
      nutritionPlanId: '',
      name: '',
      description: '',
      meals: '',
      ingredients: ''
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
      if (!formData.nutritionPlanId || !formData.name) {
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
      if (formData.meals && formData.meals.length > 255) {
        setError('Meals must be less than 255 characters');
        return;
      }
      if (formData.ingredients && formData.ingredients.length > 255) {
        setError('Ingredients must be less than 255 characters');
        return;
      }

      const payload = {
        nutritionPlanId: parseInt(formData.nutritionPlanId),
        name: formData.name,
        description: formData.description || null,
        meals: formData.meals || null,
        ingredients: formData.ingredients || null
      };

      const url = `http://localhost:8080/api/nutrition-plans${isEditing ? `/${formData.nutritionPlanId}` : ''}`;
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
        throw new Error(errorData.message || `Failed to ${isEditing ? 'update' : 'create'} nutrition plan`);
      }

      setSuccess(`Nutrition plan ${isEditing ? 'updated' : 'added'} successfully`);
      fetchNutritionPlans();
      handleClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (nutritionPlan) => {
    setIsEditing(true);
    setFormData({
      nutritionPlanId: nutritionPlan.nutritionPlanId,
      name: nutritionPlan.name,
      description: nutritionPlan.description || '',
      meals: nutritionPlan.meals || '',
      ingredients: nutritionPlan.ingredients || ''
    });
    setOpen(true);
  };

  const handleDelete = async (nutritionPlanId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/nutrition-plans/${nutritionPlanId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete nutrition plan');
      }

      setSuccess('Nutrition plan deleted successfully');
      fetchNutritionPlans();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Nutrition Plans Management</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => {
          setIsEditing(false);
          setFormData({
            nutritionPlanId: '',
            name: '',
            description: '',
            meals: '',
            ingredients: ''
          });
          setOpen(true);
        }}>
          Add Nutrition Plan
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Plan ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Meals</TableCell>
              <TableCell>Ingredients</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nutritionPlans.map((plan) => (
              <TableRow key={plan.nutritionPlanId}>
                <TableCell>{plan.nutritionPlanId}</TableCell>
                <TableCell>{plan.name}</TableCell>
                <TableCell>{plan.description || '-'}</TableCell>
                <TableCell>{plan.meals || '-'}</TableCell>
                <TableCell>{plan.ingredients || '-'}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(plan)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(plan.nutritionPlanId)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Nutrition Plan' : 'Add Nutrition Plan'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="nutritionPlanId"
              label="Plan ID *"
              type="number"
              value={formData.nutritionPlanId}
              onChange={handleInputChange}
              fullWidth
              required
              disabled={isEditing}
              error={!formData.nutritionPlanId}
              helperText={!formData.nutritionPlanId ? 'Plan ID is required' : ''}
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
              rows={2}
              helperText="Optional (max 255 characters)"
              inputProps={{ maxLength: 255 }}
            />
            <TextField
              name="meals"
              label="Meals"
              value={formData.meals}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={2}
              helperText="Optional (max 255 characters)"
              inputProps={{ maxLength: 255 }}
            />
            <TextField
              name="ingredients"
              label="Ingredients"
              value={formData.ingredients}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={2}
              helperText="Optional (max 255 characters)"
              inputProps={{ maxLength: 255 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!formData.nutritionPlanId || !formData.name}
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

export default NutritionPlans; 