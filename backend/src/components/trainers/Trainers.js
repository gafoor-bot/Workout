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
const initialTrainers = [
  { 
    id: 1, 
    name: 'Mike Johnson', 
    specialization: 'Weight Training',
    experience: '5 years',
    email: 'mike@example.com',
    phone: '123-456-7890',
  },
  { 
    id: 2, 
    name: 'Sarah Wilson', 
    specialization: 'Yoga',
    experience: '8 years',
    email: 'sarah@example.com',
    phone: '098-765-4321',
  },
];

const Trainers = () => {
  const [trainers, setTrainers] = useState(initialTrainers);
  const [open, setOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    experience: '',
    email: '',
    phone: '',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTrainer(null);
    setFormData({
      name: '',
      specialization: '',
      experience: '',
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
    if (editingTrainer) {
      setTrainers(trainers.map((trainer) =>
        trainer.id === editingTrainer.id ? { ...formData, id: trainer.id } : trainer
      ));
    } else {
      setTrainers([...trainers, { ...formData, id: trainers.length + 1 }]);
    }
    handleClose();
  };

  const handleEdit = (trainer) => {
    setEditingTrainer(trainer);
    setFormData(trainer);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setTrainers(trainers.filter((trainer) => trainer.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h2">
          Trainers Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Trainer
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Specialization</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainers.map((trainer) => (
              <TableRow key={trainer.id}>
                <TableCell>{trainer.name}</TableCell>
                <TableCell>{trainer.specialization}</TableCell>
                <TableCell>{trainer.experience}</TableCell>
                <TableCell>{trainer.email}</TableCell>
                <TableCell>{trainer.phone}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(trainer)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(trainer.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingTrainer ? 'Edit Trainer' : 'Add New Trainer'}</DialogTitle>
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
              name="experience"
              label="Experience"
              value={formData.experience}
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
            {editingTrainer ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Trainers; 