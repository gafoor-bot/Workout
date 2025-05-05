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

const Users = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',       // VARCHAR2(100) NOT NULL
    email: '',      // VARCHAR2(100) UNIQUE NOT NULL
    phone: '',      // VARCHAR2(15) UNIQUE
    password: ''    // VARCHAR2(100) NOT NULL
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError('Failed to fetch users. Please make sure the backend server is running.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: ''
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
      if (!formData.name || !formData.email || !formData.password) {
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
      if (formData.password.length > 100) {
        setError('Password must be less than 100 characters');
        return;
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        password: formData.password
      };

      const url = `http://localhost:8080/api/users${isEditing ? `/${formData.userId}` : ''}`;
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
        throw new Error(errorData.message || `Failed to ${isEditing ? 'update' : 'create'} user`);
      }

      setSuccess(`User ${isEditing ? 'updated' : 'added'} successfully`);
      fetchUsers();
      handleClose();
    } catch (error) {
      if (error.message.includes('unique')) {
        setError('Email or phone number already exists');
      } else {
        setError(error.message);
      }
    }
  };

  const handleEdit = async (user) => {
    setIsEditing(true);
    setFormData({
      userId: user.userId,
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      password: '' // Don't show existing password
    });
    setOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setSuccess('User deleted successfully');
      fetchUsers(); // Refresh the list
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Users Management</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => {
          setIsEditing(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            password: ''
          });
          setOpen(true);
        }}>
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Password</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone || '-'}</TableCell>
                <TableCell>{user.password ? '********' : '-'}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(user)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.userId)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No users found. Add a new user to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Edit User' : 'Add User'}</DialogTitle>
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
              name="password"
              label="Password *"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              required
              error={!formData.password}
              helperText={!formData.password ? 'Password is required (max 100 characters)' : ''}
              inputProps={{ maxLength: 100 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!formData.name || !formData.email || !formData.password}
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

export default Users; 