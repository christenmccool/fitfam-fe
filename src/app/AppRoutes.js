import React, {useContext} from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import UserContext from '../auth/UserContext';
import Homepage from './Homepage';
import WorkoutSearchPage from '../workouts/WorkoutSearchPage';
import WorkoutDetail from '../workouts/WorkoutDetail';
import PostingList from '../postings/PostingList';
import PostingDetail from '../postings/PostingDetail';
import PostingFormPage from '../postings/PostingNewPage';
import PostingEditPage from '../postings/PostingEditPage';
import ResultFormPage from '../results/ResultFormPage';
import ResultDetail from '../results/ResultDetail';
import FamilyProfile from '../families/FamilyProfile';
import FamilyProfileFormPage from '../families/FamilyProfileFormPage';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import Profile from '../users/Profile';
import UserProfile from '../users/UserProfile';
import UserProfileFormPage from '../users/UserProfileFormPage';
import AddFamilyForm from '../families/AddFamilyForm';
import NotFound from './NotFound';


/** Routes for FitFam app
 *
 * Parts of site should only be visitable when logged in. 
 *
 * Non-existant route redirects to the homepage.
 */
const AppRoutes = ({ login, signup, signupFamily, currFamId, setCurrFamId }) => {
  const {user} = useContext(UserContext);
  const homeElement = user ? <PostingList currFamId={currFamId} setCurrFamId={setCurrFamId}/> : <Homepage /> ;

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }
    return children ? children : <Outlet />;
  };
  
  return (
    <Routes>
      <Route path="/" element={homeElement} />
      <Route path="/workouts/" element={<WorkoutSearchPage />} />
      <Route path="/workouts/:id" element={<WorkoutDetail />} />
      <Route path="/login" element={<LoginForm login={login}/>} />
      <Route path="/signup" element={<SignupForm signup={signup} signupFamily={signupFamily} />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/postings/:id" element={<PostingDetail />} />
        <Route path="/postings/new" element={<PostingFormPage />} />
        <Route path="/postings/:id/edit" element={<PostingEditPage />} />
        <Route path="/postings/:postId/results" element={<ResultFormPage />} />
        <Route path="/results/:id" element={<ResultDetail />} />
        <Route path="/families/:id" element={<FamilyProfile />} />
        <Route path="/families/:id/update" element={<FamilyProfileFormPage />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/update" element={<UserProfileFormPage />} />
        <Route path="/families/join" element={<AddFamilyForm signupFamily={signupFamily} />} />
      </Route>

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes> 
  )
}

export default AppRoutes;