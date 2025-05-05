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

const Nutritionists = () => {
  const [nutritionists, setNutritionists] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    nutritionistId: '',  // NUMBER PRIMARY KEY
    name: '',           // VARCHAR2(100) NOT NULL
    email: '',          // VARCHAR2(100) UNIQUE NOT NULL
    phone: '',          // VARCHAR2(15) UNIQUE
    qualifications: '', // VARCHAR2(255)
    ratings: ''        // NUMBER(2,1) CHECK (Ratings BETWEEN 0 AND 5)
  });

  useEffect(() => {
    fetchNutritionists();
  }, []);

  const fetchNutritionists = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/nutritionists');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNutritionists(data);
    } catch (error) {
      setError('Failed to fetch nutritionists. Please make sure the backend server is running.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setFormData({
      nutritionistId: '',
      name: '',
      email: '',
      phone: '',
      qualifications: '',
      ratings: ''
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
      if (!formData.nutritionistId || !formData.name || !formData.email) {
        setError('Please fill in all required fields');
        return;
      }

      // Validate field lengths
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

      // Validate ratings range
      if (formData.ratings && (parseFloat(formData.ratings) < 0 || parseFloat(formData.ratings) > 5)) {
        setError('Ratings must be between 0 and 5');
        return;
      }

      const payload = {
        nutritionistId: parseInt(formData.nutritionistId),
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        qualifications: formData.qualifications || null,
        ratings: formData.ratings ? parseFloat(formData.ratings) : null
      };

      const url = `http://localhost:8080/api/nutritionists${isEditing ? `/${formData.nutritionistId}` : ''}`;
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
        throw new Error(errorData.message || `Failed to ${isEditing ? 'update' : 'create'} nutritionist`);
      }

      setSuccess(`Nutritionist ${isEditing ? 'updated' : 'added'} successfully`);
      fetchNutritionists();
      handleClose();
    } catch (error) {
      if (error.message.includes('unique')) {
        setError('Email or phone number already exists');
      } else {
        setError(error.message);
      }
    }
  };

  const handleEdit = (nutritionist) => {
    setIsEditing(true);
    setFormData({
      nutritionistId: nutritionist.nutritionistId,
      name: nutritionist.name,
      email: nutritionist.email,
      phone: nutritionist.phone || '',
      qualifications: nutritionist.qualifications || '',
      ratings: nutritionist.ratings || ''
    });
    setOpen(true);
  };

  const handleDelete = async (nutritionistId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/nutritionists/${nutritionistId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete nutritionist');
      }

      setSuccess('Nutritionist deleted successfully');
      fetchNutritionists();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Nutritionists Management</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => {
          setIsEditing(false);
          setFormData({
            nutritionistId: '',
            name: '',
            email: '',
            phone: '',
            qualifications: '',
            ratings: ''
          });
          setOpen(true);
        }}>
          Add Nutritionist
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nutritionist ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Qualifications</TableCell>
              <TableCell>Ratings</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nutritionists.map((nutritionist) => (
              <TableRow key={nutritionist.nutritionistId}>
                <TableCell>{nutritionist.nutritionistId}</TableCell>
                <TableCell>{nutritionist.name}</TableCell>
                <TableCell>{nutritionist.email}</TableCell>
                <TableCell>{nutritionist.phone || '-'}</TableCell>
                <TableCell>{nutritionist.qualifications || '-'}</TableCell>
                <TableCell>{nutritionist.ratings || '-'}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(nutritionist)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(nutritionist.nutritionistId)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Edit Nutritionist' : 'Add Nutritionist'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="nutritionistId"
              label="Nutritionist ID *"
              type="number"
              value={formData.nutritionistId}
              onChange={handleInputChange}
              fullWidth
              required
              disabled={isEditing}
              error={!formData.nutritionistId}
              helperText={!formData.nutritionistId ? 'Nutritionist ID is required' : ''}
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
              name="email"
              label="Email *"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
              error={!formData.email}
              helperText={!formData.email ? 'Email is required' : ''}
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
              inputProps={{ 
                step: "0.1",
                min: "0",
                max: "5"
              }}
              helperText="Optional (0-5)"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!formData.nutritionistId || !formData.name || !formData.email}
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

export default Nutritionists; 