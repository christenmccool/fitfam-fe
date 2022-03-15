import React, {useState, useEffect, useContext} from "react";
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import FitFamApi from "../api/api"; 
import UserContext from "../auth/UserContext";
import ResultCardList from "./ResultCardList";

/** Shows list of a results on a given posting 
 * 
 * On mount, loads results from API
 * 
 * PostingDetail -> ResultList -> ResultCardList -> ResultCard
 */
const ResultList = ({ postId }) => {
  const [results, setResults] = useState();
  const [userResult, setUserResult] = useState();
  const {user} = useContext(UserContext);

  useEffect(() => {
    async function getResults() {
      try {
        if (!results) {
          const results = await FitFamApi.getResults(postId);
          setResults(results);
        }

        if (results) {
          const userResult = results.filter(ele => ele.userId === user.id)[0];
          setUserResult(userResult);
        }

      } catch(err) {
        console.log(err);
      }
    }
    getResults();
  }, [results]);

  async function deleteResult(resultId) {
    const deletedId = await FitFamApi.deleteResult(resultId);
    const remainingResults = results.filter(ele => ele.id !== +deletedId);
    setResults([...remainingResults]);
  }

  if (!results) return <div>Loading</div>;

  return (
    <Box>
      {results.length ? 
        <ResultCardList 
          results={results}
          deleteResult={deleteResult}
        />
        :
        <Typography variant="h4">
          No results posted yet.
        </Typography>
      }

      {!userResult ?
        <Button 
          component={RouterLink}
          variant="contained"
          to={`/postings/${postId}/results`}
          sx={{ mt: 4 }}
        >
          <Typography variant="h4" >Post result</Typography>
        </Button> 
        : null
      }
    </Box>
  )
}

export default ResultList;