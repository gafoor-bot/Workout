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
const initialNutritionists = [
  { 
    id: 1, 
    name: 'Dr. Emily Brown', 
    specialization: 'Sports Nutrition',
    certification: 'Certified Sports Nutritionist',
    email: 'emily@example.com',
    phone: '123-456-7890',
  },
  { 
    id: 2, 
    name: 'Dr. David Clark', 
    specialization: 'Weight Management',
    certification: 'Registered Dietitian',
    email: 'david@example.com',
    phone: '098-765-4321',
  },
];

const Nutritionists = () => {
  const [nutritionists, setNutritionists] = useState(initialNutritionists);
  const [open, setOpen] = useState(false);
  const [editingNutritionist, setEditingNutritionist] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    certification: '',
    email: '',
    phone: '',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingNutritionist(null);
    setFormData({
      name: '',
      specialization: '',
      certification: '',
      email: '',
      phone: '',
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
    if (editingNutritionist) {
      setNutritionists(nutritionists.map((nutritionist) =>
        nutritionist.id === editingNutritionist.id ? { ...formData, id: nutritionist.id } : nutritionist
      ));
    } else {
      setNutritionists([...nutritionists, { ...formData, id: nutritionists.length + 1 }]);
    }
    handleClose();
  };

  const handleEdit = (nutritionist) => {
    setEditingNutritionist(nutritionist);
    setFormData(nutritionist);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setNutritionists(nutritionists.filter((nutritionist) => nutritionist.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h2">
          Nutritionists Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Nutritionist
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Certification</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nutritionists.map((nutritionist) => (
              <TableRow key={nutritionist.id}>
                <TableCell>{nutritionist.name}</TableCell>
                <TableCell>{nutritionist.specialization}</TableCell>
                <TableCell>{nutritionist.certification}</TableCell>
                <TableCell>{nutritionist.email}</TableCell>
                <TableCell>{nutritionist.phone}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(nutritionist)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(nutritionist.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingNutritionist ? 'Edit Nutritionist' : 'Add New Nutritionist'}</DialogTitle>
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
              name="specialization"
              label="Specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="certification"
              label="Certification"
              value={formData.certification}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingNutritionist ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Nutritionists; 