import React, {useState, useEffect, useContext} from 'react';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import FitFamApi from '../api/api';
import UserContext from '../auth/UserContext';
import SelectDate from '../common/SelectDate';
import PostingCardList from './PostingCardList';


/** Shows list of a working postings for a given date and family
 * 
 * Gets date from query string or today's date
 * On mount, loads postings from API
 * 
 * PostingList -> PostingCardList -> PostingCard 
 *  
 * Routed at /postings
 */
const PostingList = () => {
  const { user, primaryFamilyId } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams("");

  const initialDate = searchParams.get('date') || moment().format("YYYY-MM-DD");
  const [date, setDate] = useState(initialDate);
  
  const [postings, setPostings] = useState([]);

  useEffect(() => {
    const newDate = searchParams.get('date');
    if (newDate) {
      setDate(newDate);
    } 
  }, [searchParams, setSearchParams])


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
    setPostings(null);
    getPostings();
  }, [date]);

  if (!postings) return <div>Loading</div>;

  return (
    <Container maxWidth="md" align="center">
      <Box mt={4}>
        < SelectDate />

        <PostingCardList
          postings={postings}
        />
      </Box>
    </Container>
  )
}

export default PostingList;