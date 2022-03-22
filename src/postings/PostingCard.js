import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import PostingEditBar from '../postings/PostingEditBar';
import ResultDashboard from '../results/ResultDashboard';

/** Summary information about a posting
 * Includes ResultDashboard 
 *
 * PostingList -> PostingCardList -> PostingCard -> ResultDashboard
 * Card links to PostingDetail
 */
const PostingCard = ({ id, woName, woDescription, maxHeight, isUserPost }) => {

  return (
    <Card 
      variant="outlined" 
      align="center" 
      sx={{maxHeight, p:1}}
    >
      <CardContent>
          <Box p={2}>
            <CardActionArea 
              component={RouterLink} 
              to={`/postings/${id}`}
            > 
              <Typography 
                variant="h4" 
                color="secondary" 
                gutterBottom
              >
                {woName}
              </Typography>
              <Typography 
                variant={woName ? "h6" : "h4"} 
                style={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}
              >
                {woDescription}
              </Typography>
            </CardActionArea>
            
            {isUserPost ?
              <PostingEditBar
                postId={id}
              />
              : null
            }
          </Box>

          <ResultDashboard 
            postId={id}
          />
      </CardContent>
    </Card>
  )
}

export default PostingCard;
