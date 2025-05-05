import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Toolbar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  SportsKabaddi as TrainersIcon,
  Restaurant as NutritionIcon,
  FitnessCenter as WorkoutIcon,
  Schedule as SessionIcon,
  Person as NutritionistIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Members', icon: <PeopleIcon />, path: '/members' },
  { text: 'Trainers', icon: <TrainersIcon />, path: '/trainers' },
  { text: 'Nutritionists', icon: <NutritionistIcon />, path: '/nutritionists' },
  { text: 'Workouts', icon: <WorkoutIcon />, path: '/workouts' },
  { text: 'Nutrition Plans', icon: <NutritionIcon />, path: '/nutrition-plans' },
  { text: 'Sessions', icon: <SessionIcon />, path: '/sessions' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item, index) => (
          <React.Fragment key={item.text}>
            {index === 1 && <Divider />}
            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar; 