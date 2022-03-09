import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Homepage from './Homepage';
import WorkoutSearchPage from '../workouts/WorkoutSearchPage';
import WorkoutDetail from '../workouts/WorkoutDetail';
import ResultList from '../results/ResultList';
;
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/workouts/search" element={<WorkoutSearchPage />} />
      <Route path="/workouts/:id" element={<WorkoutDetail />} />
      <Route path="/results" element={<ResultList />} />
    </Routes> 
  )
}

export default AppRoutes;