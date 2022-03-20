import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

import ResultInfo from "../results/ResultInfo";
import ResultEditBar from './ResultEditBar';
import CommentDashboard from "../comments/CommentDashboard";

/** Result information
 * Includes ResultEditBar for user's own result and CommentDashboard 
 *
 * PostingDetail -> ResultList -> ResultCardList -> ResultCard -> {ResultInfo, ResultEditBar, CommentDashboard}
 * Card links to ResultDetail
 */
const ResultCard = ({ id, userFirst, score, notes, isUser, postId }) => {

  return (
    <Card 
      variant="outlined" 
      align="center" 
    >
      <CardContent>
        <CardActionArea 
          component={RouterLink} 
          to={`/results/${id}`}
        > 
          <ResultInfo
            userFirst={userFirst} 
            score={score} 
            notes={notes}
          />
        </CardActionArea>

        {isUser ?
          <ResultEditBar
            postId={postId}
          />
          : null
        }
        
        <CommentDashboard
          resultId={id}
        />
      </CardContent>
    </Card>
  )
}

export default ResultCard;