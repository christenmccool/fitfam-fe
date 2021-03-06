import React, {useState, useEffect, useContext} from 'react';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import moment from 'moment';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import FitFamApi from '../api/api';
import UserContext from '../auth/UserContext';
import SelectDate from '../common/SelectDate';
import FamilySelect from './FamilySelect';
import PostingCardList from './PostingCardList';
import Loading from '../app/Loading';
import ErrorPage from '../app/ErrorPage';
import { TEAMFITFAMID } from '../config/config';


/** Shows list of a working postings for a given date and family
 * 
 * Gets date from query string or today's date
 * On mount, loads postings from API
 * 
 * PostingList -> PostingCardList -> PostingCard 
 *  
 * Routed at / for a logged in user
 */
const PostingList = ({ currFamId, setCurrFamId }) => {
  const { user } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams("");

  const initialDate = searchParams.get('date') || moment().format("YYYY-MM-DD");
  const [date, setDate] = useState(initialDate);
  const [familyId, setFamilyId] = useState(currFamId);  
  const [family, setFamily] = useState();  
  const [postings, setPostings] = useState();
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState();

  function changeFamilyId(famId) {
    setFamilyId(famId);
    setCurrFamId(famId);
  }

  useEffect(() => {
    const newDate = searchParams.get('date');
    if (newDate) {
      setDate(newDate);
    } else {
      setDate(moment().format("YYYY-MM-DD"));
    }
  }, [searchParams, setSearchParams])


  useEffect(() => {
    async function getPostings() {
      try {
        let family = await FitFamApi.getFamily(familyId);
        setFamily(family);

        let currPostings = await FitFamApi.getPostings(date, familyId);
        let featured = currPostings.filter(ele => ele.workout.woCategory==="featured");
        
        //If no current postings, creating postings for date's featured workout
        if (!featured.length) {
          const featuredWorkouts = await FitFamApi.getFeaturedWorkouts(date);
          for (let workout of featuredWorkouts) {
            let posting = await FitFamApi.createPosting(workout.id, familyId, date);
            currPostings.push(posting);
          }
        }
        setPostings(currPostings);
        setLoaded(true);
      } catch (err) {
        console.log(err);
        setErrors(err);
      }
    }
    setLoaded(false);
    getPostings();
  }, [date, familyId]);

  async function deletePosting(postId) {
    const deletedId = await FitFamApi.deletePosting(postId);
    const remainingPostings = postings.filter(ele => ele.id !== +deletedId);
    setPostings([...remainingPostings]);
  }

  if (errors) return <ErrorPage errors={errors} />;
  if (!loaded) return <Loading />;

  return (
    <Container maxWidth="sm" align="center">
      <Box my={4}>
        <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: {xs: "column", sm: "row"} }}>
          <Box p={1}>
            < SelectDate />
          </Box>
          <Box p={1}>
            < FamilySelect 
              families={user.families}
              familyId={familyId}
              changeFamilyId={changeFamilyId}
            />
          </Box>
        </Box>

        <Box mt={2}>
          <PostingCardList
            postings={postings}
            family={family}
            deletePosting={deletePosting}
            startExpanded={true}
          />
        </Box>

        {currFamId !== TEAMFITFAMID ?
          <Button 
            component={RouterLink}
            to={`/postings/new?date=${date}`}
            variant="contained"
            sx={{ mt: 4 }}
          >
            <Typography variant="h4" >Post new workout</Typography>
          </Button> 
          : null
        }
      </Box>
    </Container>
  )
}

export default PostingList;