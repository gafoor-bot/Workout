const API_BASE_URL = 'http://localhost:8080/api';

// Remove memberApi and keep only these APIs
export const userApi = {
  getAll: () => fetch(`${API_BASE_URL}/users`).then(res => {
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  }),
  getById: (id) => fetch(`${API_BASE_URL}/users/${id}`).then(res => {
    if (!res.ok) throw new Error('User not found');
    return res.json();
  }),
  create: (user) => fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }).then(res => {
    if (!res.ok) throw new Error('Failed to create user');
    return res.json();
  }),
  update: (id, user) => fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  }).then(res => {
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  }),
  delete: (id) => fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE'
  }).then(res => {
    if (!res.ok) throw new Error('Failed to delete user');
    return res;
  })
};

// Trainer API calls
export const trainerApi = {
  getAll: () => fetch(`${API_BASE_URL}/trainers`).then(res => res.json()),
  getById: (id) => fetch(`${API_BASE_URL}/trainers/${id}`).then(res => res.json()),
  create: (trainer) => fetch(`${API_BASE_URL}/trainers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trainer)
  }).then(res => res.json()),
  update: (id, trainer) => fetch(`${API_BASE_URL}/trainers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trainer)
  }).then(res => res.json()),
  delete: (id) => fetch(`${API_BASE_URL}/trainers/${id}`, {
    method: 'DELETE'
  })
};

// Nutritionist API calls
export const nutritionistApi = {
  getAll: () => fetch(`${API_BASE_URL}/nutritionists`).then(res => res.json()),
  getById: (id) => fetch(`${API_BASE_URL}/nutritionists/${id}`).then(res => res.json()),
  create: (nutritionist) => fetch(`${API_BASE_URL}/nutritionists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nutritionist)
  }).then(res => res.json()),
  update: (id, nutritionist) => fetch(`${API_BASE_URL}/nutritionists/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nutritionist)
  }).then(res => res.json()),
  delete: (id) => fetch(`${API_BASE_URL}/nutritionists/${id}`, {
    method: 'DELETE'
  })
};

// Workout API calls
export const workoutApi = {
  getAll: () => fetch(`${API_BASE_URL}/workouts`).then(res => res.json()),
  getById: (id) => fetch(`${API_BASE_URL}/workouts/${id}`).then(res => res.json()),
  create: (workout) => fetch(`${API_BASE_URL}/workouts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(workout)
  }).then(res => res.json()),
  update: (id, workout) => fetch(`${API_BASE_URL}/workouts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(workout)
  }).then(res => res.json()),
  delete: (id) => fetch(`${API_BASE_URL}/workouts/${id}`, {
    method: 'DELETE'
  })
};

// Nutrition Plan API calls
export const nutritionPlanApi = {
  getAll: () => fetch(`${API_BASE_URL}/nutrition-plans`).then(res => res.json()),
  getById: (id) => fetch(`${API_BASE_URL}/nutrition-plans/${id}`).then(res => res.json()),
  create: (plan) => fetch(`${API_BASE_URL}/nutrition-plans`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(plan)
  }).then(res => res.json()),
  update: (id, plan) => fetch(`${API_BASE_URL}/nutrition-plans/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(plan)
  }).then(res => res.json()),
  delete: (id) => fetch(`${API_BASE_URL}/nutrition-plans/${id}`, {
    method: 'DELETE'
  })
};

// Session API calls
export const sessionApi = {
  getAll: () => fetch(`${API_BASE_URL}/sessions`).then(res => res.json()),
  getById: (id) => fetch(`${API_BASE_URL}/sessions/${id}`).then(res => res.json()),
  create: (session) => fetch(`${API_BASE_URL}/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(session)
  }).then(res => res.json()),
  update: (id, session) => fetch(`${API_BASE_URL}/sessions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(session)
  }).then(res => res.json()),
  delete: (id) => fetch(`${API_BASE_URL}/sessions/${id}`, {
    method: 'DELETE'
  })
}; 