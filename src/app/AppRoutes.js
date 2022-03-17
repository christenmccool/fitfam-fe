import React, {useContext} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import UserContext from '../auth/UserContext';
import Homepage from './Homepage';
import WorkoutSearchPage from '../workouts/WorkoutSearchPage';
import WorkoutDetail from '../workouts/WorkoutDetail';
import PostingList from '../postings/PostingList';
import PostingDetail from '../postings/PostingDetail';
import ResultFormPage from '../results/ResultFormPage';
import ResultDetail from '../results/ResultDetail';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';

/** Routes for FitFam app
 *
 * Parts of site should only be visitable when logged in. 
 *
 * Non-existant route redirects to the homepage.
 */
const AppRoutes = ({ login, signup }) => {
  const {user} = useContext(UserContext);

  const homeElement = user ? <PostingList /> : <Homepage /> ;

  return (
    <Routes>
      <Route path="/" element={homeElement} />
      <Route path="/workouts/" element={<WorkoutSearchPage />} />
      <Route path="/workouts/:id" element={<WorkoutDetail />} />
      <Route path="/postings/:id" element={<PostingDetail />} />
      <Route path="/postings/:postId/results/" element={<ResultFormPage />} />
      <Route path="/results/:id" element={<ResultDetail />} />
      <Route path="/login" element={<LoginForm login={login}/>} />
      <Route path="/signup" element={<SignupForm signup={signup}/>} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes> 
  )
}

export default AppRoutes;