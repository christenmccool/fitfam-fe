import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../auth/UserContext';

import Box from '@mui/material/Box';

import FitFamApi from '../api/api';
import PostingCardList from './PostingCardList';


/** Shows list of a family's postings for a given date 
 * 
 * On mount, loads postings from API
 * 
 * PostingList -> PostingCardList -> PostingCard 
 */
const PostingList = ({ date }) => {
  const [postings, setPostings] = useState([]);
  const { primaryFamilyId } = useContext(UserContext);

  useEffect(() => {
    async function getPostings() {
      try {
        let currPostings = await FitFamApi.getPostings(date, primaryFamilyId);
        
        //If no current postings, creating postings for date's featured workout
        if (!currPostings.length) {
          const featuredWorkouts = await FitFamApi.getFeaturedWorkouts(date);
          for (let workout of featuredWorkouts) {
            let posting = await FitFamApi.createPosting(workout.id, primaryFamilyId, date);
            currPostings.push(posting);
          }
        }
        setPostings(currPostings);
      } catch (err) {
        console.log(err);
      }
    }
    getPostings();
  }, [date]);

  if (!postings) return <div>Loading</div>;

  return (
    <Box mt={4}>
      <PostingCardList
        postings={postings}
      />
    </Box>
  )
}

export default PostingList;