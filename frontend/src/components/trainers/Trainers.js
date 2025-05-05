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

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',       // VARCHAR2(100) NOT NULL
    email: '',      // VARCHAR2(100) UNIQUE NOT NULL
    phone: '',      // VARCHAR2(15) UNIQUE
    qualifications: '', // VARCHAR2(255)
    ratings: ''     // NUMBER(2,1) CHECK (Ratings BETWEEN 0 AND 5)
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/trainers');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTrainers(data);
    } catch (error) {
      setError('Failed to fetch trainers. Please make sure the backend server is running.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      qualifications: '',
      ratings: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ratings') {
      // Ensure ratings are between 0 and 5
      const numValue = parseFloat(value);
      if (numValue >= 0 && numValue <= 5) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.name || !formData.email) {
        setError('Please fill in all required fields');
        return;
      }

      // Validate field lengths according to database schema
      if (formData.name.length > 100) {
        setError('Name must be less than 100 characters');
        return;
      }
      if (formData.email.length > 100) {
        setError('Email must be less than 100 characters');
        return;
      }
      if (formData.phone && formData.phone.length > 15) {
        setError('Phone must be less than 15 characters');
        return;
      }
      if (formData.qualifications && formData.qualifications.length > 255) {
        setError('Qualifications must be less than 255 characters');
        return;
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        qualifications: formData.qualifications || null,
        ratings: formData.ratings ? Number(formData.ratings) : null
      };

      console.log('Sending payload:', payload);

      const url = `http://localhost:8080/api/trainers`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server response:', errorData);
        throw new Error(errorData.message || 'Failed to create trainer');
      }

      const data = await response.json();
      console.log('Success response:', data);

      setSuccess('Trainer added successfully');
      fetchTrainers();
      handleClose();
    } catch (error) {
      console.error('Error details:', error);
      if (error.message.includes('unique')) {
        setError('Email or phone number already exists');
      } else {
        setError(`Failed to create trainer: ${error.message}`);
      }
    }
  };

  const handleEdit = async (trainer) => {
    setIsEditing(true);
    setFormData({
      trainerId: trainer.trainerId,
      name: trainer.name,
      email: trainer.email,
      phone: trainer.phone || '',
      qualifications: trainer.qualifications || '',
      ratings: trainer.ratings || ''
    });
    setOpen(true);
  };

  const handleDelete = async (trainerId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/trainers/${trainerId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete trainer');
      }

      setSuccess('Trainer deleted successfully');
      fetchTrainers();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Trainers Management</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => {
          setIsEditing(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            qualifications: '',
            ratings: ''
          });
          setOpen(true);
        }}>
          Add Trainer
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Trainer ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Qualifications</TableCell>
              <TableCell>Ratings</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainers.map((trainer) => (
              <TableRow key={trainer.trainerId}>
                <TableCell>{trainer.trainerId}</TableCell>
                <TableCell>{trainer.name}</TableCell>
                <TableCell>{trainer.email}</TableCell>
                <TableCell>{trainer.phone || '-'}</TableCell>
                <TableCell>{trainer.qualifications || '-'}</TableCell>
                <TableCell>{trainer.ratings || '-'}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(trainer)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(trainer.trainerId)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {trainers.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No trainers found. Add a new trainer to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Trainer' : 'Add Trainer'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="name"
              label="Name *"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
              error={!formData.name}
              helperText={!formData.name ? 'Name is required (max 100 characters)' : ''}
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              name="email"
              label="Email *"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
              error={!formData.email}
              helperText={!formData.email ? 'Email is required (max 100 characters)' : ''}
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
              helperText="Optional (max 15 characters)"
              inputProps={{ maxLength: 15 }}
            />
            <TextField
              name="qualifications"
              label="Qualifications"
              value={formData.qualifications}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={2}
              helperText="Optional (max 255 characters)"
              inputProps={{ maxLength: 255 }}
            />
            <TextField
              name="ratings"
              label="Ratings"
              type="number"
              value={formData.ratings}
              onChange={handleInputChange}
              fullWidth
              helperText="Optional (between 0 and 5)"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!formData.name || !formData.email}
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
        <Alert severity="error" onClose={() => setError('')} sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar 
        open={!!success} 
        autoHideDuration={6000} 
        onClose={() => setSuccess('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccess('')} sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Trainers; 