import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import {
  People as PeopleIcon,
  FitnessCenter as FitnessCenterIcon,
  EventAvailable as EventIcon,
  Person as TrainerIcon,
} from '@mui/icons-material';

const statsData = [
  { title: 'Total Members', value: '150+', icon: <PeopleIcon sx={{ fontSize: 40 }} /> },
  { title: 'Active Trainers', value: '12', icon: <TrainerIcon sx={{ fontSize: 40 }} /> },
  { title: 'Weekly Sessions', value: '45', icon: <EventIcon sx={{ fontSize: 40 }} /> },
  { title: 'Available Equipment', value: '100+', icon: <FitnessCenterIcon sx={{ fontSize: 40 }} /> },
];

// Import the gym image
const gymImage = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Welcome to Our Gym Management System
      </Typography>

      <Card sx={{ mb: 4, maxWidth: '100%', overflow: 'hidden' }}>
        <Box sx={{ position: 'relative', width: '100%', height: 0, paddingTop: '50%' }}>
          <CardMedia
            component="img"
            alt="Gym Interior"
            image={gymImage}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </Box>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            State-of-the-art Facility
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Our modern gym facility features top-of-the-line equipment and spacious training areas
            to help our members achieve their fitness goals.
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {statsData.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color: 'white',
              }}
            >
              {stat.icon}
              <Typography variant="h4" component="div" sx={{ mt: 2 }}>
                {stat.value}
              </Typography>
              <Typography variant="subtitle1">
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard; 