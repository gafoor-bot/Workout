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
const initialSessions = [
  { 
    id: 1, 
    name: 'Morning Yoga',
    trainer: 'Sarah Wilson',
    time: '07:00 AM',
    duration: '60 minutes',
    capacity: '20',
    room: 'Studio 1',
    type: 'Group',
  },
  { 
    id: 2, 
    name: 'HIIT Training',
    trainer: 'Mike Johnson',
    time: '06:00 PM',
    duration: '45 minutes',
    capacity: '15',
    room: 'Main Floor',
    type: 'Group',
  },
];

const Sessions = () => {
  const [sessions, setSessions] = useState(initialSessions);
  const [open, setOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    trainer: '',
    time: '',
    duration: '',
    capacity: '',
    room: '',
    type: '',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSession(null);
    setFormData({
      name: '',
      trainer: '',
      time: '',
      duration: '',
      capacity: '',
      room: '',
      type: '',
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
    if (editingSession) {
      setSessions(sessions.map((session) =>
        session.id === editingSession.id ? { ...formData, id: session.id } : session
      ));
    } else {
      setSessions([...sessions, { ...formData, id: sessions.length + 1 }]);
    }
    handleClose();
  };

  const handleEdit = (session) => {
    setEditingSession(session);
    setFormData(session);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setSessions(sessions.filter((session) => session.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h2">
          Sessions Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Session
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Trainer</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>{session.name}</TableCell>
                <TableCell>{session.trainer}</TableCell>
                <TableCell>{session.time}</TableCell>
                <TableCell>{session.duration}</TableCell>
                <TableCell>{session.capacity}</TableCell>
                <TableCell>{session.room}</TableCell>
                <TableCell>{session.type}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(session)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(session.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingSession ? 'Edit Session' : 'Add New Session'}</DialogTitle>
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
              name="trainer"
              label="Trainer"
              value={formData.trainer}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="time"
              label="Time"
              value={formData.time}
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
              name="capacity"
              label="Capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              fullWidth
              type="number"
            />
            <TextField
              name="room"
              label="Room"
              value={formData.room}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="type"
              label="Type"
              value={formData.type}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingSession ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sessions; 