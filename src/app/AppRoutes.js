import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Homepage from './Homepage';
import WorkoutSearchPage from '../workouts/WorkoutSearchPage';
import WorkoutDetail from '../workouts/WorkoutDetail';
import PostingDetail from '../postings/PostingDetail';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';

/** Routes for FitFam app
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Non-existant route redirects to the homepage.
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/workouts/search" element={<WorkoutSearchPage />} />
      <Route path="/workouts/:id" element={<WorkoutDetail />} />
      <Route path="/postings/:id" element={<PostingDetail />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes> 
  )
}

export default AppRoutes;